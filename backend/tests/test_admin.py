"""Unit tests for Phase 9 Admin RBAC, queues, and Audit logging."""

import uuid
from app.models.audit import AuditLog
from app.schemas.admin import AuditLogResponse, AdminQueueSummary


def test_audit_log_instantiation_and_schema():
    """Verify AuditLog model fields and serialization."""
    log_id = uuid.uuid4()
    actor_id = uuid.uuid4()
    audit = AuditLog(
        id=log_id,
        actor_id=actor_id,
        actor_email="admin@sportsbridge.in",
        actor_role="ADMIN",
        action="APPLICATION_APPROVED",
        entity_type="APPLICATION",
        entity_id="BSG-2026-ARCH-0012",
        details={"previous_status": "VERIFICATION_PENDING", "new_status": "APPROVED"},
        ip_address="127.0.0.1",
    )

    assert audit.action == "APPLICATION_APPROVED"
    assert audit.actor_role == "ADMIN"
    assert audit.details["new_status"] == "APPROVED"


def test_admin_queue_summary_schema():
    """Verify queue summary model structure."""
    summary = AdminQueueSummary(
        pending_applications=[],
        pending_expenses=[],
        recent_audits=[],
        total_athletes_supported=150,
        total_disbursed_inr=5000000.0,
    )

    assert summary.total_athletes_supported == 150
    assert summary.total_disbursed_inr == 5000000.0
    assert len(summary.pending_applications) == 0
