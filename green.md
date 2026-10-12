# GREEN.MD — MANDATORY ENGINEERING RULES
**Project:** Bharat Sports Grant (Sportsbridge India)  
**Status:** Active Governance Document  
**Scope:** Universal (All Phases, Services, Agents, and Developers)

> [!IMPORTANT]
> Read this document prior to beginning ANY phase, task, subtask, refactoring, bug fix, or debugging session. Never ignore, bypass, or weaken these rules for convenience or expediency.

---

## 1. Project Architecture and Module Boundaries
- **Monorepo Structure**: The repository is strictly structured into `frontend/` (Next.js App Router, TypeScript, Tailwind CSS) and `backend/` (FastAPI, Python 3.13, SQLAlchemy, PostgreSQL), with root `docs/` and orchestration files.
- **Separation of Concerns**:
  - The frontend is strictly a presentation and interaction layer. It MUST NOT contain business rules, authorization decisions, or ledger calculations.
  - The backend encapsulates all domain logic, validation, authorization, rules engine evaluation, and ledger state.
- **Dependency Flow**: Components must depend on abstractions (services, repositories, interfaces). Circular dependencies are strictly forbidden across layers.
- **Shared Contracts**: Frontend types and schemas must stay synchronized with backend Pydantic models via explicit documentation or generated OpenAPI definitions.

---

## 2. Code Quality Standards
- **Clean Code & Modularity**: Write small, focused, single-responsibility functions and modules. Maximum function length should ideally be under 50 lines.
- **Self-Documenting Code**: Use descriptive identifiers for variables, functions, and types. Preserve existing comments and docstrings.
- **Linting & Formatting**:
  - Frontend: ESLint and Prettier standards.
  - Backend: Ruff / Flake8 and Black / formatting standards.
- **No Dead Code**: Never commit commented-out code blocks, unused imports, or orphaned files.

---

## 3. Type Safety
- **Strict TypeScript**: Frontend TypeScript configuration must enforce `strict: true`, `noImplicitAny: true`, and `strictNullChecks: true`. Do not use `any` unless explicitly wrapping untyped third-party libraries, in which case use `unknown` with type guards.
- **Backend Type Hints**: Python code must feature complete type hints (`typing` / built-in generics) for all function arguments, return values, and class attributes.
- **Runtime Validation**: Use Zod for frontend form and input validation; use Pydantic v2 models for backend payload and query parsing.

---

## 4. Secure Coding
- **Input Sanitization**: Validate all inputs at backend boundaries against strict whitelist schemas (lengths, patterns, types).
- **OWASP Compliance**: Protect against SQL Injection (via SQLAlchemy parameterized queries), Cross-Site Scripting (XSS via React escaping & Content Security Policies), and Cross-Site Request Forgery (CSRF).
- **File Upload Security**:
  - Validate MIME types against file content (magic bytes), not merely client-supplied extensions.
  - Enforce maximum upload file sizes.
  - Store files with random UUID storage keys outside the public web root.
  - Prevent path traversal attacks (`../`). Private athlete documents must NEVER be accessible via unauthenticated public URLs.
- **No Hardcoded Secrets**: Secrets, keys, salts, and tokens must NEVER be committed to source control. Use environment variables exclusively.

---

## 5. Authentication and Authorization
- **No Frontend-Only Auth**: Hiding a UI element or routing guard does NOT constitute security. Every protected backend endpoint must independently authenticate and authorize each request.
- **Password Security**: Passwords must be hashed using robust algorithms (e.g., Argon2 or bcrypt with work factor >= 12). Plaintext passwords must NEVER be logged or stored.
- **Session & Tokens**: Use short-lived JWT access tokens with secure refresh token rotation, or HTTP-only secure samesite cookies.
- **Role-Based Access Control (RBAC)**: Support explicit roles: `Visitor`, `Athlete`, `Verifier`, `Scholarship Administrator`, `Finance Officer`, `Super Administrator`.
  - Athletes can only access their own profile, applications, and expense requests.
  - Verifiers can only review applications assigned to their authorized sport domains.
  - Financial approvals and disbursements require explicit `Finance Officer` or `Super Administrator` privileges with dual-control thresholds where configured.

---

## 6. Database Migration Rules
- **Alembic Exclusivity**: All database schema changes in PostgreSQL must be managed via versioned Alembic migration scripts. Never modify database schemas manually in production or shared environments.
- **Reversibility**: Every migration file must provide both a working `upgrade()` and a valid `downgrade()` function.
- **Idempotency & Safety**: Migrations must be non-destructive where possible, avoid long table locks, and safely backfill default values for new non-null columns.

---

## 7. Financial Ledger Invariants
- **Double-Entry & Immutable Ledger**: The scholarship financial engine is an authoritative, append-only ledger. Records are never deleted or mutated in-place; adjustments require reversal transactions.
- **Authoritative Balance Calculation**: Displayed balances (`Approved Allocation`, `Reserved Funds`, `Disbursed Funds`, `Available Balance`) must always be derived dynamically from ledger entries or verified materialized snapshots, NEVER from client-submitted values.
- **Ledger Invariant Formula**:
  $$\text{Available Balance} = \text{Approved Allocation} - (\text{Reserved Funds} + \text{Disbursed Funds})$$
  $\text{Available Balance}$ can NEVER be negative.
