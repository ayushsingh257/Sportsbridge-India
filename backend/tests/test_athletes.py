"""Unit and schema tests for athlete profile, BMI calculation, and completion metrics."""

import uuid
from datetime import date
import pytest
from pydantic import ValidationError

from app.models.athlete import AthleteProfile
from app.schemas.athlete import (
    AthleteProfileCreate,
    AthleteProfileUpdate,
    AthleteProfileResponse,
)
from app.repositories.athlete_repo import AthleteRepository


def test_athlete_age_calculation():
    """Verify age derivation logic calculates exact age from date of birth."""
    today = date.today()
    # Exactly 20 years ago
    dob_20 = date(today.year - 20, today.month, today.day)
    profile = AthleteProfile(
        first_name="Neeraj",
        last_name="Chopra",
        username="neeraj_gold",
        date_of_birth=dob_20,
        state="Haryana",
        city="Panipat",
        education_level="Graduate",
    )
    assert profile.calculate_age() == 20


def test_athlete_bmi_calculation():
    """Verify BMI formula: weight (kg) / (height (m) ^ 2)."""
    profile = AthleteProfile(
        first_name="Mary",
        last_name="Kom",
        username="marykom",
        date_of_birth=date(1983, 3, 1),
        height_cm=160.0,
        weight_kg=51.2,
        state="Manipur",
        city="Kangathei",
        education_level="Graduate",
    )
    bmi = profile.calculate_bmi()
    # 51.2 / (1.6 * 1.6) = 51.2 / 2.56 = 20.0
    assert bmi == 20.0


def test_athlete_bmi_with_missing_metrics():
    """Verify BMI returns None gracefully when height or weight is absent."""
    profile = AthleteProfile(
        first_name="Test",
        last_name="Athlete",
        username="test_athlete",
        date_of_birth=date(2000, 1, 1),
        state="Delhi",
        city="New Delhi",
        education_level="High School",
    )
    assert profile.calculate_bmi() is None


def test_profile_completion_percentage():
    """Verify completion percentage based on filled fields."""
    profile = AthleteProfile(
        first_name="P.V.",
        last_name="Sindhu",
        username="pvsindhu",
        date_of_birth=date(1995, 7, 5),
        gender="Female",
        height_cm=179.0,
        weight_kg=65.0,
        state="Telangana",
        city="Hyderabad",
        education_level="Post-Graduate",
        preferred_sports=["Badminton"],
        achievements_summary="Olympic Silver and Bronze medalist.",
    )
    completion = AthleteRepository.calculate_completion(profile)
    assert completion == 100


def test_athlete_schema_validation():
    """Verify pydantic constraints on height, weight, and required fields."""
    # Valid payload
    payload = AthleteProfileCreate(
        first_name="Lakshya",
        last_name="Sen",
        username="lakshya",
        date_of_birth=date(2001, 8, 16),
        height_cm=178,
        weight_kg=70,
        state="Uttarakhand",
        city="Almora",
        education_level="High School",
        preferred_sports=["Badminton"],
    )
    assert payload.first_name == "Lakshya"

    # Invalid height (less than 50cm or over 280cm)
    with pytest.raises(ValidationError):
        AthleteProfileCreate(
            first_name="Lakshya",
            last_name="Sen",
            username="lakshya",
            date_of_birth=date(2001, 8, 16),
            height_cm=300,  # exceeds 280
            weight_kg=70,
            state="Uttarakhand",
            city="Almora",
            education_level="High School",
        )
