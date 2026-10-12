# Cybersecurity Architecture and Security Model

**Platform:** Bharat Sports Grant (Sportsbridge India)  
**Standard:** OWASP Top 10 (2021+), ISO/IEC 27001 Controls Alignment  

---

## 1. Security Architecture Principles

1. **Zero Trust & Defense in Depth**: Every layer (CDN/Reverse Proxy, Next.js Frontend, FastAPI Gateway, Database) enforces perimeter and data access controls.
2. **Explicit Authorization**: Frontend controls and hidden UI elements are strictly non-authoritative. Every backend endpoint checks permissions independently.
3. **Least Privilege**: Users and service accounts operate with the minimal permissions necessary for their designated duties.
4. **Data Minimization**: The platform only collects information necessary to evaluate published eligibility criteria. Sensitive personal attributes (religion, caste, family wealth) are explicitly excluded from eligibility decisions.

---

## 2. Authentication & Session Security

- **Password Storage**: Passwords are hashed using Argon2id or bcrypt (cost factor >= 12). Plaintext passwords never touch logs, storage, or memory longer than the hashing function execution.
- **JWT & Token Lifecycle**:
  - Access Token: Short-lived (15 minutes), containing user ID, role, and permissions claim. Signed with asymmetric (RS256) or robust HMAC-SHA256 (`HS256`) with a cryptographically secure 256-bit secret.
  - Refresh Token: Stored in an HTTP-only, Secure, SameSite=Strict cookie. Includes token family rotation: if a reused refresh token is detected, all tokens in that family are immediately revoked (mitigating token theft).
- **Brute Force & Rate Limiting**:
  - IP and account-based rate limiting on `/auth/login` (max 5 failed attempts per 15 minutes before temporary lockout).
  - OTP verification rate-limited to 3 attempts per code with a 5-minute expiry.

---

## 3. Role-Based Access Control (RBAC) Matrix

| Role | Public Info | Own Profile/Docs | Eligibility Check | Review Queue | Finance Approval | Audit Logs |
|---|---|---|---|---|---|---|
| **Visitor** | Read | None | Read Only | None | None | None |
| **Athlete** | Read | Read / Write | Submit / Track | None | None | None |
| **Verifier** | Read | Own Account | View Rules | Review Sport | None | Read Actions |
| **Finance Officer**| Read | Own Account | View Rules | None | Approve / Disburse | Read Actions |
| **Scholarship Admin**| Read/Write| Own Account | Manage Rules | Reassign | View Ledgers | Read Actions |
| **Super Administrator**| Full | Full | Full | Full | Full (Dual Control) | Full Audit |

---

## 4. Secure Document Storage & Upload Safeguards

- **Private Uploads**: Athlete certificates, age proofs, and expense invoices are strictly private.
- **Upload Validation**:
  - File signature inspection (verifying magic bytes, not just MIME or filename extensions). Supported: PDF, JPEG, PNG. Max size: 5 MB per file.
  - Filename sanitization: Original filename is discarded; files are persisted using UUIDv4 storage keys (e.g., `doc_8e94fa12-32a4-4c12-9c1a-7b3b0d4f55a1.pdf`).
  - Path traversal prevention: Directory separators (`/`, `\`, `..`) are rejected.
- **Access Control Proxy**: Documents are never served via public static URLs. Access is routed through an authenticated backend proxy endpoint (`/api/v1/applications/{id}/documents/{doc_id}`) verifying that the requester is either the owning athlete or an authorized verifier assigned to that sport.

---

## 5. Financial Ledger Security & Anti-Tampering

- **Double-Disbursement Mitigation**:
  - Database row-level locks (`SELECT FOR UPDATE`) on the scholarship allocation record during any reservation or disbursement request.
  - Mandatory client idempotency keys on all expense and disbursement requests.
- **Zero Client Trust**: All balance calculations, eligibility approvals, and expense limits are derived directly from database ledger entries. No client-submitted balance or award amount is ever accepted.
- **Simulated Environment Transparency**: During development and prototype demonstration, all disbursements are explicitly recorded as simulated ledger events, never misrepresenting real financial settlements.
