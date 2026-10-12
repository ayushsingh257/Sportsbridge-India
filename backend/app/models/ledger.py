"""Double-entry financial ledger and expense reimbursement models."""

import uuid
from datetime import datetime, timezone
from typing import Optional, List
import enum
from sqlalchemy import String, Integer, Numeric, Text, Boolean, DateTime, ForeignKey, Enum as SAEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, UUIDPrimaryKeyMixin, TimestampMixin


class ExpenseCategory(str, enum.Enum):
    EQUIPMENT = "EQUIPMENT"
    COACHING_FEES = "COACHING_FEES"
    NUTRITION_DIET = "NUTRITION_DIET"
    TRAVEL_COMPETITION = "TRAVEL_COMPETITION"
    MEDICAL_PHYSIO = "MEDICAL_PHYSIO"


class ExpenseStatus(str, enum.Enum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    DISBURSED = "DISBURSED"
    REJECTED = "REJECTED"


class TransactionType(str, enum.Enum):
    CREDIT_ALLOCATION = "CREDIT_ALLOCATION"
    RESERVE_HOLD = "RESERVE_HOLD"
    RELEASE_HOLD = "RELEASE_HOLD"
    DEBIT_DISBURSED = "DEBIT_DISBURSED"


class ScholarshipAllocation(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    """Authoritative grant allocation record for an athlete."""

    __tablename__ = "scholarship_allocations"

    athlete_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False
    )
    application_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("scholarship_applications.id", ondelete="SET NULL"), nullable=True
    )
    total_allocated_inr: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    reserved_amount_inr: Mapped[float] = mapped_column(Numeric(12, 2), default=0.0, nullable=False)
    disbursed_amount_inr: Mapped[float] = mapped_column(Numeric(12, 2), default=0.0, nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="ACTIVE", nullable=False)  # ACTIVE, EXHAUSTED, REVOKED
    academic_year: Mapped[str] = mapped_column(String(20), nullable=False)  # e.g. "2026-2027"

    transactions: Mapped[List["LedgerTransaction"]] = relationship(
        "LedgerTransaction", back_populates="allocation", cascade="all, delete-orphan"
    )
    expenses: Mapped[List["ExpenseRequest"]] = relationship(
        "ExpenseRequest", back_populates="allocation", cascade="all, delete-orphan"
    )

    @property
    def available_balance_inr(self) -> float:
        """Enforces invariant: Available = Total - (Reserved + Disbursed)."""
        return round(float(self.total_allocated_inr) - (float(self.reserved_amount_inr) + float(self.disbursed_amount_inr)), 2)


class ExpenseRequest(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    """Claim for reimbursement against an approved allocation."""

    __tablename__ = "expense_requests"

    allocation_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("scholarship_allocations.id", ondelete="CASCADE"), index=True, nullable=False
    )
    athlete_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False
    )
    category: Mapped[str] = mapped_column(String(50), nullable=False)
    amount_inr: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    merchant_name: Mapped[str] = mapped_column(String(150), nullable=False)
    invoice_reference: Mapped[str] = mapped_column(String(100), nullable=False)
    purpose_description: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[str] = mapped_column(
        String(50), default=ExpenseStatus.PENDING.value, index=True, nullable=False
    )
    reviewer_notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    allocation: Mapped["ScholarshipAllocation"] = relationship("ScholarshipAllocation", back_populates="expenses")


class LedgerTransaction(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    """Immutable audit entry for financial movements."""

    __tablename__ = "ledger_transactions"

    allocation_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("scholarship_allocations.id", ondelete="CASCADE"), index=True, nullable=False
    )
    transaction_type: Mapped[str] = mapped_column(String(50), nullable=False)
    amount_inr: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    balance_after_inr: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    idempotency_key: Mapped[str] = mapped_column(String(100), unique=True, index=True, nullable=False)
    description: Mapped[str] = mapped_column(String(255), nullable=False)

    allocation: Mapped["ScholarshipAllocation"] = relationship("ScholarshipAllocation", back_populates="transactions")
