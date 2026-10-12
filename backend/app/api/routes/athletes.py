"""Athlete Profile & Dashboard API Routes."""

import uuid
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.user import User
from app.schemas.athlete import (
    AthleteProfileCreate,
    AthleteProfileUpdate,
    AthleteProfileResponse,
    AthleteDashboardSummary,
)
from app.repositories.athlete_repo import AthleteRepository
from app.security.auth import get_current_user

router = APIRouter(prefix="/athletes", tags=["Athletes"])


def _to_profile_response(profile, repo: AthleteRepository) -> AthleteProfileResponse:
    """Helper to convert AthleteProfile model to AthleteProfileResponse with derived fields."""
    return AthleteProfileResponse(
        id=profile.id,
        user_id=profile.user_id,
        first_name=profile.first_name,
        last_name=profile.last_name,
        username=profile.username,
        date_of_birth=profile.date_of_birth,
        gender=profile.gender,
        height_cm=float(profile.height_cm) if profile.height_cm is not None else None,
        weight_kg=float(profile.weight_kg) if profile.weight_kg is not None else None,
        state=profile.state,
        city=profile.city,
        education_level=profile.education_level,
        preferred_sports=profile.preferred_sports or [],
        achievements_summary=profile.achievements_summary,
        age=profile.calculate_age(),
        bmi=profile.calculate_bmi(),
        profile_completion_percentage=repo.calculate_completion(profile),
        created_at=profile.created_at,
        updated_at=profile.updated_at,
    )


@router.get("/me", response_model=AthleteProfileResponse)
async def get_my_profile(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Retrieve the authenticated athlete's profile."""
    repo = AthleteRepository(db)
    profile = await repo.get_by_user_id(current_user.id)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Athlete profile not found. Please create one.",
        )
    return _to_profile_response(profile, repo)


@router.post("/me", response_model=AthleteProfileResponse, status_code=status.HTTP_201_CREATED)
async def create_my_profile(
    payload: AthleteProfileCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Create athlete profile for the current user."""
    repo = AthleteRepository(db)
    existing = await repo.get_by_user_id(current_user.id)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Profile already exists for this athlete.",
        )

    # Check username uniqueness
    existing_username = await repo.get_by_username(payload.username)
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username is already taken.",
        )

    profile = await repo.create_profile(current_user.id, payload)
    return _to_profile_response(profile, repo)


@router.put("/me", response_model=AthleteProfileResponse)
async def update_my_profile(
    payload: AthleteProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Update existing profile details."""
    repo = AthleteRepository(db)
    profile = await repo.get_by_user_id(current_user.id)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Athlete profile does not exist. Create profile first.",
        )

    updated = await repo.update_profile(profile, payload)
    return _to_profile_response(updated, repo)


@router.get("/me/dashboard", response_model=AthleteDashboardSummary)
async def get_my_dashboard(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Aggregated stats and metrics for the athlete dashboard."""
    repo = AthleteRepository(db)
    profile = await repo.get_by_user_id(current_user.id)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Athlete profile not found.",
        )

    resp = _to_profile_response(profile, repo)
    return AthleteDashboardSummary(
        athlete=resp,
        total_applications=0,
        active_applications=0,
        approved_scholarships_count=0,
        ledger_balance_inr=0.0,
        pending_expenses_count=0,
    )


@router.get("/{username}", response_model=AthleteProfileResponse)
async def get_public_profile(
    username: str,
    db: AsyncSession = Depends(get_db),
):
    """View athlete public profile by username."""
    repo = AthleteRepository(db)
    profile = await repo.get_by_username(username)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Athlete not found.",
        )
    return _to_profile_response(profile, repo)
