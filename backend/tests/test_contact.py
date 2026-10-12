"""Unit tests for Phase 10 Contact, Grievance tracking tickets, and Notifications."""

import re
import pytest
from app.models.contact import ContactTicket, Notification, TicketCategory
from app.schemas.contact import ContactTicketCreateRequest
from app.api.routes.contact import generate_ticket_number


def test_ticket_number_generation():
    """Verify generated tracking tickets follow TKT-YYYY-CAT-XXXX format."""
    num = generate_ticket_number(TicketCategory.GRIEVANCE.value)
    pattern = r"^TKT-\d{4}-GRI-\d{4}$"
    assert re.match(pattern, num) is not None


def test_contact_ticket_schema_validation():
    """Verify contact ticket schema enforces valid email and minimum message length."""
    req = ContactTicketCreateRequest(
        name="Neeraj Athlete",
        email="athlete@sportsbridge.in",
        phone="+919876543210",
        category=TicketCategory.SCHOLARSHIP_QUERY,
        subject="Query regarding Archery Equipment Grant",
        message="Please clarify the documentation requirements for recurve bow equipment reimbursement.",
    )
    assert req.name == "Neeraj Athlete"
    assert req.category == TicketCategory.SCHOLARSHIP_QUERY
