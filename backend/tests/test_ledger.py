"""Unit tests for Phase 8 Double-entry Financial Ledger and Invariant Enforcement."""

import uuid
import pytest
from pydantic import ValidationError

from app.models.ledger import (
    ScholarshipAllocation,
    ExpenseCategory,
    ExpenseStatus,
    TransactionType,
)
from app.schemas.ledger import (
    AllocationCreateRequest,
    ExpenseClaimCreateRequest,
)


def test_ledger_balance_invariant():
    """Verify Available = Total - (Reserved + Disbursed) invariant holds true."""
    alloc = ScholarshipAllocation(
        athlete_id=uuid.uuid4(),
        total_allocated_inr=500000.0,
        reserved_amount_inr=150000.0,
        disbursed_amount_inr=50000.0,
        academic_year="2026-2027",
    )

    # 500,000 - (150,000 + 50,000) = 300,000
    assert alloc.available_balance_inr == 300000.0

    # Modify reserved amount
    alloc.reserved_amount_inr = 200000.0
    assert alloc.available_balance_inr == 250000.0


def test_allocation_schema_positive_amount():
    """Verify total allocation must be greater than zero."""
    with pytest.raises(ValidationError):
        AllocationCreateRequest(
            athlete_id=uuid.uuid4(),
            total_allocated_inr=0.0,  # Invalid: must be > 0
            academic_year="2026-2027",
        )


def test_expense_claim_schema_validation():
    """Verify expense claim parameters and mandatory categories."""
    req = ExpenseClaimCreateRequest(
        allocation_id=uuid.uuid4(),
        category=ExpenseCategory.EQUIPMENT,
        amount_inr=25000.0,
        merchant_name="Yonex Official Store",
        invoice_reference="INV-2026-9921",
        purpose_description="Custom competitive racquets and tension strings",
    )

    assert req.category == ExpenseCategory.EQUIPMENT
    assert req.amount_inr == 25000.0

    # Amount <= 0 is invalid
    with pytest.raises(ValidationError):
        ExpenseClaimCreateRequest(
            allocation_id=uuid.uuid4(),
            category=ExpenseCategory.COACHING_FEES,
            amount_inr=-500.0,
            merchant_name="Coach academy",
            invoice_reference="INV-1",
            purpose_description="Fees",
        )
