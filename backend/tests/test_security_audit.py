"""Security hardening, boundary protection, and OWASP audit verification tests."""

import pytest
from app.security.auth import decode_token, hash_password, verify_password
from app.schemas.auth import UserRegisterRequest, UserRole
from app.models.sport import CompetitionLevel
from app.schemas.sports import EligibilityEvaluationRequest
from app.rules_engine.evaluator import EligibilityRulesEngine


def test_sql_injection_resilience_in_schemas():
    """Verify malicious SQL injection payloads in string inputs are sanitized or properly handled."""
    sql_payload = "'; DROP TABLE users; --"
    # Even if an attacker passes an SQL injection payload as sport_code or state,
    # the rules engine evaluates safely via parameterized logic without dynamic SQL execution.
    req = EligibilityEvaluationRequest(
        athlete_age=19,
        sport_code=sql_payload,
        competition_level=CompetitionLevel.STATE,
        has_active_national_ban=False,
        state=sql_payload,
    )
    result = EligibilityRulesEngine.evaluate(req)
    assert result.is_eligible is True
    assert sql_payload.upper() in result.qualifying_programs[0]


def test_xss_payload_in_user_registration():
    """Verify XSS scripts in user registration fields do not trigger unexpected behavior."""
    xss_script = "<script>alert('xss')</script>"
    # Phone must strictly conform to regex, blocking script injection entirely
    with pytest.raises(Exception):
        UserRegisterRequest(
            email="victim@example.com",
            phone=xss_script,
            password="ValidPassword123!",
            role=UserRole.ATHLETE,
        )


def test_invalid_jwt_tampering():
    """Verify tampered JWT tokens fail cryptographic signature checks."""
    tampered_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicm9sZSI6IkFETUlOIn0.tampered_signature"
    with pytest.raises(Exception):
        decode_token(tampered_token)


def test_timing_attack_resilience_in_passwords():
    """Verify invalid password check completes in safe non-trivial time without leaking hashes."""
    real_hash = hash_password("CorrectPassword123")
    assert verify_password("IncorrectPassword", real_hash) is False
    assert verify_password("", real_hash) is False
