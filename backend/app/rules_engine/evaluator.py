"""Configurable Eligibility Evaluation Rules Engine."""

from typing import List, Dict, Tuple
from app.models.sport import CompetitionLevel, COMPETITION_HIERARCHY
from app.schemas.sports import EligibilityEvaluationRequest, EligibilityEvaluationResult


class EligibilityRulesEngine:
    """Evaluates applicant profile metrics deterministically against grant standards."""

    MIN_GLOBAL_AGE = 10
    MAX_GLOBAL_AGE = 35

    @classmethod
    def evaluate(cls, req: EligibilityEvaluationRequest) -> EligibilityEvaluationResult:
        reasons: List[str] = []
        breakdown: Dict[str, bool] = {}
        score = 0

        # Rule 1: Anti-doping & Disciplinary Integrity check
        if req.has_active_national_ban:
            breakdown["disciplinary_clearance"] = False
            return EligibilityEvaluationResult(
                is_eligible=False,
                status="INELIGIBLE",
                score=0,
                reasons=["Athlete is serving an active disciplinary or anti-doping suspension."],
                qualifying_programs=[],
                funding_bracket_inr=0.0,
                breakdown=breakdown,
            )
        breakdown["disciplinary_clearance"] = True

        # Rule 2: Global Age Eligibility
        is_age_valid = cls.MIN_GLOBAL_AGE <= req.athlete_age <= cls.MAX_GLOBAL_AGE
        breakdown["age_window"] = is_age_valid
        if not is_age_valid:
            reasons.append(
                f"Age {req.athlete_age} falls outside the eligible athletic developmental range ({cls.MIN_GLOBAL_AGE}-{cls.MAX_GLOBAL_AGE} years)."
            )

        # Rule 3: Competition Level Evaluation
        comp_rank = COMPETITION_HIERARCHY.get(req.competition_level, 0)
        breakdown["competition_level_met"] = comp_rank >= 1

        if req.competition_level == CompetitionLevel.INTERNATIONAL:
            score += 70
        elif req.competition_level == CompetitionLevel.NATIONAL:
            score += 55
        elif req.competition_level == CompetitionLevel.STATE:
            score += 40
        elif req.competition_level == CompetitionLevel.DISTRICT:
            score += 25

        # Rule 4: Prime Age Developmental Bonus
        if 12 <= req.athlete_age <= 24:
            score += 15
            breakdown["prime_age_bonus"] = True
        else:
            breakdown["prime_age_bonus"] = False

        # Rule 5: Financial Assistance Priority
        if req.income_bracket_lpa is not None and req.income_bracket_lpa <= 8.0:
            score += 15
            breakdown["financial_need_priority"] = True
        else:
            breakdown["financial_need_priority"] = False

        score = min(score, 100)

        # Programs & Funding Tiering
        qualifying_programs = []
        funding_bracket_inr = 0.0

        if is_age_valid and score >= 40:
            if comp_rank >= 3:  # National or International
                qualifying_programs.append(f"{req.sport_code.upper()} Elite Podium Scholarship")
                qualifying_programs.append(f"{req.sport_code.upper()} High-Performance Equipment Grant")
                funding_bracket_inr = 500000.0 if req.competition_level == CompetitionLevel.NATIONAL else 1200000.0
            elif comp_rank == 2:  # State
                qualifying_programs.append(f"{req.sport_code.upper()} State Championship Development Grant")
                funding_bracket_inr = 250000.0
            else:  # District
                qualifying_programs.append(f"{req.sport_code.upper()} Grassroots District Talent Grant")
                funding_bracket_inr = 100000.0

        is_eligible = is_age_valid and score >= 40

        if is_eligible:
            status = "ELIGIBLE"
            reasons.append(
                f"Candidate qualifies at {req.competition_level.value} level with an eligibility score of {score}/100."
            )
        elif score >= 25:
            status = "BORDERLINE"
            reasons.append("Candidate meets district baseline but requires state federation endorsement.")
        else:
            status = "INELIGIBLE"
            reasons.append("Candidate does not satisfy minimum competition thresholds.")

        return EligibilityEvaluationResult(
            is_eligible=is_eligible,
            status=status,
            score=score,
            reasons=reasons,
            qualifying_programs=qualifying_programs,
            funding_bracket_inr=funding_bracket_inr if is_eligible else 0.0,
            breakdown=breakdown,
        )
