# Bharat Sports Grant — Master Roadmap

**Project:** Bharat Sports Grant (Sportsbridge India)  
**Repository:** https://github.com/ayushsingh257/Sportsbridge-India  
**Status Overview:** Phase 1 (IN PROGRESS)  
**Governance:** Governed by `green.md`

---

## Phase Summary Table

| Phase | Title | Status | Git Commit | Push Status | Completion Date |
|---|---|---|---|---|---|
| **Phase 1** | Requirements, Repository Inspection, and Project Foundation | **IN PROGRESS (REVISION 1)** | Pending | Pending | In Progress |
| **Phase 2** | UI/UX Design System and Public Website | NOT STARTED | - | - | - |
| **Phase 3** | Backend Foundation and Database Architecture | NOT STARTED | - | - | - |
| **Phase 4** | Authentication, Verification, and Access Control | NOT STARTED | - | - | - |
| **Phase 5** | Athlete Profiles and Dashboard | NOT STARTED | - | - | - |
| **Phase 6** | Sports Catalogue and Configurable Eligibility Rules Engine | NOT STARTED | - | - | - |
| **Phase 7** | Scholarship Applications and Document Verification Workflow | NOT STARTED | - | - | - |
| **Phase 8** | Scholarship Allocation and Financial Ledger Engine | NOT STARTED | - | - | - |
| **Phase 9** | Administration, Program Management, and Audit System | NOT STARTED | - | - | - |
| **Phase 10** | Notifications, Contact Workflows, and Transparency Portal | NOT STARTED | - | - | - |
| **Phase 11** | Security Hardening, Accessibility, and Comprehensive Testing | NOT STARTED | - | - | - |
| **Phase 12** | Docker Orchestration, CI/CD, and Production Readiness | NOT STARTED | - | - | - |
| **Phase 13** | Final System Audit, Live Demonstration, and Handover | NOT STARTED | - | - | - |

---

## Detailed Phase Specifications

### Phase 1: Requirements, Repository Inspection, and Project Foundation
- **Phase Number:** 1
- **Phase Title:** Requirements, Repository Inspection, and Project Foundation (Revision 1 — Project Structure Correction)
- **Objectives:** Establish comprehensive monorepo root structure (`frontend/`, `backend/`, `docs/`, `.github/`, root orchestration files); configure Next.js / TypeScript foundation files and FastAPI / Python foundation modules; implement initial health check endpoint and test foundations; update governance and architecture documentation.
- **Planned Deliverables:**
  - Initialized Git repository targeting `main` branch with remote `https://github.com/ayushsingh257/Sportsbridge-India.git`.
  - Monorepo structure with discrete `frontend/` and `backend/` directories.
  - Frontend foundation: `package.json`, strict `tsconfig.json`, `.env.example`, `public/`, `src/` modules, initial utilities, and unit test.
  - Backend foundation: `pyproject.toml`, `requirements.txt`, `.env.example`, `app/` subpackages, `app/main.py` health endpoint, and unit tests.
  - Root orchestration: `docker-compose.yml`, `.github/workflows/ci.yml`.
  - Engineering governance & specifications: `green.md` (18 mandatory standards), `AGENTS.md`, `roadmap.md`, `README.md`, and complete `docs/` suite.
- **Dependencies:** None.
- **Acceptance Criteria:**
  - `frontend/` and `backend/` exist with valid configuration and no missing architectural roots.
  - Zero mock or placeholder code masquerading as complete features.
  - All governance and documentation files accurate.
  - Linting/testing commands verified.
  - Phase 1 revision committed and pushed to GitHub with verified commit hash.
- **Testing Requirements:** Git status validation, directory structure verification, frontend & backend configuration validation.
- **Status:** IN PROGRESS (REVISION 1)
- **Completion Date:** Pending
- **Git Commit Hash:** Pending
- **Push Status:** Pending
- **Known Limitations:** Environment runtimes verified (Node v22.16.0, Python 3.13.5, Docker 29.4.3).
- **Deferred Tasks:** None.

---

### Phase 2: UI/UX Design System and Public Website
- **Phase Number:** 2
- **Phase Title:** UI/UX Design System and Public Website
- **Objectives:** Establish the core frontend foundation using Next.js App Router, TypeScript, and Tailwind CSS; build a cohesive Red/White & Black/Red design token system; create the glassmorphic responsive navbar, full theme switcher, hero section, platform statistics (clearly labelled sample data), sports discovery cards, how-it-works visual guide, and footer.
- **Planned Deliverables:**
  - Next.js project scaffolded in `frontend/`.
  - Design tokens in Tailwind CSS config with light/dark theme variables.
  - Reusable Navbar with glassmorphism, responsive drawer, and auth states.
  - Homepage sections (Hero, Stats, Sports Catalogue, How It Works, Scholarship Programs, Trust & Transparency, Footer).
  - Shell pages for About Us, Contact Us, Privacy Policy, Terms, Guidelines, and Grievance Redressal.