- **Concurrency & Idempotency**: All disbursement requests and balance reservations must execute within strict database transactions with row-level locks (`SELECT FOR UPDATE`) and unique idempotency keys to prevent double-spending or race conditions.
- **Currency & Precision**: All financial amounts must be tracked in Indian Rupees (INR) using 64-bit integer paise (or arbitrary-precision `Numeric(14, 2)`) to eliminate floating-point rounding errors.

---

## 8. Frontend Accessibility (a11y)
- **WCAG 2.1 AA Compliance**: Maintain contrast ratios of at least 4.5:1 for normal text and 3:1 for large text across both Light (Red/White) and Dark (Black/Red) themes.
- **Keyboard Navigation**: All interactive elements (buttons, inputs, links, dropdowns, dialogs) must be fully navigable and operable via keyboard (`Tab`, `Enter`, `Space`, `Escape`).
- **Semantic HTML**: Use proper semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<h1>`-`<h6>`). Exactly one `<h1>` per view.
- **Screen Reader Support**: Use ARIA attributes (`aria-label`, `aria-expanded`, `aria-describedby`, `role`) appropriately without overriding native semantics.
- **Reduced Motion**: Respect `prefers-reduced-motion: reduce` for all CSS transitions and animations.

---

## 9. API Contracts
- **RESTful Conventions**: Use standard HTTP methods (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) with semantically correct status codes (200, 201, 204, 400, 401, 403, 404, 409, 422, 500).
- **Uniform Response Envelope**: Standardize success and error payloads.
  - Error schema must include: `status`, `error_code`, `message`, `details` (field-level validation errors), and `timestamp`.
- **Versioning**: All application API endpoints must be prefixed with `/api/v1/`.

---

## 10. Error Handling
- **No Silent Failures**: Every error must be explicitly caught, logged with appropriate context, and handled cleanly. Never use empty `except:` or `catch {}` blocks.
- **Safe Error Messages**: Error messages returned to clients must be user-friendly and actionable, without exposing stack traces, internal paths, database schemas, or infrastructure topology.

---

## 11. Logging and Secret Management
- **Structured JSON Logging**: Log events with timestamps, log levels (`INFO`, `WARN`, `ERROR`), request IDs, and context.
- **PII & Secret Sanitization**: NEVER log passwords, OTPs, session tokens, JWTs, credit/bank numbers, or sensitive identity documents.
- **Environment Separation**: Maintain distinct configuration profiles for `development`, `testing`, `staging`, and `production`. Default to secure values.

---

## 12. Testing Requirements
- **Test-Driven Rigor**: Every phase deliverable must be validated through automated tests:
  - Unit tests for domain logic, utility functions, and rules engine.
  - Integration tests for API endpoints, database transactions, and auth flows.
  - End-to-end / UI component tests for key user journeys.
- **Regression Testing**: When fixing bugs, reproduce the issue with a failing test before applying the fix.
- **No Fake Tests**: Do not write superficial assertions (e.g., `assert True`). Test real business behavior and boundary conditions.

---

## 13. Documentation Requirements
- **Living Documentation**: Technical documentation in `docs/` and `README.md` must accurately reflect the codebase as it evolves.
- **Accurate Claims**: Never document a feature as complete or functional when it is merely a stub or mock. Clearly label sample/demonstration data and simulated services.

---

## 14. Git Commit and Push Rules
- **Conventional Commits**: Format commit messages as `<type>(<scope>): <concise description>`:
  - `feat`: New user-facing feature
  - `fix`: Bug fix
  - `docs`: Documentation updates
  - `refactor`: Code change that neither fixes a bug nor adds a feature
  - `test`: Adding or updating tests
  - `chore`: Build tasks, package updates, config changes
- **Atomic Commits**: Stage and commit only related files for the completed phase/task.
- **Pre-Push Validation**: Run linting, type checks, and tests before committing. Never push broken code.
- **Safety First**: NEVER execute `git push --force` or commands that discard existing work without explicit authorization.

---

## 15. Phase Approval Rules
- **Single-Phase Execution**: Execute exactly one approved phase at a time. Do not begin subsequent phases in the background or expand scope silently.
- **Mandatory Approval Gate**: At the end of each phase, stop and request user authorization using the required template. Never proceed without explicit user confirmation.

---

## 16. Prohibited Shortcuts
- ❌ No mock authentication posing as production auth.
- ❌ No frontend-only authorization checks.
- ❌ No hardcoded scholarship awards or decisions.
- ❌ No simulated payments masquerading as verified real-money transactions.
- ❌ No public storage URLs for private athlete identity documents.
- ❌ No financial balance mutations bypassing the ledger.
- ❌ No unverified claims of partnerships with BCCI, SAI, or any government body.

---

## 17. Definition of Done (DoD)
A phase or task is considered DONE only when:
1. All functional requirements and acceptance criteria are implemented.
2. Code conforms to architectural boundaries and quality standards.
3. Automated tests pass with zero regressions.
4. Relevant documentation in `README.md`, `roadmap.md`, and `docs/` is updated.
5. Changes are committed to Git with a meaningful commit message.
6. The commit is pushed to the remote repository and verified.
7. User approval is requested and granted before starting the next phase.

---

## 18. Rules for Updating roadmap.md
- **Accurate Phase Status**: Use only defined status tags (`NOT STARTED`, `IN PROGRESS`, `BLOCKED`, `COMPLETED`, `AWAITING USER APPROVAL`).
- **Complete Phase Metadata**: Record deliverables, dependencies, acceptance criteria, test results, commit hash, and push verification for every phase.
- **No Premature Completion**: Never mark a phase `COMPLETED` until all acceptance criteria, tests, commits, and pushes have been verified.
