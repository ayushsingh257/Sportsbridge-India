"""API Router registration for /api/v1."""

from fastapi import APIRouter
from app.api.routes import health, auth, athletes, eligibility

api_router = APIRouter()
api_router.include_router(health.router)
api_router.include_router(auth.router)
api_router.include_router(athletes.router)
api_router.include_router(eligibility.router)