- **Dependencies:** Phase 1 completion and user approval.
- **Acceptance Criteria:**
  - Flawless responsiveness across Mobile (375px), Tablet (768px), and Desktop (1280px+).
  - Light/Dark theme switching toggles smoothly without style leaks.
  - All public links functional (no dead buttons).
  - Fully accessible keyboard navigation and semantic headings.
- **Testing Requirements:** Vitest component tests, axe-core accessibility checks, responsive rendering verification.
- **Status:** NOT STARTED
- **Completion Date:** -
- **Git Commit Hash:** -
- **Push Status:** -
- **Known Limitations:** -
- **Deferred Tasks:** -

---

### Phase 3: Backend Foundation and Database Architecture
- **Phase Number:** 3
- **Phase Title:** Backend Foundation and Database Architecture
- **Objectives:** Build the FastAPI application structure in `backend/`, configure SQLAlchemy async engine, Alembic migrations, PostgreSQL connection, standardized JSON error envelopes, structured logging, health checks, and API versioning (`/api/v1/`).
- **Planned Deliverables:**
  - FastAPI application structure (`backend/app/`).
  - Database configuration and connection manager (`backend/app/db/`).
  - Base SQLAlchemy models and initial Alembic migration.
  - Global error handler middleware and standard response schemas.
  - Health check endpoint (`/api/v1/health`).
- **Dependencies:** Phase 2 completion and user approval.
- **Acceptance Criteria:**
  - FastAPI starts up cleanly and serves OpenAPI docs at `/docs`.
  - Database migrations execute cleanly (`alembic upgrade head`).
  - Health check returns 200 OK with database connection status.
- **Testing Requirements:** Pytest API test suite verifying health endpoint and error handlers.
- **Status:** NOT STARTED
- **Completion Date:** -
- **Git Commit Hash:** -
- **Push Status:** -
- **Known Limitations:** -
- **Deferred Tasks:** -

---

### Phase 4: Authentication, Verification, and Access Control
- **Phase Number:** 4
- **Phase Title:** Authentication, Verification, and Access Control
- **Objectives:** Implement secure multi-step registration (Email & Indian phone validation, password hashing via Argon2/bcrypt), email/phone verification flows (simulated OTP for dev), secure session management, JWT access/refresh token rotation, rate limiting, and Role-Based Access Control (RBAC).
- **Planned Deliverables:**
  - User and Auth SQLAlchemy models.
  - Auth routes (`/api/v1/auth/register`, `/login`, `/verify-otp`, `/refresh`, `/logout`).
  - Password hashing service and brute-force rate limiter.
  - Frontend auth forms (React Hook Form + Zod) with state synchronization.
  - Role-based authorization dependencies for FastAPI endpoints.
- **Dependencies:** Phase 3 completion and user approval.
- **Acceptance Criteria:**
  - Complete athlete registration and login lifecycle verified.
  - Indian phone (+91 10-digit) and email strictly validated on backend.
  - Protected endpoints strictly reject unauthenticated/unauthorized callers with 401/403.
  - Frontend reflects authenticated navbar and user session state accurately.
- **Testing Requirements:** Pytest auth unit/integration tests; form validation tests.
- **Status:** NOT STARTED
- **Completion Date:** -
- **Git Commit Hash:** -
- **Push Status:** -
- **Known Limitations:** -
- **Deferred Tasks:** -

---

### Phase 5: Athlete Profiles and Dashboard
- **Phase Number:** 5
- **Phase Title:** Athlete Profiles and Dashboard
- **Objectives:** Implement authenticated athlete profile management (sports, educational qualifications, achievements, physical stats), profile completion score, and the athlete dashboard overview with application status tracking and ledger summary empty states.
- **Planned Deliverables:**
  - Profile models, schemas, and endpoints (`/api/v1/athletes/me`).
  - Athlete dashboard UI (`/dashboard`, `/profile`).
  - Profile completion indicator and editing modal/form.
  - Application history empty state and list viewer.
- **Dependencies:** Phase 4 completion and user approval.
- **Acceptance Criteria:**
  - Athletes can view and update their profile details securely.
  - Athletes cannot access other athletes' profile data (strict authorization).
  - Profile completion metrics calculate accurately based on completed fields.
- **Testing Requirements:** Pytest profile route tests, frontend athlete dashboard tests.
- **Status:** NOT STARTED
- **Completion Date:** -
- **Git Commit Hash:** -
- **Push Status:** -
- **Known Limitations:** -
- **Deferred Tasks:** -

---

