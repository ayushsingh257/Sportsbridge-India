"""Repository for scholarship applications and document lifecycle."""

import uuid
import random
from typing import List, Optional
from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.models.application import (
    ScholarshipApplication,
    ApplicationDocument,
    ApplicationStatus,
)
from app.schemas.application import (
    ApplicationSubmitRequest,
    DocumentUploadRequest,
)


class ApplicationRepository:
    """Manages application persistence, transitions, and documents."""

    def __init__(self, db: AsyncSession):
        self.db = db

    @staticmethod
    def generate_application_number(sport_code: str) -> str:
        """Generates standard tracking reference code e.g. BSG-2026-ARCH-8291."""
        current_year = datetime.now(timezone.utc).year
        rand_num = random.randint(1000, 9999)
        prefix = sport_code[:4].upper()
        return f"BSG-{current_year}-{prefix}-{rand_num}"

    async def create_application(
        self, athlete_id: uuid.UUID, data: ApplicationSubmitRequest
    ) -> ScholarshipApplication:
        """Creates a new application in SUBMITTED state."""
        app_num = self.generate_application_number(data.sport_code)

        app = ScholarshipApplication(
            application_number=app_num,
            athlete_id=athlete_id,
            program_id=data.program_id,
            sport_code=data.sport_code.lower().strip(),
            competition_level=data.competition_level,
            preliminary_score=data.preliminary_score,
            status=ApplicationStatus.SUBMITTED.value,
        )
        self.db.add(app)
        await self.db.commit()
        await self.db.refresh(app)
        return app

    async def get_by_id(self, application_id: uuid.UUID) -> Optional[ScholarshipApplication]:
        """Fetch application with pre-loaded documents."""
        stmt = (
            select(ScholarshipApplication)
            .where(ScholarshipApplication.id == application_id)
            .options(selectinload(ScholarshipApplication.documents))
        )
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def get_by_athlete_id(self, athlete_id: uuid.UUID) -> List[ScholarshipApplication]:
        """Fetch all applications for a given athlete."""
        stmt = (
            select(ScholarshipApplication)
            .where(ScholarshipApplication.athlete_id == athlete_id)
            .options(selectinload(ScholarshipApplication.documents))
            .order_by(ScholarshipApplication.submitted_at.desc())
        )
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def add_document(
        self, application_id: uuid.UUID, doc_data: DocumentUploadRequest, storage_key: str
    ) -> ApplicationDocument:
        """Record uploaded document metadata for an application."""
        doc = ApplicationDocument(
            application_id=application_id,
            document_type=doc_data.document_type,
            file_name=doc_data.file_name,
            mime_type=doc_data.mime_type,
            file_size_bytes=doc_data.file_size_bytes,
            storage_key=storage_key,
            is_verified=False,
        )
        self.db.add(doc)
        await self.db.commit()
        await self.db.refresh(doc)
        return doc

    async def transition_status(
        self,
        application: ScholarshipApplication,
        new_status: ApplicationStatus,
        reviewer_id: Optional[uuid.UUID] = None,
        notes: Optional[str] = None,
    ) -> ScholarshipApplication:
        """Transitions application status if permitted by the state machine."""
        if not application.can_transition_to(new_status):
            raise ValueError(
                f"Invalid status transition from {application.status} to {new_status.value}."
            )

        application.status = new_status.value
        if reviewer_id:
            application.assigned_verifier_id = reviewer_id
        if notes:
            application.reviewer_notes = notes

        await self.db.commit()
        await self.db.refresh(application)
        return application
