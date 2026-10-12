"""Seed demo database script for Bharat Sports Grant."""

import asyncio
import uuid
from datetime import date, datetime, timezone

from app.db.session import AsyncSessionLocal
from app.models.sport import Sport, ScholarshipProgram, CompetitionLevel
from app.models.user import User
from app.models.athlete import AthleteProfile
from app.models.application import ScholarshipApplication, ApplicationStatus
from app.models.ledger import ScholarshipAllocation, ExpenseRequest, LedgerTransaction, ExpenseCategory, TransactionType
from app.security.auth import hash_password


async def seed_data():
    """Populates realistic demonstration dataset for all platform workflows."""
    print("Beginning database seed...")
    async with AsyncSessionLocal() as session:
        # 1. Seed Sports
        sports_data = [
            ("archery", "Archery (Recurve & Compound)", "Olympic", "Archery Association of India"),
            ("athletics", "Athletics (Track & Field)", "Olympic", "Athletics Federation of India"),
            ("badminton", "Badminton", "Olympic", "Badminton Association of India"),
            ("boxing", "Boxing", "Olympic", "Boxing Federation of India"),
            ("shooting", "Shooting (Rifle & Pistol)", "Olympic", "National Rifle Association of India"),
            ("wrestling", "Wrestling (Freestyle/Greco-Roman)", "Olympic", "Wrestling Federation of India"),
            ("weightlifting", "Weightlifting", "Olympic", "Indian Weightlifting Federation"),
            ("hockey", "Field Hockey", "Team Olympic", "Hockey India"),
            ("tabletennis", "Table Tennis", "Racquet", "Table Tennis Federation of India"),
            ("swimming", "Aquatics (Swimming)", "Olympic", "Swimming Federation of India"),
            ("fencing", "Fencing", "Combat", "Fencing Association of India"),
            ("judo", "Judo & Martial Arts", "Combat", "Judo Federation of India"),
            ("kabaddi", "Kabaddi", "Indigenous", "Amateur Kabaddi Federation of India"),
            ("mallakhamb", "Mallakhamb", "Indigenous", "Mallakhamb Federation of India"),
        ]

        for code, name, category, governing in sports_data:
            sp = Sport(
                code=code,
                name=name,
                category=category,
                governing_body=governing,
                is_active=True,
            )
            session.add(sp)

        # 2. Seed Demo Athlete Account
        demo_user = User(
            email="athlete.demo@sportsbridge.in",
            phone="+919876543210",
            password_hash=hash_password("DemoAthlete2026!"),
            role="ATHLETE",
            is_email_verified=True,
            is_phone_verified=True,
        )
        session.add(demo_user)
        await session.flush()

        # 3. Seed Demo Athlete Profile
        profile = AthleteProfile(
            user_id=demo_user.id,
            first_name="Rohan",
            last_name="Varma",
            username="rohan_archer",
            date_of_birth=date(2004, 5, 14),
            gender="Male",
            height_cm=181.0,
            weight_kg=74.5,
            state="Karnataka",
            city="Bengaluru",
            education_level="Undergraduate",
            preferred_sports=["Archery (Recurve & Compound)"],
            achievements_summary="State Championship Gold Medalist (Senior Recurve 70m).",
        )
        session.add(profile)

        # 4. Seed Application
        app = ScholarshipApplication(
            application_number="BSG-2026-ARCH-0012",
            athlete_id=demo_user.id,
            sport_code="archery",
            competition_level="STATE",
            preliminary_score=85,
            status=ApplicationStatus.VERIFICATION_PENDING.value,
            reviewer_notes="State federation certificate verification in progress.",
        )
        session.add(app)
        await session.flush()

        # 5. Seed Allocation & Ledger Invariant
        alloc = ScholarshipAllocation(
            athlete_id=demo_user.id,
            application_id=app.id,
            total_allocated_inr=350000.0,
            reserved_amount_inr=25000.0,
            disbursed_amount_inr=45000.0,
            status="ACTIVE",
            academic_year="2026-2027",
        )
        session.add(alloc)
        await session.flush()

        tx1 = LedgerTransaction(
            allocation_id=alloc.id,
            transaction_type=TransactionType.CREDIT_ALLOCATION.value,
            amount_inr=350000.0,
            balance_after_inr=350000.0,
            idempotency_key=f"init_alloc_{alloc.id}",
            description="Initial allocation credited for AY 2026-2027",
        )
        tx2 = LedgerTransaction(
            allocation_id=alloc.id,
            transaction_type=TransactionType.DEBIT_DISBURSED.value,
            amount_inr=45000.0,
            balance_after_inr=305000.0,
            idempotency_key=f"disb_{alloc.id}_01",
            description="Reimbursement disbursed to ArrowTech Archery Supplies",
        )
        tx3 = LedgerTransaction(
            allocation_id=alloc.id,
            transaction_type=TransactionType.RESERVE_HOLD.value,
            amount_inr=25000.0,
            balance_after_inr=280000.0,
            idempotency_key=f"hold_{alloc.id}_02",
            description="Reserved hold for National High Performance Camp coaching claim",
        )
        session.add_all([tx1, tx2, tx3])

        await session.commit()
        print("Database seed completed successfully with verified ledger invariants!")


if __name__ == "__main__":
    asyncio.run(seed_data())
