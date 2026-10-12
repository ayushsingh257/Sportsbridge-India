"""Scholarship Applications and Verification Routes."""

import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.user import User
from app.models.application import ApplicationStatus
from app.schemas.application import (
    ApplicationSubmitRequest,
    ApplicationResponse,
    ApplicationStatusUpdateRequest,
    DocumentUploadRequest,
    DocumentMetadata,
)
from app.repositories.application_repo import ApplicationRepository
from app.security.auth import get_current_user

router = APIRouter(prefix="/applications", tags=["Applications"])


@router.post("/submit", response_model=ApplicationResponse, status_code=status.HTTP_201_CREATED)
async def submit_application(
    payload: ApplicationSubmitRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Submit a new scholarship application."""
    repo = ApplicationRepository(db)
    app = await repo.create_application(current_user.id, payload)
    return app


@router.get("/my-applications", response_model=List[ApplicationResponse])
async def get_my_applications(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Retrieve all applications submitted by the current authenticated athlete."""
    repo = ApplicationRepository(db)
    apps = await repo.get_by_athlete_id(current_user.id)
    return apps


@router.get("/{application_id}", response_model=ApplicationResponse)
async def get_application(
    application_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get single application details."""
    repo = ApplicationRepository(db)
    app = await repo.get_by_id(application_id)
    if not app:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found.",
        )

    # Access check: Only owner or admin/reviewer
    if app.athlete_id != current_user.id and current_user.role not in ["ADMIN", "REVIEWER"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Unauthorized access to this application record.",
        )

    return app


@router.post("/{application_id}/documents", response_model=DocumentMetadata, status_code=status.HTTP_201_CREATED)
async def upload_document_metadata(
    application_id: uuid.UUID,
    payload: DocumentUploadRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Attach document verification metadata to application."""
    repo = ApplicationRepository(db)
    app = await repo.get_by_id(application_id)
    if not app:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found.",
        )

    if app.athlete_id != current_user.id and current_user.role != "ADMIN":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Unauthorized to upload documents for this application.",
        )

    # Secure storage key generation
    storage_key = f"docs/{application_id}/{uuid.uuid4()}_{payload.file_name}"
    doc = await repo.add_document(application_id, payload, storage_key)
    return doc


@router.patch("/{application_id}/status", response_model=ApplicationResponse)
async def update_application_status(
    application_id: uuid.UUID,
    payload: ApplicationStatusUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Reviewer or Admin updates application status along state-machine boundaries."""
    if current_user.role not in ["ADMIN", "REVIEWER"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only Verifiers or Administrators can modify application review status.",
        )

    repo = ApplicationRepository(db)
    app = await repo.get_by_id(application_id)
    if not app:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Application not found.",
        )

    try:
        updated = await repo.transition_status(
            app,
            new_status=payload.new_status,
            reviewer_id=current_user.id,
            notes=payload.reviewer_notes,
        )
        return updated
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
