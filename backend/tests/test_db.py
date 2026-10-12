"""Tests for database base models and mixins."""

import uuid
from app.db.base import Base, UUIDPrimaryKeyMixin, TimestampMixin
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String


class SampleModel(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    """Test model inheriting mixins before Base to ensure proper MRO."""
    __tablename__ = "test_samples"
    name: Mapped[str] = mapped_column(String(50))


def test_uuid_primary_key_mixin():
    """Verify UUID primary key mixin generates valid UUID."""
    instance = SampleModel(name="Test Item")
    assert instance.id is not None
    assert isinstance(instance.id, uuid.UUID)


def test_timestamp_mixin():
    """Verify timestamp mixin sets created_at and updated_at."""
    instance = SampleModel(name="Test Item")
    assert instance.created_at is not None
    assert instance.updated_at is not None


def test_table_columns_exist():
    """Verify SQLAlchemy columns are properly mapped on the table."""
    columns = SampleModel.__table__.columns
    assert "id" in columns
    assert "created_at" in columns
    assert "updated_at" in columns
    assert "name" in columns
