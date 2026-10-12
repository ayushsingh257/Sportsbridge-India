"""Schemas for Admin, Reviewer queues, and Audit logs."""

import uuid
from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field, ConfigDict
from app.schemas.application import ApplicationResponse
from app.schemas.ledger import ExpenseClaimResponse


class AuditLogResponse(BaseModel):
    id: uuid.UUID
    actor_id: Optional[uuid.UUID] = None
    actor_email: str
    actor_role: str
    action: str
    entity_type: str
    entity_id: str
    details: Optional[Dict[str, Any]] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class AdminQueueSummary(BaseModel):
    pending_applications: List[ApplicationResponse]
    pending_expenses: List[ExpenseClaimResponse]
    recent_audits: List[AuditLogResponse]
    total_athletes_supported: int = 120
    total_disbursed_inr: float = 4850000.0
