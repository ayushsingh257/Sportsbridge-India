# API Specification Documentation

**Platform:** Bharat Sports Grant (Sportsbridge India)  
**API Prefix:** `/api/v1`  
**Protocol:** HTTPS / JSON REST  

---

## 1. Global Conventions

### Response Envelope
All API responses use a standardized JSON structure:

#### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully",
  "timestamp": "2026-10-12T22:15:00Z"
}
```

#### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "phone",
        "issue": "Must be a valid 10-digit Indian mobile number"
      }
    ]
  },
  "timestamp": "2026-10-12T22:15:00Z"
}
```

### HTTP Status Codes
- `200 OK`: Request succeeded.
- `201 Created`: Resource successfully created.
- `204 No Content`: Request succeeded with no response body.
- `400 Bad Request`: Client error in payload or request format.
- `401 Unauthorized`: Authentication missing, expired, or invalid.
- `403 Forbidden`: Authenticated user lacks sufficient permissions.
- `404 Not Found`: Requested resource does not exist.
- `409 Conflict`: Unique constraint violation (e.g., email or phone already registered).
- `422 Unprocessable Entity`: Schema validation failure.
- `429 Too Many Requests`: Rate limit exceeded.
- `500 Internal Server Error`: Unexpected server condition.

---

## 2. Core API Routes

### 2.1 Authentication & Registration (`/api/v1/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | Register new athlete account | Public |
| `POST` | `/api/v1/auth/verify-otp` | Verify phone/email OTP | Public / Partial |
| `POST` | `/api/v1/auth/resend-otp` | Resend verification OTP (rate limited) | Public |
| `POST` | `/api/v1/auth/login` | Authenticate with credentials | Public |
| `POST` | `/api/v1/auth/refresh` | Refresh access token using refresh token | Refresh Token |
| `POST` | `/api/v1/auth/logout` | Revoke tokens and terminate session | Bearer Token |
| `POST` | `/api/v1/auth/forgot-password` | Request password reset token | Public |
| `POST` | `/api/v1/auth/reset-password` | Set new password with token | Public |

### 2.2 Athlete Profile (`/api/v1/athletes`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/v1/athletes/me` | Fetch authenticated athlete's profile | Athlete |
| `PUT` | `/api/v1/athletes/me` | Update athlete profile details | Athlete |
| `GET` | `/api/v1/athletes/me/dashboard` | Fetch consolidated dashboard metrics | Athlete |

### 2.3 Sports & Eligibility Engine (`/api/v1/eligibility`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/v1/eligibility/sports` | List supported sports & details | Public |
| `GET` | `/api/v1/eligibility/programs` | List active scholarship programs | Public |
| `POST` | `/api/v1/eligibility/evaluate` | Authoritative eligibility pre-assessment | Authenticated |

### 2.4 Applications & Documents (`/api/v1/applications`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/v1/applications` | List applicant's own applications | Athlete |
| `POST` | `/api/v1/applications` | Submit new scholarship application | Athlete |
| `GET` | `/api/v1/applications/{id}` | Get application status and timeline | Athlete / Reviewer |
| `POST` | `/api/v1/applications/{id}/documents` | Upload supporting document | Athlete |
| `GET` | `/api/v1/applications/{id}/documents/{doc_id}` | Authorized secure document download | Athlete / Reviewer |

### 2.5 Financial Ledger & Expenses (`/api/v1/ledger`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/v1/ledger/balance` | Get authoritative athlete ledger balance | Athlete |
| `GET` | `/api/v1/ledger/expenses` | List expense claims & status | Athlete |
| `POST` | `/api/v1/ledger/expenses` | Submit new expense reimbursement request | Athlete |
| `GET` | `/api/v1/ledger/transactions` | Full ledger transaction history | Athlete |

### 2.6 Administration & Verification (`/api/v1/admin`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/v1/admin/queue` | Review queue for assigned sport | Verifier / Admin |
| `POST` | `/api/v1/admin/applications/{id}/verify` | Record document verification decision | Verifier / Admin |
| `POST` | `/api/v1/admin/expenses/{id}/review` | Approve/Reject expense claim | Finance / Admin |
| `POST` | `/api/v1/admin/expenses/{id}/disburse` | Execute simulated disbursement | Finance / Admin |
| `GET` | `/api/v1/admin/audit-logs` | Retrieve immutable audit records | Admin |