### Phase 6: Sports Catalogue and Configurable Eligibility Rules Engine
- **Phase Number:** 6
- **Phase Title:** Sports Catalogue and Configurable Eligibility Rules Engine
- **Objectives:** Build a data-driven sports catalogue (14+ sports) and an extensible, versioned backend eligibility evaluation engine that scores applicants based on age, competition level, achievements, and educational qualifications without hardcoded frontend rules.
- **Planned Deliverables:**
  - Sports and Scholarship Program models and schemas.
  - Configurable eligibility criteria evaluator (`backend/app/rules_engine/`).
  - Eligibility selection page and dynamic assessment form.
  - Preliminary assessment calculation and criteria breakdown response.
- **Dependencies:** Phase 5 completion and user approval.
- **Acceptance Criteria:**
  - Dynamic eligibility evaluation executed authoritative on backend.
  - Correct assessment result returned (Eligible, Incomplete, Ineligible with reasons).
  - Illustrative funding bands dynamically mapped to qualifying pathways.
- **Testing Requirements:** Comprehensive rules engine unit test suite testing all edge cases.
- **Status:** NOT STARTED
- **Completion Date:** -
- **Git Commit Hash:** -
- **Push Status:** -
- **Known Limitations:** -
- **Deferred Tasks:** -

---

### Phase 7: Scholarship Applications and Document Verification Workflow
- **Phase Number:** 7
- **Phase Title:** Scholarship Applications and Document Verification Workflow
- **Objectives:** Implement end-to-end scholarship application submission, secure supporting document upload (MIME validation, secure UUID keys, access control), reviewer assignment by sport discipline, status state-machine transitions, and an elegant applicant success modal with celebratory micro-animations.
- **Planned Deliverables:**
  - Application and Document models with audit trail.
  - Secure document upload endpoints and access proxy.
  - Success modal with accessible celebration animation and reference tracking.
  - Application workflow state machine (`Submitted` -> `Under Preliminary Review` -> `Verification Pending` -> `Approved` / `Rejected`).
- **Dependencies:** Phase 6 completion and user approval.
- **Acceptance Criteria:**
  - Application submitted with unique tracking reference number.
  - Private documents cannot be accessed publicly without authorization.
  - Status updates logged with reviewer identity and timestamps.
- **Testing Requirements:** Upload security tests, status transition integration tests.
- **Status:** NOT STARTED
- **Completion Date:** -
- **Git Commit Hash:** -
- **Push Status:** -
- **Known Limitations:** -
- **Deferred Tasks:** -

---

### Phase 8: Scholarship Allocation and Financial Ledger Engine
- **Phase Number:** 8
- **Phase Title:** Scholarship Allocation and Financial Ledger Engine
- **Objectives:** Implement an immutable, double-entry financial ledger for approved scholarship allocations; expense request submissions across approved categories; reservation of funds; multi-stage approval; simulated disbursement recording; and strict balance invariant enforcement.
- **Planned Deliverables:**
  - Financial ledger models (`ScholarshipAllocation`, `ExpenseRequest`, `LedgerTransaction`).
  - Ledger service enforcing invariant: Available = Allocation - (Reserved + Disbursed).
  - Expense submission UI and athlete ledger summary.
  - Concurrency control with `SELECT FOR UPDATE` and idempotency keys.
- **Dependencies:** Phase 7 completion and user approval.
- **Acceptance Criteria:**
  - Balance calculations strictly derived from ledger entries.
  - Overspending and double-disbursement mathematically prevented.
  - High concurrency stress test passes without balance drift.
- **Testing Requirements:** Pytest financial concurrency tests, transaction rollback tests, precision tests.
- **Status:** NOT STARTED
- **Completion Date:** -
- **Git Commit Hash:** -
- **Push Status:** -
- **Known Limitations:** Uses simulated disbursement until banking authorization is established.
- **Deferred Tasks:** -

---

### Phase 9: Administration, Program Management, and Audit System
- **Phase Number:** 9
- **Phase Title:** Administration, Program Management, and Audit System
- **Objectives:** Build an administrative management interface with role-based segregation of duties (Scholarship Reviewer vs. Finance Officer), application review queue, document inspection, expense approval, and full system audit logs.
- **Planned Deliverables:**
  - Admin dashboard layout (`/admin`) with RBAC guards.
  - Application review and verification interface.
  - Financial expense review and disbursement approval interface.
  - Audit log viewer for administrative actions.
- **Dependencies:** Phase 8 completion and user approval.
- **Acceptance Criteria:**
  - Verifiers cannot approve financial disbursements.
  - Every administrative status change is recorded with an immutable audit record.
  - Dual-control threshold triggers enforced for large disbursements.
- **Testing Requirements:** RBAC boundary tests, admin action audit trail tests.
- **Status:** NOT STARTED
- **Completion Date:** -
- **Git Commit Hash:** -
- **Push Status:** -
- **Known Limitations:** -
- **Deferred Tasks:** -

