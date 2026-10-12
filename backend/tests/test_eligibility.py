"""Unit and rules engine tests for Phase 6 Eligibility Evaluation."""

import pytest
from app.models.sport import CompetitionLevel
from app.schemas.sports import EligibilityEvaluationRequest
from app.rules_engine.evaluator import EligibilityRulesEngine


def test_national_ban_strict_rejection():
    """Athletes with an active national/anti-doping ban must be strictly disqualified."""
    req = EligibilityEvaluationRequest(
        athlete_age=21,
        sport_code="archery",
        competition_level=CompetitionLevel.NATIONAL,
        has_active_national_ban=True,
        state="Haryana",
    )
    result = EligibilityRulesEngine.evaluate(req)

    assert result.is_eligible is False
    assert result.status == "INELIGIBLE"
    assert result.score == 0
    assert "anti-doping suspension" in result.reasons[0].lower()


def test_international_athlete_high_score_and_funding():
    """International athletes within prime age window should get maximum funding and high score."""
    req = EligibilityEvaluationRequest(
        athlete_age=19,
        sport_code="badminton",
        competition_level=CompetitionLevel.INTERNATIONAL,
        has_active_national_ban=False,
        income_bracket_lpa=6.5,
        state="Telangana",
    )
    result = EligibilityRulesEngine.evaluate(req)

    assert result.is_eligible is True
    assert result.status == "ELIGIBLE"
    assert result.score >= 85
    assert result.funding_bracket_inr == 1200000.0
    assert len(result.qualifying_programs) >= 2


def test_out_of_age_bounds_ineligible():
    """Athletes outside 10-35 age bracket are disqualified."""
    req = EligibilityEvaluationRequest(
        athlete_age=42,
        sport_code="shooting",
        competition_level=CompetitionLevel.STATE,
        has_active_national_ban=False,
        state="Punjab",
    )
    result = EligibilityRulesEngine.evaluate(req)

    assert result.is_eligible is False
    assert result.breakdown["age_window"] is False


def test_district_athlete_evaluation():
    """District level athlete evaluation generates grassroots tier funding."""
    req = EligibilityEvaluationRequest(
        athlete_age=15,
        sport_code="athletics",
        competition_level=CompetitionLevel.DISTRICT,
        has_active_national_ban=False,
        state="Kerala",
    )
    result = EligibilityRulesEngine.evaluate(req)

    assert result.is_eligible is True
    assert result.funding_bracket_inr == 100000.0
    assert any("District" in p for p in result.qualifying_programs)
