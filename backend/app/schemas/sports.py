"""Schemas for Sports Catalogue, Scholarships, and Rules Engine Evaluation."""

import uuid
from datetime import date
from typing import Optional, List, Dict
from pydantic import BaseModel, Field, ConfigDict
from app.models.sport import CompetitionLevel


class SportBase(BaseModel):
    code: str
    name: str
    category: str
    description: Optional[str] = None
    governing_body: Optional[str] = None
    is_active: bool = True


class SportResponse(SportBase):
    id: uuid.UUID
    model_config = ConfigDict(from_attributes=True)


class ScholarshipProgramBase(BaseModel):
    code: str
    title: str
    sport_id: uuid.UUID
    description: Optional[str] = None
    min_age: int = 12
    max_age: int = 28
    min_competition_level: CompetitionLevel = CompetitionLevel.STATE
    funding_amount_inr: float
    application_deadline: Optional[date] = None
    is_active: bool = True


class ScholarshipProgramResponse(ScholarshipProgramBase):
    id: uuid.UUID
    model_config = ConfigDict(from_attributes=True)


class EligibilityEvaluationRequest(BaseModel):
    athlete_age: int = Field(..., ge=8, le=60)
    sport_code: str
    competition_level: CompetitionLevel
    has_active_national_ban: bool = False
    income_bracket_lpa: Optional[float] = None
    state: str


class EligibilityEvaluationResult(BaseModel):
    is_eligible: bool
    status: str  # "ELIGIBLE", "INELIGIBLE", "BORDERLINE"
    score: int = Field(..., ge=0, le=100)
    reasons: List[str]
    qualifying_programs: List[str]
    funding_bracket_inr: Optional[float] = None
    breakdown: Dict[str, bool]
