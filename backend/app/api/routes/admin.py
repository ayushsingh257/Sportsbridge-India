"""Admin and Reviewer portal routes enforcing segregation of duties."""

import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.db.session import get_db
from app.models.user import User
from app.models.application import ScholarshipApplication, ApplicationStatus
from app.models.ledger import ExpenseRequest, ExpenseStatus
from app.models.audit import AuditLog
from app.schemas.admin import AdminQueueSummary, AuditLogResponse
from app.schemas.application import ApplicationResponse
from app.schemas.ledger import ExpenseClaimResponse
from app.security.auth import get_current_user

router = APIRouter(prefix="/admin", tags=["Administration & Reviewer Portal"])


@router.get("/queue", response_model=AdminQueueSummary)
async def get_admin_queues(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Retrieve review queues according to role (REVIEWER, FINANCE, or ADMIN)."""
    if current_user.role not in ["ADMIN", "REVIEWER", "FINANCE"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access restricted to authorized platform reviewers and administrators.",
        )

    # 1. Fetch pending applications
    app_stmt = (
        select(ScholarshipApplication)
        .where(ScholarshipApplication.status.in_([ApplicationStatus.SUBMITTED.value, ApplicationStatus.PRELIMINARY_REVIEW.value]))
        .options(selectinload(ScholarshipApplication.documents))
        .limit(20)
    )
    app_res = await db.execute(app_stmt)
    pending_apps = list(app_res.scalars().all())

    # 2. Fetch pending expenses (Finance & Admin only)
    pending_expenses = []
    if current_user.role in ["ADMIN", "FINANCE"]:
        exp_stmt = (
            select(ExpenseRequest)
            .where(ExpenseRequest.status.in_([ExpenseStatus.PENDING.value, ExpenseStatus.APPROVED.value]))
            .limit(20)
        )
        exp_res = await db.execute(exp_stmt)
        pending_expenses = list(exp_res.scalars().all())

    # 3. Fetch recent audit logs
    audit_stmt = select(AuditLog).order_by(AuditLog.created_at.desc()).limit(20)
    audit_res = await db.execute(audit_stmt)
    audits = list(audit_res.scalars().all())

    return AdminQueueSummary(
        pending_applications=pending_apps,
        pending_expenses=pending_expenses,
        recent_audits=audits,
        total_athletes_supported=120,
        total_disbursed_inr=4850000.0,
    )


@router.get("/audits", response_model=List[AuditLogResponse])
async def list_audit_trail(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Retrieve system audit logs for administrative accountability."""
    if current_user.role not in ["ADMIN", "AUDITOR"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only Administrators or Certified Auditors can review system logs.",
        )

    stmt = select(AuditLog).order_by(AuditLog.created_at.desc()).limit(50)
    result = await db.execute(stmt)
    return list(result.scalars().all())
