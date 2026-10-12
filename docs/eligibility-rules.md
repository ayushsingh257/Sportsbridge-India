# Sports Eligibility Rules Engine Specification

**Platform:** Bharat Sports Grant (Sportsbridge India)  
**Engine Type:** Versioned Configurable Rule Evaluator  

---

## 1. Engine Philosophy & Non-Discrimination Mandate

The fundamental purpose of Bharat Sports Grant is equal access to sports opportunities.
Eligibility is determined exclusively through published, configurable sporting and academic criteria.
Decisions are never influenced by an athlete's family wealth, caste, religion, gender, or personal connections.

---

## 2. Supported Sports Catalogue

The platform supports athletes across an extensible sports catalogue:
1. **Cricket**
2. **Football**
3. **Basketball**
4. **Archery**
5. **Shooting**
6. **Athletics** (Track & Field)
7. **Badminton**
8. **Hockey**
9. **Wrestling**
10. **Boxing**
11. **Swimming**
12. **Volleyball**
13. **Tennis**
14. **Table Tennis / Configurable New Sports**

---

## 3. Standardized Competition Levels & Qualifications

### Competition Levels
Competition structures vary across sports and federations, but the platform provides a normalized hierarchy for rule evaluation:
- `INTER_SCHOOL`: School or zonal level meets
- `DISTRICT`: Recognized district-level championships
- `INTER_COLLEGE`: University / Inter-college competitions
- `STATE`: Recognized state-level championships
- `INTER_STATE`: Regional / Zonal championships
- `NATIONAL`: Recognized national sports federation championships
- `INTERNATIONAL`: Official Asian, Commonwealth, World, or Olympic events

### Educational Qualifications
- `NOT_APPLICABLE`: Athlete pursuing sports full-time without academic linkage
- `SCHOOL_LEVEL`: Secondary education (Grades 6–10)
- `HIGHER_SECONDARY`: Grades 11–12
- `DIPLOMA`: Polytechnic or vocational diploma
- `UNDERGRADUATE`: Bachelor's degree program
- `POSTGRADUATE`: Master's degree or higher

---

## 4. Configurable Program Schema

Each scholarship program is defined by versioned rule criteria:

```json
{
  "program_id": "prog_arch_state_2026",
  "sport_code": "ARCHERY",
  "title": "State Archery Development Grant",
  "version": 1,
  "status": "ACTIVE",
  "criteria": {
    "min_age": 14,
    "max_age": 22,
    "allowed_genders": ["ANY"],
    "min_competition_level": "STATE",
    "required_achievements": [
      {
        "type": "PODIUM_OR_TOP_8",
        "description": "Top 8 finish in recognized State Archery Championship within past 24 months"
      }
    ],
    "required_documents": [
      "STATE_FEDERATION_CERTIFICATE",
      "AGE_PROOF_DOCUMENT",
      "COACH_RECOMMENDATION_LETTER"
    ]
  },
  "indicative_funding": {
    "min_amount_inr": 150000,
    "max_amount_inr": 350000,
    "disclaimer": "Sample illustrative range for prototype demonstration. Subject to document verification."
  },
  "approved_expense_categories": [
    "EQUIPMENT",
    "COACHING",
    "COMPETITION_REGISTRATION",
    "TRAVEL"
  ]
}
```

---

## 5. Evaluation Workflow and Decision Outcomes

1. **Input Submission**: Athlete supplies sport, age, competition level, achievements, and educational qualification.
2. **Authoritative Engine Assessment**:
   - Compares athlete parameters against the current active version of program criteria.
   - Evaluates mandatory constraints:
     - Age bounds (`min_age <= athlete_age <= max_age`).
     - Hierarchy check (`level_rank(athlete_level) >= level_rank(min_level)`).
     - Required declarations confirmed.
3. **Outcome Generation**:
   - `ELIGIBLE_FOR_VERIFICATION`: Preliminary criteria satisfied; prompts for supporting document upload.
   - `NEEDS_ADDITIONAL_INFO`: Borderline or missing evidence.
   - `INELIGIBLE`: Concrete criteria not met (e.g. age outside bounds); provides clear, constructive explanation.
4. **Disclaimers**: Preliminary assessment is explicitly marked as non-final; scholarship award requires authorized human document and achievement verification.
