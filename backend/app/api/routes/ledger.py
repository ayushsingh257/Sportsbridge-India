"""API routes for financial ledger and expense reimbursements."""

import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, Header, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.user import User
from app.models.ledger import ExpenseStatus
from app.schemas.ledger import (
    AllocationCreateRequest,
    AllocationResponse,
    ExpenseClaimCreateRequest,
    ExpenseClaimResponse,
    ExpenseClaimReviewRequest,
    LedgerTransactionResponse,
)
from app.repositories.ledger_repo import LedgerRepository
from app.security.auth import get_current_user

router = APIRouter(prefix="/ledger", tags=["Financial Ledger"])


def _to_allocation_response(alloc) -> AllocationResponse:
    return AllocationResponse(
        id=alloc.id,
        athlete_id=alloc.athlete_id,
        application_id=alloc.application_id,
        total_allocated_inr=float(alloc.total_allocated_inr),
        reserved_amount_inr=float(alloc.reserved_amount_inr),
        disbursed_amount_inr=float(alloc.disbursed_amount_inr),
        available_balance_inr=alloc.available_balance_inr,
        status=alloc.status,
        academic_year=alloc.academic_year,
        created_at=alloc.created_at,
    )


@router.post("/allocations", response_model=AllocationResponse, status_code=status.HTTP_201_CREATED)
async def create_grant_allocation(
    payload: AllocationCreateRequest,
    idempotency_key: str = Header(..., description="Unique idempotency identifier"),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Admin or Finance Officer allocates scholarship funds to an athlete."""
    if current_user.role not in ["ADMIN", "FINANCE"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only Finance Officers or Administrators can initialize financial allocations.",
        )

    repo = LedgerRepository(db)
    try:
        alloc = await repo.create_allocation(payload, idempotency_key=idempotency_key)
        return _to_allocation_response(alloc)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get("/allocations/my", response_model=AllocationResponse)
async def get_my_active_allocation(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Authenticated athlete fetches their currently active grant allocation."""
    repo = LedgerRepository(db)
    alloc = await repo.get_active_allocation_by_athlete(current_user.id)
    if not alloc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No active scholarship allocation found for this athlete.",
        )
    return _to_allocation_response(alloc)


@router.post("/expenses/request", response_model=ExpenseClaimResponse, status_code=status.HTTP_201_CREATED)
async def submit_expense_claim(
    payload: ExpenseClaimCreateRequest,
    idempotency_key: str = Header(..., description="Unique claim request key"),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Athlete claims reimbursement against available grant balance."""
    repo = LedgerRepository(db)
    try:
        exp = await repo.submit_expense(current_user.id, payload, idempotency_key=idempotency_key)
        return exp
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except PermissionError as e:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=str(e))


@router.patch("/expenses/{expense_id}/review", response_model=ExpenseClaimResponse)
async def review_expense_claim(
    expense_id: uuid.UUID,
    payload: ExpenseClaimReviewRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Admin or Finance reviewer approves or rejects pending expense."""
    if current_user.role not in ["ADMIN", "FINANCE"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Unauthorized to review expense reimbursements.",
        )

    repo = LedgerRepository(db)
    try:
        updated = await repo.review_expense(expense_id, payload.status, payload.reviewer_notes)
        return updated
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.post("/expenses/{expense_id}/disburse", response_model=ExpenseClaimResponse)
async def disburse_approved_expense(
    expense_id: uuid.UUID,
    idempotency_key: str = Header(..., description="Unique disbursement idempotency key"),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Finance officer releases disbursement for approved claim."""
    if current_user.role not in ["ADMIN", "FINANCE"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Unauthorized to disburse scholarship funds.",
        )

    repo = LedgerRepository(db)
    try:
        disbursed = await repo.disburse_expense(expense_id, idempotency_key=idempotency_key)
        return disbursed
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.get("/allocations/{allocation_id}/transactions", response_model=List[LedgerTransactionResponse])
async def get_allocation_transactions(
    allocation_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Retrieve full chronological immutable ledger history."""
    repo = LedgerRepository(db)
    alloc = await repo.get_allocation_by_id(allocation_id)
    if not alloc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Allocation not found.")

    if alloc.athlete_id != current_user.id and current_user.role not in ["ADMIN", "FINANCE"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Unauthorized.")

    txs = await repo.get_transactions(allocation_id)
    return txs
