"""API routes for contact submissions, grievance tickets, and notifications."""

import random
from datetime import datetime, timezone
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.db.session import get_db
from app.models.user import User
from app.models.contact import ContactTicket, Notification
from app.schemas.contact import (
    ContactTicketCreateRequest,
    ContactTicketResponse,
    NotificationResponse,
)
from app.security.auth import get_current_user

router = APIRouter(prefix="/support", tags=["Support & Notifications"])


def generate_ticket_number(category: str) -> str:
    year = datetime.now(timezone.utc).year
    code = category[:3].upper()
    num = random.randint(1000, 9999)
    return f"TKT-{year}-{code}-{num}"


@router.post("/contact", response_model=ContactTicketResponse, status_code=status.HTTP_201_CREATED)
async def submit_contact_ticket(
    payload: ContactTicketCreateRequest,
    db: AsyncSession = Depends(get_db),
):
    """Public endpoint to submit general inquiry or grievance with tracking number."""
    tkt_num = generate_ticket_number(payload.category.value)
    ticket = ContactTicket(
        ticket_number=tkt_num,
        name=payload.name.strip(),
        email=payload.email.lower().strip(),
        phone=payload.phone.strip() if payload.phone else None,
        category=payload.category.value,
        subject=payload.subject.strip(),
        message=payload.message.strip(),
        status="OPEN",
    )
    db.add(ticket)
    await db.commit()
    await db.refresh(ticket)
    return ticket


@router.get("/notifications/my", response_model=List[NotificationResponse])
async def get_my_notifications(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Retrieve notifications for the authenticated athlete."""
    stmt = (
        select(Notification)
        .where(Notification.user_id == current_user.id)
        .order_by(Notification.created_at.desc())
        .limit(30)
    )
    res = await db.execute(stmt)
    notifications = list(res.scalars().all())
    return notifications
