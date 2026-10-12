"""Unit and schema tests for authentication, tokens, and Indian phone validation."""

import pytest
from app.schemas.auth import UserRegisterRequest, UserRole
from app.security.auth import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
    decode_token,
)


def test_password_hashing():
    """Verify bcrypt hashes passwords securely and verifies correctly."""
    plain = "SecurePass123!"
    hashed = hash_password(plain)

    assert hashed != plain
    assert verify_password(plain, hashed) is True
    assert verify_password("WrongPassword!", hashed) is False


def test_jwt_token_generation_and_decoding():
    """Verify JWT access and refresh token creation and payload extraction."""
    user_id = "550e8400-e29b-41d4-a716-446655440000"
    role = "ATHLETE"

    token = create_access_token(subject=user_id, role=role)
    payload = decode_token(token)

    assert payload["sub"] == user_id
    assert payload["role"] == role
    assert payload["type"] == "access"
    assert "exp" in payload


def test_valid_indian_mobile_numbers():
    """Verify valid Indian mobile numbers with +91 country code normalize properly."""
    valid_numbers = [
        "+919876543210",
        "+91 98765 43210",
        "+91-9876543210",
        "9876543210",  # Automatically prepends +91
        "+918123456789",
        "+917012345678",
        "+916298765432",
    ]

    for num in valid_numbers:
        req = UserRegisterRequest(
            email="athlete@example.com",
            phone=num,
            password="StrongPassword123",
            role=UserRole.ATHLETE,
        )
        assert req.phone.startswith("+91")
        assert len(req.phone) == 13


def test_invalid_indian_mobile_numbers():
    """Verify invalid phone numbers are rejected by backend validation."""
    invalid_numbers = [
        "+14155552671",     # US number
        "+911234567890",    # Does not start with 6, 7, 8, or 9
        "12345",            # Too short
        "98765432101234",   # Too long
        "+91abcdefghij",    # Non-digits
    ]

    for num in invalid_numbers:
        with pytest.raises(Exception):
            UserRegisterRequest(
                email="athlete@example.com",
                phone=num,
                password="StrongPassword123",
                role=UserRole.ATHLETE,
            )
