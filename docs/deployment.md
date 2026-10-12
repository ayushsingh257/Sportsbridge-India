# Deployment and Environment Setup Documentation

**Platform:** Bharat Sports Grant (Sportsbridge India)  
**Target Environments:** Local Development, Docker Compose, Production Staging  

---

## 1. Local Development Prerequisites

- **Node.js**: v20.x or v22.x LTS (verified v22.16.0)
- **npm**: 10.x or 11.x (verified 11.17.0)
- **Python**: 3.12 or 3.13 (verified 3.13.5)
- **PostgreSQL**: 15+ (local instance or Docker container)
- **Docker & Docker Compose**: Optional for local, recommended for staging (verified Docker 29.4.3)
- **Git**: 2.40+ (verified 2.49.0)

---

## 2. Environment Configuration

### Frontend Configuration (`frontend/.env.example`)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_APP_NAME="Bharat Sports Grant"
NEXT_PUBLIC_ENVIRONMENT=development
```

### Backend Configuration (`backend/.env.example`)
```bash
ENVIRONMENT=development
APP_NAME="Bharat Sports Grant API"
API_V1_PREFIX=/api/v1
SECRET_KEY=change-this-in-production-use-openssl-rand-hex-32
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=7

# Database
DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/sportsbridge_db

# CORS
CORS_ORIGINS=["http://localhost:3000"]

# Upload Directory
UPLOAD_DIR=./uploads

# Simulated Gateway Flags
ENABLE_MOCK_OTP=true
ENABLE_MOCK_DISBURSEMENT=true
```

---

## 3. Database Initialization & Migrations

```bash
# Inside backend directory with active virtual environment:
alembic upgrade head

# To generate new migration when models change:
alembic revision --autogenerate -m "describe_changes"

# To seed development data (safe demo records only):
python -m scripts.seed_demo
```

---

## 4. Production Deployment Checklist

> [!WARNING]
> Do NOT deploy publicly or spin up paid production cloud resources without explicit user authorization.

1. **HTTPS & TLS**: Enforce TLS 1.3 with automated certificate renewal (e.g. Let's Encrypt).
2. **Security Headers**:
   - `Content-Security-Policy`
   - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
3. **Database Security**:
   - Private network isolation (no direct public internet exposure).
   - Encrypted at rest (AES-256) and in transit (SSL mode `require`).
   - Automated daily snapshots with 30-day retention.
4. **Secrets Management**: Use environment secrets managers (AWS Secrets Manager, Doppler, or HashiCorp Vault) rather than static files on server disks.
