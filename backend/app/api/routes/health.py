"""Health check and telemetry endpoints."""

from fastapi import APIRouter
from app.core.config import settings
from app.db.session import check_db_health
from app.schemas.common import ApiResponse, HealthData

router = APIRouter(tags=["Health & Monitoring"])


@router.get("/health", response_model=ApiResponse[HealthData])
async def get_health_status() -> ApiResponse[HealthData]:
    """Retrieves operational status and service dependencies."""
    db_status = await check_db_health()

    health_info = HealthData(
        status="healthy",
        environment=settings.ENVIRONMENT,
        database=db_status,
        version="0.1.0",
    )

    return ApiResponse(
        success=True,
        data=health_info,
        message="System services operational",
    )
