"""Scholarship Applications and Supporting Document models with state transitions."""

import uuid
from datetime import datetime, timezone
from typing import Optional, List
import enum
from sqlalchemy import String, Integer, Numeric, Text, Boolean, DateTime, ForeignKey, Enum as SAEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, UUIDPrimaryKeyMixin, TimestampMixin


class ApplicationStatus(str, enum.Enum):
    SUBMITTED = "SUBMITTED"
    PRELIMINARY_REVIEW = "PRELIMINARY_REVIEW"
    VERIFICATION_PENDING = "VERIFICATION_PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"


VALID_STATUS_TRANSITIONS = {
    ApplicationStatus.SUBMITTED: [ApplicationStatus.PRELIMINARY_REVIEW, ApplicationStatus.REJECTED],
    ApplicationStatus.PRELIMINARY_REVIEW: [ApplicationStatus.VERIFICATION_PENDING, ApplicationStatus.REJECTED],
    ApplicationStatus.VERIFICATION_PENDING: [ApplicationStatus.APPROVED, ApplicationStatus.REJECTED],
    ApplicationStatus.APPROVED: [],
    ApplicationStatus.REJECTED: [],
}


class ScholarshipApplication(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    """End-to-end scholarship grant application."""

    __tablename__ = "scholarship_applications"

    application_number: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)
    athlete_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False
    )
    program_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("scholarship_programs.id", ondelete="SET NULL"), nullable=True
    )
    sport_code: Mapped[str] = mapped_column(String(50), nullable=False)
    competition_level: Mapped[str] = mapped_column(String(50), nullable=False)
    preliminary_score: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    status: Mapped[str] = mapped_column(
        String(50), default=ApplicationStatus.SUBMITTED.value, index=True, nullable=False
    )
    assigned_verifier_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    reviewer_notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    submitted_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)

    documents: Mapped[List["ApplicationDocument"]] = relationship(
        "ApplicationDocument", back_populates="application", cascade="all, delete-orphan"
    )

    def can_transition_to(self, new_status: ApplicationStatus) -> bool:
        """Enforce strict status state machine transition rules."""
        current = ApplicationStatus(self.status)
        return new_status in VALID_STATUS_TRANSITIONS.get(current, [])


class ApplicationDocument(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    """Secure metadata record for athlete uploaded verification files."""

    __tablename__ = "application_documents"

    application_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("scholarship_applications.id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )
    document_type: Mapped[str] = mapped_column(
        String(50), nullable=False
    )  # AADHAAR, SPORTS_CERTIFICATE, INCOME_CERTIFICATE
    file_name: Mapped[str] = mapped_column(String(255), nullable=False)
    mime_type: Mapped[str] = mapped_column(String(100), nullable=False)
    file_size_bytes: Mapped[int] = mapped_column(Integer, nullable=False)
    storage_key: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    application: Mapped["ScholarshipApplication"] = relationship(
        "ScholarshipApplication", back_populates="documents"
    )
