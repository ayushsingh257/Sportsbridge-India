"""Repository for managing financial ledger, invariants, and idempotent transactions."""

import uuid
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.ledger import (
    ScholarshipAllocation,
    ExpenseRequest,
    LedgerTransaction,
    ExpenseStatus,
    TransactionType,
)
from app.schemas.ledger import (
    AllocationCreateRequest,
    ExpenseClaimCreateRequest,
)


class LedgerRepository:
    """Encapsulates double-entry ledger operations and strict invariant enforcement."""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create_allocation(self, data: AllocationCreateRequest, idempotency_key: str) -> ScholarshipAllocation:
        """Initialize an approved allocation and write initial credit ledger entry."""
        # Check duplicate idempotency
        stmt = select(LedgerTransaction).where(LedgerTransaction.idempotency_key == idempotency_key)
        res = await self.db.execute(stmt)
        if res.scalar_one_or_none():
            raise ValueError(f"Transaction with idempotency key '{idempotency_key}' already processed.")

        alloc = ScholarshipAllocation(
            athlete_id=data.athlete_id,
            application_id=data.application_id,
            total_allocated_inr=data.total_allocated_inr,
            reserved_amount_inr=0.0,
            disbursed_amount_inr=0.0,
            status="ACTIVE",
            academic_year=data.academic_year,
        )
        self.db.add(alloc)
        await self.db.flush()

        tx = LedgerTransaction(
            allocation_id=alloc.id,
            transaction_type=TransactionType.CREDIT_ALLOCATION.value,
            amount_inr=data.total_allocated_inr,
            balance_after_inr=data.total_allocated_inr,
            idempotency_key=idempotency_key,
            description=f"Initial grant allocation credited for AY {data.academic_year}",
        )
        self.db.add(tx)
        await self.db.commit()
        await self.db.refresh(alloc)
        return alloc

    async def get_allocation_by_id(self, allocation_id: uuid.UUID) -> Optional[ScholarshipAllocation]:
        stmt = select(ScholarshipAllocation).where(ScholarshipAllocation.id == allocation_id)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def get_active_allocation_by_athlete(self, athlete_id: uuid.UUID) -> Optional[ScholarshipAllocation]:
        stmt = (
            select(ScholarshipAllocation)
            .where(ScholarshipAllocation.athlete_id == athlete_id)
            .where(ScholarshipAllocation.status == "ACTIVE")
        )
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def submit_expense(
        self, athlete_id: uuid.UUID, data: ExpenseClaimCreateRequest, idempotency_key: str
    ) -> ExpenseRequest:
        """Submits expense claim, reserves funds, and writes a reserve hold transaction."""
        alloc = await self.get_allocation_by_id(data.allocation_id)
        if not alloc:
            raise ValueError("Allocation not found.")

        if alloc.athlete_id != athlete_id:
            raise PermissionError("Athlete does not own this allocation.")

        # Check invariant: Available = Total - (Reserved + Disbursed)
        if data.amount_inr > alloc.available_balance_inr:
            raise ValueError(
                f"Requested amount ₹{data.amount_inr} exceeds available balance ₹{alloc.available_balance_inr}."
            )

        # Reserve funds
        alloc.reserved_amount_inr = float(alloc.reserved_amount_inr) + float(data.amount_inr)

        exp = ExpenseRequest(
            allocation_id=alloc.id,
            athlete_id=athlete_id,
            category=data.category.value,
            amount_inr=data.amount_inr,
            merchant_name=data.merchant_name,
            invoice_reference=data.invoice_reference,
            purpose_description=data.purpose_description,
            status=ExpenseStatus.PENDING.value,
        )
        self.db.add(exp)
        await self.db.flush()

        tx = LedgerTransaction(
            allocation_id=alloc.id,
            transaction_type=TransactionType.RESERVE_HOLD.value,
            amount_inr=data.amount_inr,
            balance_after_inr=alloc.available_balance_inr,
            idempotency_key=idempotency_key,
            description=f"Fund reservation hold for {data.category.value} claim #{exp.id}",
        )
        self.db.add(tx)
        await self.db.commit()
        await self.db.refresh(exp)
        return exp

    async def review_expense(
        self, expense_id: uuid.UUID, new_status: ExpenseStatus, notes: Optional[str] = None
    ) -> ExpenseRequest:
        """Reviews an expense. If rejected, releases reserved hold back to available."""
        stmt = select(ExpenseRequest).where(ExpenseRequest.id == expense_id)
        res = await self.db.execute(stmt)
        exp = res.scalar_one_or_none()
        if not exp:
            raise ValueError("Expense request not found.")

        alloc = await self.get_allocation_by_id(exp.allocation_id)
        if not alloc:
            raise ValueError("Allocation not found.")

        if new_status == ExpenseStatus.REJECTED and exp.status == ExpenseStatus.PENDING.value:
            # Release hold
            alloc.reserved_amount_inr = max(0.0, float(alloc.reserved_amount_inr) - float(exp.amount_inr))
            tx = LedgerTransaction(
                allocation_id=alloc.id,
                transaction_type=TransactionType.RELEASE_HOLD.value,
                amount_inr=float(exp.amount_inr),
                balance_after_inr=alloc.available_balance_inr,
                idempotency_key=f"rel_hold_{exp.id}_{uuid.uuid4()}",
                description=f"Released reservation hold for rejected expense claim #{exp.id}",
            )
            self.db.add(tx)

        exp.status = new_status.value
        exp.reviewer_notes = notes
        await self.db.commit()
        await self.db.refresh(exp)
        return exp

    async def disburse_expense(self, expense_id: uuid.UUID, idempotency_key: str) -> ExpenseRequest:
        """Disburses approved expense, transitions hold to disbursed, and logs DEBIT_DISBURSED."""
        stmt = select(ExpenseRequest).where(ExpenseRequest.id == expense_id)
        res = await self.db.execute(stmt)
        exp = res.scalar_one_or_none()
        if not exp:
            raise ValueError("Expense request not found.")

        if exp.status != ExpenseStatus.APPROVED.value:
            raise ValueError("Only APPROVED expenses can be disbursed.")

        alloc = await self.get_allocation_by_id(exp.allocation_id)
        if not alloc:
            raise ValueError("Allocation not found.")

        # Move from reserved to disbursed
        alloc.reserved_amount_inr = max(0.0, float(alloc.reserved_amount_inr) - float(exp.amount_inr))
        alloc.disbursed_amount_inr = float(alloc.disbursed_amount_inr) + float(exp.amount_inr)

        exp.status = ExpenseStatus.DISBURSED.value

        tx = LedgerTransaction(
            allocation_id=alloc.id,
            transaction_type=TransactionType.DEBIT_DISBURSED.value,
            amount_inr=float(exp.amount_inr),
            balance_after_inr=alloc.available_balance_inr,
            idempotency_key=idempotency_key,
            description=f"Disbursed reimbursement for expense #{exp.id} to {exp.merchant_name}",
        )
        self.db.add(tx)
        await self.db.commit()
        await self.db.refresh(exp)
        return exp

    async def get_transactions(self, allocation_id: uuid.UUID) -> List[LedgerTransaction]:
        """Returns chronological transaction audit trail."""
        stmt = (
            select(LedgerTransaction)
            .where(LedgerTransaction.allocation_id == allocation_id)
            .order_by(LedgerTransaction.created_at.asc())
        )
        res = await self.db.execute(stmt)
        return list(res.scalars().all())
