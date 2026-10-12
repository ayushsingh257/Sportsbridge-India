"""Contact Us, Grievance redressal, and Notification database models."""

import uuid
from datetime import datetime, timezone
from typing import Optional
import enum
from sqlalchemy import String, Text, Boolean, ForeignKey, Enum as SAEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, UUIDPrimaryKeyMixin, TimestampMixin


class TicketCategory(str, enum.Enum):
    GENERAL = "GENERAL"
    SCHOLARSHIP_QUERY = "SCHOLARSHIP_QUERY"
    GRIEVANCE = "GRIEVANCE"
    TECHNICAL = "TECHNICAL"


class ContactTicket(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    """User grievance and general inquiry submission ticket."""

    __tablename__ = "contact_tickets"

    ticket_number: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    phone: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    category: Mapped[str] = mapped_column(String(50), default=TicketCategory.GENERAL.value, nullable=False)
    subject: Mapped[str] = mapped_column(String(200), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="OPEN", nullable=False)
    resolution_notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)


class Notification(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    """In-app alerts and application update notifications for athletes."""

    __tablename__ = "notifications"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False
    )
    title: Mapped[str] = mapped_column(String(150), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    notification_type: Mapped[str] = mapped_column(String(50), default="SYSTEM", nullable=False)
    is_read: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
