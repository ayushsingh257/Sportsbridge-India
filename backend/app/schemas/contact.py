"""Schemas for Contact, Grievance tickets, and Notifications."""

import uuid
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from app.models.contact import TicketCategory


class ContactTicketCreateRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=20)
    category: TicketCategory = TicketCategory.GENERAL
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)


class ContactTicketResponse(BaseModel):
    id: uuid.UUID
    ticket_number: str
    name: str
    email: str
    phone: Optional[str] = None
    category: str
    subject: str
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class NotificationResponse(BaseModel):
    id: uuid.UUID
    title: str
    message: str
    notification_type: str
    is_read: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
