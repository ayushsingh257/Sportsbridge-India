# System Architecture Documentation

**Platform:** Bharat Sports Grant (Sportsbridge India)  
**Document Version:** 1.0.0  
**Status:** Approved Architectural Baseline  

---

## 1. Architectural Overview

Bharat Sports Grant is designed as a modular, high-integrity full-stack platform providing transparent, merit-based sports scholarship evaluations and controlled financial disbursements for Indian athletes.

The system is structured as a decoupled monorepo:
- **Frontend Presentation Layer (`frontend/`)**: Built with Next.js (App Router), TypeScript, and Tailwind CSS. It communicates with the backend solely via RESTful JSON APIs.
- **Backend Domain & Services Layer (`backend/`)**: Built with FastAPI, Pydantic v2, and Python 3.13. It encapsulates authentication, the eligibility rules engine, workflow state machines, and the financial ledger.
- **Persistence Layer**: PostgreSQL database managed via SQLAlchemy ORM and Alembic migrations.

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Browser                         │
│  (Next.js App Router, React 19, TypeScript, Tailwind CSS)   │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTPS / JSON REST API
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                  FastAPI Backend Gateway                    │
│   (Auth Middleware, Rate Limiting, CORS, Request Logging)   │
└──────┬───────────────────────┼───────────────────────┬──────┘
       │                       │                       │
       ▼                       ▼                       ▼
┌──────────────┐      ┌─────────────────┐     ┌────────────────┐
│ Auth & RBAC  │      │ Rules Engine    │     │ Financial      │
│ Service      │      │ (Versioned)     │     │ Ledger Service │
└──────────────┘      └─────────────────┘     └────────────────┘
       │                       │                       │
       └───────────────────────┼───────────────────────┘
                               │ SQLAlchemy 2.0 (Async)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    PostgreSQL Database                      │
│   (Users, Athletes, Programs, Applications, Documents,      │
│             Ledger Transactions, Audit Logs)                │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Core Architectural Principles

1. **Backend as Source of Truth**: The client never determines authorization, eligibility, or ledger balances. All calculations are executed server-side.
2. **Double-Entry Financial Invariants**: Scholarship funds operate as an immutable, append-only ledger. Balances are derived dynamically, preventing double-spending and over-allocation.
3. **Decoupled Rules Engine**: Sports eligibility criteria are stored as structured, versioned data models rather than hardcoded conditional branches.
4. **Defense in Depth**: Every endpoint verifies both authentication and granular role-based permissions (RBAC).
5. **Transparency & Auditability**: Every state transition (application review, document approval, fund reservation, disbursement) generates an immutable audit log entry.

---

## 3. Module Boundaries

### Frontend (`frontend/`)
- `src/app/(public)/`: Public landing page, about, contact, and transparency pages.
- `src/app/(auth)/`: Authentication flows (registration, login, OTP verification).
- `src/app/dashboard/`: Authenticated athlete portal.
- `src/app/eligibility/`: Multi-step eligibility assessment wizard.
- `src/app/admin/`: Role-gated administrative and verification interface.
- `src/components/`: Modular, reusable UI components adhering to design tokens.
- `src/lib/`: API client, formatting utilities (e.g., INR currency, Indian phone numbers).

### Backend (`backend/`)
- `app/api/`: Versioned API routers (`/api/v1/auth`, `/api/v1/athletes`, `/api/v1/eligibility`, `/api/v1/applications`, `/api/v1/ledger`, `/api/v1/admin`).
- `app/core/`: Configuration, security utilities (password hashing, JWT), logging.
- `app/db/`: SQLAlchemy async session management and base model declarations.
- `app/models/`: SQLAlchemy relational entities.
- `app/schemas/`: Pydantic v2 schemas for request validation and response serialization.
- `app/rules_engine/`: Domain logic for evaluating scholarship eligibility criteria.
- `app/ledger/`: Financial transaction manager enforcing ledger invariants and concurrency locks.

---

## 4. Technical Trade-Offs and Decisions

- **FastAPI over Django**: FastAPI provides superior performance, native async support, automated OpenAPI documentation generation, and lightweight Pydantic integration tailored for API-centric architectures.
- **PostgreSQL over NoSQL**: Relational integrity, ACID guarantees, and row-level locking (`SELECT FOR UPDATE`) are strictly required for the financial ledger and audit trails.
- **Tailwind CSS over CSS-in-JS**: Zero runtime overhead, rapid consistency through custom design tokens, and optimal server-side rendering support with Next.js.
