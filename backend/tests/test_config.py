"""Tests for application settings and configuration."""

from app.core.config import Settings


def test_default_settings():
    """Verify application configuration defaults."""
    settings = Settings()
    assert settings.APP_NAME == "Bharat Sports Grant API"
    assert settings.API_V1_PREFIX == "/api/v1"
    assert settings.ACCESS_TOKEN_EXPIRE_MINUTES == 15
    assert settings.REFRESH_TOKEN_EXPIRE_DAYS == 7
    assert "http://localhost:3000" in settings.CORS_ORIGINS


def test_cors_origins_validator():
    """Verify CORS origins string splitting."""
    settings = Settings(CORS_ORIGINS="http://localhost:3000,http://127.0.0.1:3000")
    assert "http://localhost:3000" in settings.CORS_ORIGINS
    assert "http://127.0.0.1:3000" in settings.CORS_ORIGINS
