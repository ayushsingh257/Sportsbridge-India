# Bharat Sports Grant (Sportsbridge India)

> **Empowering Indian Athletes through Transparent, Merit-Based Sports Scholarships and Controlled Financial Support.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.13-blue.svg)](https://www.python.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688.svg)](https://fastapi.tiangolo.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3%2Fv4-38B2AC.svg)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-336791.svg)](https://www.postgresql.org/)

---

## 1. Project Overview

**Bharat Sports Grant** is a production-quality, secure full-stack platform built for the Indian sports ecosystem. It connects talented athletes across multiple sporting disciplines with financial scholarships to fund coaching, sports academies, equipment, travel, competition registrations, and sports medicine.

### Core Philosophy: Equal Access to Sports Opportunities
Eligibility is determined exclusively through published, configurable sporting and academic criteria. Opportunities are awarded on merit and proven achievement—never on an athlete's family wealth, caste, religion, gender, or personal connections.

---

## 2. Key Features

- **Inclusive Multi-Sport Coverage**: Supports 14+ sports including Cricket, Football, Basketball, Archery, Shooting, Athletics, Badminton, Hockey, Wrestling, Boxing, Swimming, Volleyball, Tennis, and configurable new additions.
- **Localized for India**: Native support for Indian phone numbers (+91), Indian Rupee (INR) currency formatting, Indian state/district hierarchies, and educational structures.
- **Configurable Rules Engine**: Versioned criteria evaluator that dynamically assesses preliminary eligibility without hardcoded frontend logic.
- **Controlled Financial Ledger**: Scholarship funds are modeled as approved allocations; expenses are released per approved category (coaching, equipment, travel) with immutable transaction tracking preventing over-allocation.
- **Role-Based Access Control (RBAC)**: Strict segregation of duties across Visitors, Athletes, Verifiers, Finance Officers, Scholarship Admins, and Super Admins.
- **Private Document Verification**: Secure document upload and authorized proxy retrieval protecting athlete privacy and identity records.
- **Dual Visual Theme**: Premium Red/White (Light) and Charcoal/Black/Red (Dark) aesthetic with glassmorphic navbar and accessible contrast.

---

## 3. Technology Stack

### Frontend (`frontend/`)
- **Framework**: Next.js (App Router), React, TypeScript (strict mode)
- **Styling**: Tailwind CSS, CSS variables design token system
- **Icons**: Lucide Icons
- **Form Management & Validation**: React Hook Form, Zod
- **Testing**: Vitest, React Testing Library, Playwright

### Backend (`backend/`)
- **Framework**: FastAPI (Python 3.13), Pydantic v2
- **ORM & Database**: SQLAlchemy 2.0 (Async), PostgreSQL 16+
- **Migrations**: Alembic
- **Security**: Argon2id / bcrypt password hashing, PyJWT token lifecycle
- **Testing**: Pytest, HTTPX AsyncClient

### Infrastructure & DevOps
- **Containerization**: Docker, Docker Compose
- **CI/CD**: GitHub Actions
- **Governance**: Strict rules documented in `green.md`

---

## 4. Architecture Overview

The system operates as a decoupled monorepo:
```text
Sportsbridge-India/
├── frontend/
│   ├── public/               # Static public assets (images, icons, favicons)
│   ├── src/
│   │   ├── app/              # Next.js App Router pages and route handlers
│   │   ├── components/       # Reusable UI & domain components
│   │   ├── hooks/            # Custom React hooks (theming, auth, forms)
│   │   ├── lib/              # Utility functions and shared helpers
│   │   ├── services/         # API client layer for backend communication
│   │   ├── types/            # TypeScript interfaces and type definitions
│   │   └── styles/           # Global styles and Tailwind CSS configurations
│   ├── tests/                # Frontend unit and component tests (Vitest)
│   ├── tsconfig.json         # Strict TypeScript compiler options
│   ├── package.json          # Frontend dependencies and npm scripts
│   └── .env.example          # Frontend environment variables template
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/       # Versioned API routes (/api/v1/auth, etc.)
│   │   ├── core/             # Application config, settings, and logging
│   │   ├── models/           # SQLAlchemy relational database models
│   │   ├── schemas/          # Pydantic v2 validation schemas
│   │   ├── services/         # Domain business logic
│   │   ├── repositories/     # Database access and query abstractions
│   │   ├── rules_engine/     # Configurable sports eligibility engine
│   │   ├── security/         # Password hashing, JWT lifecycle, rate limiting
│   │   ├── permissions/      # Role-Based Access Control (RBAC)
│   │   ├── notifications/    # Alert services (email/SMS mock dispatch)
│   │   ├── ledger/           # Controlled double-entry financial ledger
│   │   ├── tasks/            # Background asynchronous task handlers
│   │   ├── db/               # Async engine and database session management
│   │   └── main.py           # FastAPI application entrypoint and health routes
│   ├── migrations/           # Alembic database schema migrations
│   ├── tests/                # Pytest test suite for APIs and domain logic
│   ├── scripts/              # Database seeding and administrative utilities
│   ├── requirements.txt      # Pinned Python package dependencies
│   ├── pyproject.toml        # Backend build configuration and tool options
│   └── .env.example          # Backend environment variables template
│
├── docker-compose.yml        # Local orchestration for frontend, backend, PostgreSQL
├── .gitignore                # Monorepo git exclusion rules
├── AGENTS.md                 # Antigravity agent operational guidelines
├── green.md                  # Mandatory engineering governance rules
├── README.md                 # Project documentation and guide
└── roadmap.md                # Master development phase tracker
```

---

## 5. Prerequisites

Ensure the following runtimes are installed on your system:
- **Node.js**: >= 20.x LTS (Tested on v22.16.0)
- **npm**: >= 10.x (Tested on 11.17.0)
- **Python**: >= 3.12 (Tested on 3.13.5)
- **PostgreSQL**: >= 15 (Local service or Docker container)
- **Git**: >= 2.40 (Tested on 2.49.0)
- **Docker**: Optional for containerized setup (Tested on 29.4.3)

---

## 6. Local Setup Instructions

### Step 1: Clone Repository
```bash
git clone https://github.com/ayushsingh257/Sportsbridge-India.git
cd Sportsbridge-India
```

### Step 2: Configure Environment Files
Copy the template configuration files:
```bash
# Frontend configuration
cp frontend/.env.example frontend/.env.local

# Backend configuration
cp backend/.env.example backend/.env
```

### Step 3: Backend Setup
```bash
cd backend
python -m venv venv

# Windows PowerShell:
.\venv\Scripts\Activate.ps1
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
alembic upgrade head
cd ..
```

### Step 4: Frontend Setup
```bash
cd frontend
npm install
cd ..
```

---

## 7. Running the Application

### Development Mode

**Start Backend (FastAPI):**
```bash
cd backend
uvicorn app.main:app --reload --port 8000
```
Interactive API documentation will be accessible at: `http://localhost:8000/docs`

**Start Frontend (Next.js):**
```bash
cd frontend
npm run dev
```
Public application will be accessible at: `http://localhost:3000`

### Running via Docker Compose
```bash
docker compose up --build
```

---

## 8. Running Automated Tests

### Backend Test Suite (Pytest)
```bash
cd backend
pytest -v --cov=app
```

### Frontend Test Suite (Vitest & RTL)
```bash
cd frontend
npm run test
```

### End-to-End Tests (Playwright)
```bash
cd frontend
npx playwright test
```

---

## 9. Demo Data & Simulated Services

To populate the database with demonstration sports, sample programs, and testing accounts:
```bash
cd backend
python -m scripts.seed_demo
```

> [!NOTE]
> All funding amounts, statistics, and partner representations displayed in development are demonstration fixtures and must not be portrayed as official government commitments. Simulated disbursements are used pending authorized banking arrangements.

---

## 10. Git & Phase Workflow

Development follows a strict phase-based lifecycle governed by `green.md`:
1. **One Phase at a Time**: Never implement subsequent phases until the current phase is validated, committed, pushed, and approved.
2. **Conventional Commits**: Every commit strictly follows `feat(...)`, `fix(...)`, `docs(...)`, `test(...)`.
3. **Phase Sign-Off Gate**: A phase is completed only after acceptance criteria pass and explicit user sign-off is granted.

---

## 11. Current Implementation Status

- **Phase 1: Requirements & Project Foundation**: **IN PROGRESS**
- **Phases 2 – 13**: NOT STARTED (Pending Phase 1 sign-off)

See [`roadmap.md`](roadmap.md) for live progress tracking.
