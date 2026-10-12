"""Sports catalogue and Scholarship Program database models."""

import uuid
from datetime import date
from typing import Optional, List
from sqlalchemy import String, Integer, Numeric, Text, Boolean, Date, ForeignKey, Enum as SAEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
import enum

from app.db.base import Base, UUIDPrimaryKeyMixin, TimestampMixin


class CompetitionLevel(str, enum.Enum):
    DISTRICT = "DISTRICT"
    STATE = "STATE"
    NATIONAL = "NATIONAL"
    INTERNATIONAL = "INTERNATIONAL"


# Numerical rank for hierarchy checks
COMPETITION_HIERARCHY = {
    CompetitionLevel.DISTRICT: 1,
    CompetitionLevel.STATE: 2,
    CompetitionLevel.NATIONAL: 3,
    CompetitionLevel.INTERNATIONAL: 4,
}


class Sport(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    """Recognized sports in Bharat Sports Grant catalogue."""

    __tablename__ = "sports"

    code: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    category: Mapped[str] = mapped_column(String(50), nullable=False)  # Olympic, Indigenous, Combat, Team, Racquet
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    governing_body: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    scholarships: Mapped[List["ScholarshipProgram"]] = relationship(
        "ScholarshipProgram", back_populates="sport", cascade="all, delete-orphan"
    )


class ScholarshipProgram(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    """Configurable grant program with eligibility criteria."""

    __tablename__ = "scholarship_programs"

    code: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)
    title: Mapped[str] = mapped_column(String(150), nullable=False)
    sport_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("sports.id", ondelete="CASCADE"), nullable=False
    )
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    min_age: Mapped[int] = mapped_column(Integer, default=12, nullable=False)
    max_age: Mapped[int] = mapped_column(Integer, default=28, nullable=False)
    min_competition_level: Mapped[str] = mapped_column(
        String(50), default=CompetitionLevel.STATE.value, nullable=False
    )
    funding_amount_inr: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    application_deadline: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    sport: Mapped["Sport"] = relationship("Sport", back_populates="scholarships")
