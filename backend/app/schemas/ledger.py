"""Schemas for Scholarship Allocations, Expenses, and Ledger Transactions."""

import uuid
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, ConfigDict
from app.models.ledger import ExpenseCategory, ExpenseStatus, TransactionType


class AllocationCreateRequest(BaseModel):
    athlete_id: uuid.UUID
    application_id: Optional[uuid.UUID] = None
    total_allocated_inr: float = Field(..., gt=0)
    academic_year: str = Field(..., min_length=4, max_length=20)


class AllocationResponse(BaseModel):
    id: uuid.UUID
    athlete_id: uuid.UUID
    application_id: Optional[uuid.UUID] = None
    total_allocated_inr: float
    reserved_amount_inr: float
    disbursed_amount_inr: float
    available_balance_inr: float
    status: str
    academic_year: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ExpenseClaimCreateRequest(BaseModel):
    allocation_id: uuid.UUID
    category: ExpenseCategory
    amount_inr: float = Field(..., gt=0)
    merchant_name: str = Field(..., min_length=2, max_length=150)
    invoice_reference: str = Field(..., min_length=2, max_length=100)
    purpose_description: str = Field(..., min_length=5, max_length=500)


class ExpenseClaimReviewRequest(BaseModel):
    status: ExpenseStatus  # APPROVED or REJECTED
    reviewer_notes: Optional[str] = None


class ExpenseClaimResponse(BaseModel):
    id: uuid.UUID
    allocation_id: uuid.UUID
    athlete_id: uuid.UUID
    category: str
    amount_inr: float
    merchant_name: str
    invoice_reference: str
    purpose_description: str
    status: str
    reviewer_notes: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class LedgerTransactionResponse(BaseModel):
    id: uuid.UUID
    allocation_id: uuid.UUID
    transaction_type: str
    amount_inr: float
    balance_after_inr: float
    idempotency_key: str
    description: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
