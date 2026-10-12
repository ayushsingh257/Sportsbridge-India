"""Pydantic schemas for scholarship applications and document submissions."""

import uuid
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, ConfigDict
from app.models.application import ApplicationStatus


class DocumentMetadata(BaseModel):
    id: uuid.UUID
    document_type: str
    file_name: str
    mime_type: str
    file_size_bytes: int
    is_verified: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ApplicationSubmitRequest(BaseModel):
    sport_code: str = Field(..., min_length=2, max_length=50)
    program_id: Optional[uuid.UUID] = None
    competition_level: str = Field(..., min_length=2, max_length=50)
    preliminary_score: int = Field(0, ge=0, le=100)


class ApplicationStatusUpdateRequest(BaseModel):
    new_status: ApplicationStatus
    reviewer_notes: Optional[str] = None


class ApplicationResponse(BaseModel):
    id: uuid.UUID
    application_number: str
    athlete_id: uuid.UUID
    program_id: Optional[uuid.UUID] = None
    sport_code: str
    competition_level: str
    preliminary_score: int
    status: str
    assigned_verifier_id: Optional[uuid.UUID] = None
    reviewer_notes: Optional[str] = None
    submitted_at: datetime
    documents: List[DocumentMetadata] = Field(default_factory=list)

    model_config = ConfigDict(from_attributes=True)


class DocumentUploadRequest(BaseModel):
    document_type: str = Field(..., min_length=2, max_length=50)
    file_name: str = Field(..., min_length=3, max_length=255)
    mime_type: str = Field(..., min_length=3, max_length=100)
    file_size_bytes: int = Field(..., gt=0, le=15728640)  # Max 15MB
