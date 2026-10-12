"""Tests for root and health check endpoints."""

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_root_metadata_endpoint():
    """Verify root endpoint returns application metadata."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Bharat Sports Grant API"
    assert data["status"] == "online"
    assert "environment" in data


def test_api_v1_health_endpoint():
    """Verify /api/v1/health returns standardized response envelope."""
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    payload = response.json()
    assert payload["success"] is True
    assert "data" in payload
    data = payload["data"]
    assert data["status"] == "healthy"
    assert data["version"] == "0.1.0"
    assert "database" in data
    assert "timestamp" in payload
