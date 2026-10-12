"""API Router registration for /api/v1."""

from fastapi import APIRouter
from app.api.routes import health, auth

api_router = APIRouter()
api_router.include_router(health.router)
api_router.include_router(auth.router)
