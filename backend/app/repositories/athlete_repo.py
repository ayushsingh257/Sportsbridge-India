"""Athlete database repository for profile operations."""

import uuid
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.athlete import AthleteProfile
from app.schemas.athlete import AthleteProfileCreate, AthleteProfileUpdate


class AthleteRepository:
    """Encapsulates AthleteProfile database interactions."""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_user_id(self, user_id: uuid.UUID) -> Optional[AthleteProfile]:
        """Fetch athlete profile by linked user UUID."""
        stmt = select(AthleteProfile).where(AthleteProfile.user_id == user_id)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def get_by_username(self, username: str) -> Optional[AthleteProfile]:
        """Fetch athlete profile by username."""
        stmt = select(AthleteProfile).where(AthleteProfile.username == username.lower().strip())
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def create_profile(self, user_id: uuid.UUID, data: AthleteProfileCreate) -> AthleteProfile:
        """Creates a new athlete profile."""
        profile = AthleteProfile(
            user_id=user_id,
            first_name=data.first_name.strip(),
            last_name=data.last_name.strip(),
            username=data.username.lower().strip(),
            date_of_birth=data.date_of_birth,
            gender=data.gender,
            height_cm=data.height_cm,
            weight_kg=data.weight_kg,
            state=data.state.strip(),
            city=data.city.strip(),
            education_level=data.education_level,
            preferred_sports=data.preferred_sports,
            achievements_summary=data.achievements_summary,
        )
        self.db.add(profile)
        await self.db.commit()
        await self.db.refresh(profile)
        return profile

    async def update_profile(
        self, profile: AthleteProfile, data: AthleteProfileUpdate
    ) -> AthleteProfile:
        """Updates an existing athlete profile."""
        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(profile, field, value)

        await self.db.commit()
        await self.db.refresh(profile)
        return profile

    @staticmethod
    def calculate_completion(profile: AthleteProfile) -> int:
        """Derives a profile completeness percentage."""
        fields = [
            profile.first_name,
            profile.last_name,
            profile.username,
            profile.date_of_birth,
            profile.state,
            profile.city,
            profile.education_level,
            profile.gender,
            profile.height_cm,
            profile.weight_kg,
            bool(profile.preferred_sports),
            profile.achievements_summary,
        ]
        completed = sum(1 for f in fields if f is not None and f != "" and f is not False)
        return int((completed / len(fields)) * 100)
