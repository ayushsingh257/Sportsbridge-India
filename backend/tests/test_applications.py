"""Unit tests for Phase 7 scholarship application lifecycle and state transitions."""

import re
import pytest
from pydantic import ValidationError

from app.models.application import (
    ScholarshipApplication,
    ApplicationStatus,
    VALID_STATUS_TRANSITIONS,
)
from app.schemas.application import DocumentUploadRequest
from app.repositories.application_repo import ApplicationRepository


def test_application_reference_number_format():
    """Verify generated application numbers follow the BSG-YYYY-SPOR-XXXX pattern."""
    num = ApplicationRepository.generate_application_number("archery")
    pattern = r"^BSG-\d{4}-ARCH-\d{4}$"
    assert re.match(pattern, num) is not None


def test_valid_state_machine_transition():
    """Verify normal step-by-step application transitions."""
    app = ScholarshipApplication(
        application_number="BSG-2026-ARCH-1111",
        status=ApplicationStatus.SUBMITTED.value,
        sport_code="archery",
        competition_level="STATE",
    )

    # Valid step 1: SUBMITTED -> PRELIMINARY_REVIEW
    assert app.can_transition_to(ApplicationStatus.PRELIMINARY_REVIEW) is True

    # Valid step 2: PRELIMINARY_REVIEW -> VERIFICATION_PENDING
    app.status = ApplicationStatus.PRELIMINARY_REVIEW.value
    assert app.can_transition_to(ApplicationStatus.VERIFICATION_PENDING) is True

    # Valid step 3: VERIFICATION_PENDING -> APPROVED
    app.status = ApplicationStatus.VERIFICATION_PENDING.value
    assert app.can_transition_to(ApplicationStatus.APPROVED) is True


def test_invalid_state_machine_transition():
    """Direct jump from SUBMITTED to APPROVED without review must be forbidden."""
    app = ScholarshipApplication(
        application_number="BSG-2026-ARCH-1111",
        status=ApplicationStatus.SUBMITTED.value,
        sport_code="archery",
        competition_level="STATE",
    )

    # Cannot skip review straight to approved
    assert app.can_transition_to(ApplicationStatus.APPROVED) is False


def test_document_size_limit_validation():
    """Verify files larger than 15MB are rejected by pydantic schema validation."""
    # Under limit (10MB) -> Valid
    doc = DocumentUploadRequest(
        document_type="AADHAAR",
        file_name="aadhaar.pdf",
        mime_type="application/pdf",
        file_size_bytes=10 * 1024 * 1024,
    )
    assert doc.file_name == "aadhaar.pdf"

    # Exceeding limit (20MB) -> Raises ValidationError
    with pytest.raises(ValidationError):
        DocumentUploadRequest(
            document_type="AADHAAR",
            file_name="heavy_scan.pdf",
            mime_type="application/pdf",
            file_size_bytes=20 * 1024 * 1024,
        )
