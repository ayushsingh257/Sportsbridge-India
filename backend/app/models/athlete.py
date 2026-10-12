"""Athlete Profile database model."""

import uuid
from datetime import date
from typing import Optional, List
from sqlalchemy import String, Date, Numeric, Text, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, UUIDPrimaryKeyMixin, TimestampMixin


class AthleteProfile(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    """Detailed profile data for an athlete."""

    __tablename__ = "athlete_profiles"

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        index=True,
        nullable=False,
    )
    first_name: Mapped[str] = mapped_column(String(100), nullable=False)
    last_name: Mapped[str] = mapped_column(String(100), nullable=False)
    username: Mapped[str] = mapped_column(String(50), unique=True, index=True, nullable=False)
    date_of_birth: Mapped[date] = mapped_column(Date, nullable=False)
    gender: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    height_cm: Mapped[Optional[float]] = mapped_column(Numeric(5, 2), nullable=True)
    weight_kg: Mapped[Optional[float]] = mapped_column(Numeric(5, 2), nullable=True)
    state: Mapped[str] = mapped_column(String(100), nullable=False)
    city: Mapped[str] = mapped_column(String(100), nullable=False)
    education_level: Mapped[str] = mapped_column(String(50), nullable=False)
    preferred_sports: Mapped[list] = mapped_column(JSON, default=list, nullable=False)
    achievements_summary: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    def calculate_age(self) -> int:
        """Derives age from date of birth."""
        today = date.today()
        return today.year - self.date_of_birth.year - (
            (today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day)
        )

    def calculate_bmi(self) -> Optional[float]:
        """Calculates BMI from height (cm) and weight (kg)."""
        if self.height_cm and self.weight_kg and self.height_cm > 0:
            height_m = float(self.height_cm) / 100.0
            return round(float(self.weight_kg) / (height_m * height_m), 2)
        return None
