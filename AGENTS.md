# AGENTS.md — Agent & Assistant Guidelines

## Project Context
- **Project Name:** Bharat Sports Grant (Sportsbridge India)
- **Repository:** https://github.com/ayushsingh257/Sportsbridge-India
- **Stack:**
  - Frontend: Next.js (App Router), TypeScript, Tailwind CSS, Lucide icons, React Hook Form, Zod.
  - Backend: Python 3.13, FastAPI, Pydantic v2, SQLAlchemy, Alembic, PostgreSQL.
  - Testing: Pytest (backend), Vitest & React Testing Library (frontend), Playwright (E2E).
  - Infrastructure: Docker, Docker Compose.

## Mandatory Operating Protocol
1. **Always Read `green.md` First**: Before starting any phase, subtask, bugfix, or refactor, review `/green.md`. It is the binding engineering standard for this repository.
2. **Phase Boundary Discipline**:
   - Execute strictly ONE phase at a time.
   - Do not implement features or scaffold routes for future phases ahead of time.
   - Maintain and update `roadmap.md` on every phase transition.
3. **Approval Gate Protocol**:
   - At the completion of each phase, stop all implementation.
   - Format the completion report and request authorization in the required format.
   - Do not proceed to the next phase without explicit user confirmation.
4. **Git Discipline**:
   - Ensure clean working tree.
   - Commit atomic phase deliverables with conventional commit messages.
   - Push to `origin main` and verify before requesting phase sign-off.
5. **No Hallucinated Success**:
   - Verify every tool command result.
   - Run tests directly and report exact outputs.
   - Transparently disclose simulated components (e.g., test ledger, demo SMS/Email OTP, sample statistics).
