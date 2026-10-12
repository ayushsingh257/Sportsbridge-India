"""Pydantic schemas for Athlete Profile."""

import uuid
from datetime import date, datetime
from typing import Optional, List
from pydantic import BaseModel, Field, ConfigDict


class AthleteProfileBase(BaseModel):
    """Base athlete attributes."""
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    username: str = Field(..., min_length=3, max_length=50)
    date_of_birth: date
    gender: Optional[str] = None
    height_cm: Optional[float] = Field(None, ge=50, le=280)
    weight_kg: Optional[float] = Field(None, ge=20, le=300)
    state: str = Field(..., min_length=2, max_length=100)
    city: str = Field(..., min_length=2, max_length=100)
    education_level: str = Field(..., min_length=2, max_length=50)
    preferred_sports: List[str] = Field(default_factory=list)
    achievements_summary: Optional[str] = None


class AthleteProfileCreate(AthleteProfileBase):
    """Payload for creating athlete profile."""
    pass


class AthleteProfileUpdate(BaseModel):
    """Payload for updating athlete profile."""
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    gender: Optional[str] = None
    height_cm: Optional[float] = None
    weight_kg: Optional[float] = None
    state: Optional[str] = None
    city: Optional[str] = None
    education_level: Optional[str] = None
    preferred_sports: Optional[List[str]] = None
    achievements_summary: Optional[str] = None


class AthleteProfileResponse(AthleteProfileBase):
    """Serialized athlete profile with derived analytics."""
    id: uuid.UUID
    user_id: uuid.UUID
    age: int
    bmi: Optional[float] = None
    profile_completion_percentage: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class AthleteDashboardSummary(BaseModel):
    """Aggregated metrics for athlete dashboard."""
    athlete: AthleteProfileResponse
    total_applications: int = 0
    active_applications: int = 0
    approved_scholarships_count: int = 0
    ledger_balance_inr: float = 0.0
    pending_expenses_count: int = 0
