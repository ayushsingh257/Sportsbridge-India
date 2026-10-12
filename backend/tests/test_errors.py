"""Tests for error handling and standard error envelope responses."""

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_404_not_found_returns_standard_envelope():
    """Verify missing route returns standardized error envelope."""
    response = client.get("/api/v1/non-existent-route")
    assert response.status_code == 404
    payload = response.json()
    assert payload["success"] is False
    assert "error" in payload
    assert payload["error"]["code"] == "NOT_FOUND"
    assert "timestamp" in payload
