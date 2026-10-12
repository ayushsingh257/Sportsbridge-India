"""User database repository for query abstractions."""

import uuid
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_

from app.models.user import User


class UserRepository:
    """Encapsulates User database operations."""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, user_id: uuid.UUID) -> Optional[User]:
        """Fetch user by primary key UUID."""
        stmt = select(User).where(User.id == user_id)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def get_by_email(self, email: str) -> Optional[User]:
        """Fetch user by unique email."""
        stmt = select(User).where(User.email == email.lower().strip())
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def get_by_phone(self, phone: str) -> Optional[User]:
        """Fetch user by unique normalized phone."""
        stmt = select(User).where(User.phone == phone)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def get_by_identifier(self, identifier: str) -> Optional[User]:
        """Fetch user by either email or phone."""
        clean_id = identifier.strip()
        stmt = select(User).where(
            or_(
                User.email == clean_id.lower(),
                User.phone == clean_id,
            )
        )
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def create_user(
        self,
        email: str,
        phone: str,
        password_hash: str,
        role: str = "ATHLETE",
    ) -> User:
        """Persists a new user record."""
        user = User(
            email=email.lower().strip(),
            phone=phone,
            password_hash=password_hash,
            role=role,
            is_email_verified=False,
            is_phone_verified=False,
            is_active=True,
        )
        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)
        return user

    async def mark_phone_verified(self, user_id: uuid.UUID) -> Optional[User]:
        """Marks an athlete's phone as verified."""
        user = await self.get_by_id(user_id)
        if user:
            user.is_phone_verified = True
            await self.db.commit()
            await self.db.refresh(user)
        return user
