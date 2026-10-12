"""Eligibility and Sports Catalogue API Routes."""

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.db.session import get_db
from app.models.sport import Sport, ScholarshipProgram
from app.schemas.sports import (
    SportResponse,
    ScholarshipProgramResponse,
    EligibilityEvaluationRequest,
    EligibilityEvaluationResult,
)
from app.rules_engine.evaluator import EligibilityRulesEngine

router = APIRouter(prefix="/eligibility", tags=["Eligibility & Catalogue"])


@router.post("/evaluate", response_model=EligibilityEvaluationResult)
async def evaluate_eligibility(payload: EligibilityEvaluationRequest):
    """Authoritative server-side evaluation of athlete criteria."""
    result = EligibilityRulesEngine.evaluate(payload)
    return result


@router.get("/sports", response_model=List[SportResponse])
async def list_sports(db: AsyncSession = Depends(get_db)):
    """List all supported sports in the catalog."""
    stmt = select(Sport).where(Sport.is_active == True)
    result = await db.execute(stmt)
    sports = result.scalars().all()
    return sports


@router.get("/programs", response_model=List[ScholarshipProgramResponse])
async def list_scholarships(db: AsyncSession = Depends(get_db)):
    """List all available scholarship programs."""
    stmt = select(ScholarshipProgram).where(ScholarshipProgram.is_active == True)
    result = await db.execute(stmt)
    programs = result.scalars().all()
    return programs