---

### Phase 10: Notifications, Contact Workflows, and Transparency Portal
- **Phase Number:** 10
- **Phase Title:** Notifications, Contact Workflows, and Transparency Portal
- **Objectives:** Implement in-app notifications and simulated email/SMS alerts for application updates; build functional Contact Us and Grievance Redressal workflows with rate limiting; finalize legal, policy, and public transparency pages.
- **Planned Deliverables:**
  - Notification service and athlete notification center.
  - Contact and Grievance submission forms with ticket ID tracking.
  - Completed public policy pages (Privacy, Terms, Guidelines, FAQ).
- **Dependencies:** Phase 9 completion and user approval.
- **Acceptance Criteria:**
  - Contact submissions generate tracking tickets.
  - Application state changes generate athlete notifications.
  - Transparency guidelines accurately reflect platform operation.
- **Testing Requirements:** Notification delivery tests, contact form spam protection tests.
- **Status:** NOT STARTED
- **Completion Date:** -
- **Git Commit Hash:** -
- **Push Status:** -
- **Known Limitations:** -
- **Deferred Tasks:** -

---

### Phase 11: Security Hardening, Accessibility, and Comprehensive Testing
- **Phase Number:** 11
- **Phase Title:** Security Hardening, Accessibility, and Comprehensive Testing
- **Objectives:** Perform end-to-end security penetration audits (OWASP Top 10, rate limiting, CSRF, upload security, RBAC bypasses), WCAG 2.1 AA accessibility audit, responsive checks across viewport sizes, and comprehensive integration testing.
- **Planned Deliverables:**
  - Security audit report and vulnerability remediation.
  - Accessibility audit remediation (keyboard focus, screen reader announcements, contrast).
  - Comprehensive end-to-end test suite (Playwright).
- **Dependencies:** Phase 10 completion and user approval.
- **Acceptance Criteria:**
  - Zero critical/high security vulnerabilities.
  - WCAG 2.1 AA compliance across all primary views.
  - Complete automated test suite passing.
- **Testing Requirements:** Playwright E2E suite, security scan scripts, accessibility audit suite.
- **Status:** NOT STARTED
- **Completion Date:** -
- **Git Commit Hash:** -
- **Push Status:** -
- **Known Limitations:** -
- **Deferred Tasks:** -

---

### Phase 12: Docker Orchestration, CI/CD, and Production Readiness
- **Phase Number:** 12
- **Phase Title:** Docker Orchestration, CI/CD, and Production Readiness
- **Objectives:** Implement production-grade multi-stage Dockerfiles for frontend and backend, configure `docker-compose.yml` for unified local execution, establish GitHub Actions CI workflows for linting, type checks, and tests, and document deployment procedures.
- **Planned Deliverables:**
  - `frontend/Dockerfile` and `backend/Dockerfile`.
  - `docker-compose.yml` linking frontend, backend, and PostgreSQL.
  - `.github/workflows/ci.yml` pipeline.
  - `docs/deployment.md` with migration and backup/restore guidelines.
- **Dependencies:** Phase 11 completion and user approval.
- **Acceptance Criteria:**
  - `docker compose up --build` launches the entire platform cleanly.
  - CI pipeline executes linting, typechecking, and tests.
  - Environment variable documentation complete with security notes.
- **Testing Requirements:** Docker build validation, CI pipeline dry run.
- **Status:** NOT STARTED
- **Completion Date:** -
- **Git Commit Hash:** -
- **Push Status:** -
- **Known Limitations:** Public deployment is simulated/local until explicit deployment authorization.
- **Deferred Tasks:** -

---

### Phase 13: Final System Audit, Live Demonstration, and Handover
- **Phase Number:** 13
- **Phase Title:** Final System Audit, Live Demonstration, and Handover
- **Objectives:** Conduct full end-to-end system verification across all user journeys, verify all financial invariants and RBAC boundaries, prepare demo seed data scripts, record demonstration workflows, update all documentation, and deliver the final handover report.
- **Planned Deliverables:**
  - Verified demo seed data script (`scripts/seed_demo.py`).
  - Complete `README.md` and updated `roadmap.md`.
  - Final project sign-off report with verification logs.
- **Dependencies:** Phase 12 completion and user approval.
- **Acceptance Criteria:**
  - All 13 phases verified and approved.
  - Zero broken links, zero fake authentication, zero ledger inconsistencies.
  - Clean repository state with verified Git history.
- **Testing Requirements:** Full regression test pass across unit, integration, and E2E suites.
- **Status:** NOT STARTED
- **Completion Date:** -
- **Git Commit Hash:** -
- **Push Status:** -
- **Known Limitations:** -
- **Deferred Tasks:** -
