"""Pydantic schemas for authentication and registration."""

import re
import uuid
from datetime import datetime
from typing import Optional
from enum import Enum
from pydantic import BaseModel, EmailStr, Field, field_validator, ConfigDict


class UserRole(str, Enum):
    """Platform access roles."""
    VISITOR = "VISITOR"
    ATHLETE = "ATHLETE"
    VERIFIER = "VERIFIER"
    FINANCE_OFFICER = "FINANCE_OFFICER"
    SCHOLARSHIP_ADMIN = "SCHOLARSHIP_ADMIN"
    SUPER_ADMIN = "SUPER_ADMIN"


class UserRegisterRequest(BaseModel):
    """Athlete account registration payload."""
    email: EmailStr
    phone: str = Field(..., description="Indian phone number normalized to +91XXXXXXXXXX")
    password: str = Field(..., min_length=8, description="Minimum 8 characters")
    role: UserRole = UserRole.ATHLETE

    @field_validator("phone")
    @classmethod
    def validate_indian_phone(cls, v: str) -> str:
        # Strip spaces and hyphens
        cleaned = re.sub(r"[\s\-]", "", v)
        if not cleaned.startswith("+91"):
            if len(cleaned) == 10 and cleaned.isdigit():
                cleaned = f"+91{cleaned}"
            else:
                raise ValueError("Phone number must include Indian country code (+91) followed by 10 digits")
        # Validate 10-digit Indian mobile starting with 6, 7, 8, or 9
        if not re.match(r"^\+91[6-9]\d{9}$", cleaned):
            raise ValueError("Must be a valid 10-digit Indian mobile number (e.g. +91 9876543210)")
        return cleaned


class UserLoginRequest(BaseModel):
    """User login credentials payload."""
    identifier: str = Field(..., description="Registered email address or +91 phone number")
    password: str = Field(...)


class UserResponse(BaseModel):
    """User account details response."""
    id: uuid.UUID
    email: str
    phone: str
    role: str
    is_email_verified: bool
    is_phone_verified: bool
    is_active: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class TokenResponse(BaseModel):
    """JWT authentication token bundle."""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserResponse


class TokenRefreshRequest(BaseModel):
    """Token refresh payload."""
    refresh_token: str


class OTPVerifyRequest(BaseModel):
    """Phone or email OTP verification payload."""
    identifier: str
    otp_code: str = Field(..., min_length=6, max_length=6)
