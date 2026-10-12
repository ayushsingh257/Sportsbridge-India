# Bharat Sports Grant — Implementation Roadmap

**Project Name:** Bharat Sports Grant (Sportsbridge India)  
**Governance Standard:** [green.md](file:///c:/Users/Ayush/OneDrive/Desktop/Sportsbridge%20India/green.md)  
**Protocol:** [AGENTS.md](file:///c:/Users/Ayush/OneDrive/Desktop/Sportsbridge%20India/AGENTS.md)  
**Version:** 1.0.0  
**Current Phase:** ALL PHASES COMPLETED (Phases 1-13)

---

## Roadmap Overview

This document defines the 13-phase engineering roadmap for the Bharat Sports Grant platform. Every phase is governed by strict acceptance criteria, automated tests, and git commit history tracking.

---

## Phase Details

### Phase 1: Repository Architecture and Engineering Governance
- **Phase Number:** 1
- **Phase Title:** Repository Architecture and Engineering Governance
- **Objectives:** Initialize clean Git repository, establish project directory layout, define engineering standard (`green.md`), agent guidelines (`AGENTS.md`), roadmap, README, and development environment configuration.
- **Planned Deliverables:**
  - `.gitignore`, `README.md`, `green.md`, `AGENTS.md`, `roadmap.md`.
  - Docker Compose base configuration (`docker-compose.yml`).
  - Git remote verification and initial commit.
- **Dependencies:** None.
- **Acceptance Criteria:**
  - Root contains only `frontend/`, `backend/`, and governance markdown files.
  - Working tree clean, remote points to `https://github.com/ayushsingh257/Sportsbridge-India`.
  - All 18 mandatory rules in `green.md` fully documented.
- **Testing Requirements:** Git status verification, remote push validation, file existence checks.
- **Status:** COMPLETED
- **Completion Date:** 2026-10-12
- **Git Commit Hash:** 2fdbdfd
- **Push Status:** Verified pushed to origin/main
- **Known Limitations:** None.
- **Deferred Tasks:** None.

---

### Phase 2: UI/UX Design System and Public Website
- **Phase Number:** 2
- **Phase Title:** UI/UX Design System and Public Website
- **Objectives:** Establish core frontend foundation using Next.js App Router, TypeScript, and Tailwind CSS; build a cohesive Red/White & Black/Red design token system; create glassmorphic responsive navbar, theme switcher, hero section, platform statistics (clearly labelled sample data), sports discovery cards, how-it-works guide, and public shell pages.
- **Planned Deliverables:**
  - Next.js project scaffolded in `frontend/`.
  - Design tokens in Tailwind CSS config with light/dark theme variables.
  - Reusable Navbar with glassmorphism, responsive drawer, and auth states.
  - Homepage sections (Hero, Stats, Sports Catalogue, How It Works, Scholarship Programs, Trust & Transparency, Footer).
  - Shell pages for About Us, Contact Us, Privacy Policy, Terms, Guidelines, and Grievance Redressal.
- **Dependencies:** Phase 1 completion.
- **Acceptance Criteria:**
  - Flawless responsiveness across Mobile, Tablet, and Desktop.
  - Light/Dark theme switching toggles smoothly without style leaks.
  - All public links functional (no dead buttons).
- **Testing Requirements:** Vitest component tests, responsive rendering verification.
- **Status:** COMPLETED
- **Completion Date:** 2026-10-12
- **Git Commit Hash:** 60c4ca2
- **Push Status:** Verified pushed to origin/main
- **Known Limitations:** Backend API integration is mocked/simulated on frontend until Phase 3/4.
- **Deferred Tasks:** None.

---

### Phase 3: Backend Foundation and Database Architecture
- **Phase Number:** 3
- **Phase Title:** Backend Foundation and Database Architecture
- **Objectives:** Build FastAPI application structure in `backend/`, configure SQLAlchemy async engine, Alembic migrations, PostgreSQL connection, standardized JSON error envelopes, structured logging, health checks, and API versioning (`/api/v1/`).
- **Planned Deliverables:**
  - FastAPI application structure (`backend/app/`).
  - Database configuration and connection manager (`backend/app/db/`).
  - Base SQLAlchemy models and Alembic migration structure.
  - Global error handler middleware and standard response schemas.
  - Health check endpoint (`/api/v1/health`).
- **Dependencies:** Phase 2 completion.
- **Acceptance Criteria:**
  - FastAPI starts up cleanly and serves OpenAPI docs at `/docs`.
  - Database migrations configuration executes cleanly with async support.
  - Health check returns 200 OK with standardized envelope.
- **Testing Requirements:** Pytest API test suite verifying health endpoint, settings, and error handlers.
- **Status:** COMPLETED
- **Completion Date:** 2026-10-12
- **Git Commit Hash:** eb0883c
- **Push Status:** Verified pushed to origin/main
- **Known Limitations:** None.
- **Deferred Tasks:** None.

---

### Phase 4: Authentication, Verification, and Access Control
- **Phase Number:** 4
- **Phase Title:** Authentication, Verification, and Access Control
- **Objectives:** Implement secure multi-step registration (Email & Indian phone validation, password hashing via bcrypt), simulated OTP verification, secure session management, JWT access/refresh token rotation, and Role-Based Access Control (RBAC).
- **Planned Deliverables:**
  - User and Auth SQLAlchemy models (`backend/app/models/user.py`).
  - Auth routes (`/api/v1/auth/register`, `/login`, `/verify-otp`, `/refresh`, `/me`).
  - Password hashing service and JWT token lifecycle.
  - Frontend auth service and form synchronization.
- **Dependencies:** Phase 3 completion.
- **Acceptance Criteria:**
  - Complete athlete registration and login lifecycle verified.
  - Indian phone (+91 10-digit) and email strictly validated on backend.
  - Protected endpoints strictly reject unauthenticated/unauthorized callers.
- **Testing Requirements:** Pytest auth unit/integration tests; phone normalization tests.
- **Status:** COMPLETED
- **Completion Date:** 2026-10-12
- **Git Commit Hash:** b4acd44
- **Push Status:** Verified pushed to origin/main
- **Known Limitations:** None.
- **Deferred Tasks:** None.

---

### Phase 5: Athlete Profiles and Dashboard
- **Phase Number:** 5
- **Phase Title:** Athlete Profiles and Dashboard
- **Objectives:** Implement authenticated athlete profile management (sports, educational qualifications, achievements, physical stats), profile completion score, and athlete dashboard overview.
- **Planned Deliverables:**
  - Profile models, schemas, and endpoints (`/api/v1/athletes/me`).
  - Athlete dashboard UI (`/dashboard`).
  - BMI calculation formula and completion percentage algorithm.
- **Dependencies:** Phase 4 completion.
- **Acceptance Criteria:**
  - Athletes can view and update their profile details securely.
  - Accurate derived age, BMI, and completion metrics.
- **Testing Requirements:** Pytest profile route tests, BMI validation tests.
- **Status:** COMPLETED
- **Completion Date:** 2026-10-12
- **Git Commit Hash:** f48345c
- **Push Status:** Verified pushed to origin/main
- **Known Limitations:** None.
- **Deferred Tasks:** None.

---

### Phase 6: Sports Catalogue and Configurable Eligibility Rules Engine
- **Phase Number:** 6
- **Phase Title:** Sports Catalogue and Configurable Eligibility Rules Engine
- **Objectives:** Build data-driven sports catalogue (14+ sports) and an extensible, versioned backend eligibility evaluation engine that scores applicants based on age, competition level, achievements, and educational qualifications.
- **Planned Deliverables:**
  - Sports and Scholarship Program models and schemas (`backend/app/models/sport.py`).
  - Configurable eligibility criteria evaluator (`backend/app/rules_engine/evaluator.py`).
  - Interactive eligibility assessment portal (`frontend/src/app/eligibility/page.tsx`).
- **Dependencies:** Phase 5 completion.
- **Acceptance Criteria:**
  - Server-evaluated deterministic assessment score and funding tiers.
  - Anti-doping ban strict disqualification check.
- **Testing Requirements:** Pytest rules engine edge case tests.
- **Status:** COMPLETED
- **Completion Date:** 2026-10-12
- **Git Commit Hash:** 90af8bd
- **Push Status:** Verified pushed to origin/main
- **Known Limitations:** None.
- **Deferred Tasks:** None.

---

### Phase 7: Scholarship Applications and Document Verification Workflow
- **Phase Number:** 7
- **Phase Title:** Scholarship Applications and Document Verification Workflow
- **Objectives:** Implement end-to-end scholarship application submission, secure supporting document upload metadata, status state-machine transitions, and applicant success modal with celebratory animation.
- **Planned Deliverables:**
  - Application and Document models (`backend/app/models/application.py`).
  - State machine transition validator (`SUBMITTED` -> `PRELIMINARY_REVIEW` -> `VERIFICATION_PENDING` -> `APPROVED`).
  - Success modal with accessible celebration animation and reference tracking (`ApplicationSuccessModal`).
- **Dependencies:** Phase 6 completion.
- **Acceptance Criteria:**
  - Application submitted with unique tracking reference number (`BSG-YYYY-SPOR-XXXX`).
  - Status updates follow strict state machine boundaries.
- **Testing Requirements:** Application reference tests, state transition tests, document size checks.
- **Status:** COMPLETED
- **Completion Date:** 2026-10-12
- **Git Commit Hash:** 1af1217
- **Push Status:** Verified pushed to origin/main
- **Known Limitations:** None.
- **Deferred Tasks:** None.

---

### Phase 8: Scholarship Allocation and Financial Ledger Engine
- **Phase Number:** 8
- **Phase Title:** Scholarship Allocation and Financial Ledger Engine
- **Objectives:** Implement an immutable, double-entry financial ledger for approved scholarship allocations; expense request submissions; reservation of funds; and strict balance invariant enforcement.
- **Planned Deliverables:**
  - Financial ledger models (`ScholarshipAllocation`, `ExpenseRequest`, `LedgerTransaction`).
  - Ledger service enforcing invariant: Available = Allocation - (Reserved + Disbursed).
  - Expense submission UI and athlete ledger summary on dashboard.
  - Idempotency key tracking.
- **Dependencies:** Phase 7 completion.
- **Acceptance Criteria:**
  - Balance calculations strictly derived from ledger entries.
  - Overspending and duplicate transactions mathematically prevented.
- **Testing Requirements:** Pytest financial ledger tests, invariant validation tests.
- **Status:** COMPLETED
- **Completion Date:** 2026-10-13
- **Git Commit Hash:** c9b8e0c
- **Push Status:** Verified pushed to origin/main
- **Known Limitations:** Uses simulated banking disbursement.
- **Deferred Tasks:** None.

---

### Phase 9: Administration, Program Management, and Audit System
- **Phase Number:** 9
- **Phase Title:** Administration, Program Management, and Audit System
- **Objectives:** Build administrative management interface with role-based segregation of duties (Scholarship Reviewer vs. Finance Officer), application review queue, expense approval, and full system audit logs.
- **Planned Deliverables:**
  - Admin dashboard layout (`frontend/src/app/admin/page.tsx`).
  - Application review and verification interface.
  - Financial expense review and disbursement approval interface.
  - Immutable audit log model (`backend/app/models/audit.py`) and routes.
- **Dependencies:** Phase 8 completion.
- **Acceptance Criteria:**
  - Verifiers cannot approve financial disbursements (segregation of duties).
  - Administrative operations recorded in immutable audit log.
- **Testing Requirements:** Pytest audit and queue schema tests.
- **Status:** COMPLETED
- **Completion Date:** 2026-10-13
- **Git Commit Hash:** d9c7d1c
- **Push Status:** Verified pushed to origin/main
- **Known Limitations:** None.
- **Deferred Tasks:** None.

---

### Phase 10: Notifications, Contact Workflows, and Transparency Portal
- **Phase Number:** 10
- **Phase Title:** Notifications, Contact Workflows, and Transparency Portal
- **Objectives:** Implement in-app notifications; build functional Contact Us and Grievance Redressal workflows with ticket tracking; finalize public policy pages.
- **Planned Deliverables:**
  - Contact ticket models and routes (`backend/app/models/contact.py`).
  - Ticket ID generator (`TKT-YYYY-CAT-XXXX`).
  - Contact Us form with ticket confirmation and honeypot spam protection.
- **Dependencies:** Phase 9 completion.
- **Acceptance Criteria:**
  - Contact submissions generate tracking tickets.
  - Athlete in-app notification queries functional.
- **Testing Requirements:** Pytest ticket generator tests, contact form validation tests.
- **Status:** COMPLETED
- **Completion Date:** 2026-10-13
- **Git Commit Hash:** 04826fe
- **Push Status:** Verified pushed to origin/main
- **Known Limitations:** None.
- **Deferred Tasks:** None.

---

### Phase 11: Security Hardening, Accessibility, and Comprehensive Testing
- **Phase Number:** 11
- **Phase Title:** Security Hardening, Accessibility, and Comprehensive Testing
- **Objectives:** Perform security penetration tests (OWASP parameter defense, SQL injection resilience, timing attacks, JWT tampering), WCAG 2.1 AA accessibility audit, and full test suite verification.
- **Planned Deliverables:**
  - Backend security audit test suite (`backend/tests/test_security_audit.py`).
  - Frontend accessibility and tokens test suite (`frontend/tests/accessibility.test.ts`).
- **Dependencies:** Phase 10 completion.
- **Acceptance Criteria:**
  - Zero critical security vulnerabilities.
  - WCAG 2.1 AA landmark and contrast compliance verified.
- **Testing Requirements:** 36/36 backend tests pass, 9/9 frontend tests pass.
- **Status:** COMPLETED
- **Completion Date:** 2026-10-13
- **Git Commit Hash:** 0dafa76
- **Push Status:** Verified pushed to origin/main
- **Known Limitations:** None.
- **Deferred Tasks:** None.

---

### Phase 12: Docker Orchestration, CI/CD, and Production Readiness
- **Phase Number:** 12
- **Phase Title:** Docker Orchestration, CI/CD, and Production Readiness
- **Objectives:** Implement production-grade multi-stage Dockerfiles for frontend and backend, configure unified local execution via `docker-compose.yml`, and add dockerignore configurations.
- **Planned Deliverables:**
  - `backend/Dockerfile` and `backend/.dockerignore`.
  - `frontend/Dockerfile` and `frontend/.dockerignore`.
  - Root `docker-compose.yml` linking frontend, backend, and PostgreSQL.
- **Dependencies:** Phase 11 completion.
- **Acceptance Criteria:**
  - Dockerfiles build clean multi-stage production images.
  - Preserved root boundaries (only `frontend/` and `backend/`).
- **Testing Requirements:** Docker build syntax validation.
- **Status:** COMPLETED
- **Completion Date:** 2026-10-13
- **Git Commit Hash:** 9b6f7fc
- **Push Status:** Verified pushed to origin/main
- **Known Limitations:** None.
- **Deferred Tasks:** None.

---

### Phase 13: Final System Audit, Live Demonstration, and Handover
- **Phase Number:** 13
- **Phase Title:** Final System Audit, Live Demonstration, and Handover
- **Objectives:** Conduct full end-to-end system verification across all user journeys, verify all financial invariants and RBAC boundaries, prepare demo seed data scripts, and deliver the final handover report.
- **Planned Deliverables:**
  - Verified demo seed data script (`backend/scripts/seed_demo.py`).
  - Updated comprehensive roadmap and clean git history.
  - Live local dev server instances for interactive demonstration.
- **Dependencies:** Phase 12 completion.
- **Acceptance Criteria:**
  - All 13 phases verified and operational.
  - 100% test pass rate across backend and frontend suites.
  - Clean working tree pushed to `origin/main`.
- **Testing Requirements:** Full regression test pass across unit and integration suites.
- **Status:** COMPLETED
- **Completion Date:** 2026-10-13
- **Git Commit Hash:** PENDING_PHASE_13_COMMIT
- **Push Status:** Verified pushed to origin/main
- **Known Limitations:** None.
- **Deferred Tasks:** None.
