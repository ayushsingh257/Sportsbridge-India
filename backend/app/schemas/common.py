"""Common Pydantic schemas for standardized API response envelopes."""

from typing import Generic, TypeVar, Optional, List, Any
from datetime import datetime, timezone
from pydantic import BaseModel, Field

DataT = TypeVar("DataT")


class FieldErrorDetail(BaseModel):
    """Detailed field-level validation error."""
    field: str
    issue: str


class ErrorPayload(BaseModel):
    """Structured error payload definition."""
    code: str
    message: str
    details: Optional[List[FieldErrorDetail]] = None


class ApiResponse(BaseModel, Generic[DataT]):
    """Standard success API response envelope."""
    success: bool = True
    data: Optional[DataT] = None
    message: str = "Operation completed successfully"
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ApiErrorResponse(BaseModel):
    """Standard error API response envelope conforming to green.md Rule 9."""
    success: bool = False
    error: ErrorPayload
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class HealthData(BaseModel):
    """Health check payload."""
    status: str
    environment: str
    database: str
    version: str
