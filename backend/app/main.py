"""Main FastAPI application entrypoint for Bharat Sports Grant."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.core.config import settings
from app.core.logging import logger
from app.core.errors import (
    AppError,
    app_error_handler,
    validation_error_handler,
    http_exception_handler,
    global_exception_handler,
)
from app.api.api import api_router


def create_application() -> FastAPI:
    """Application factory for Bharat Sports Grant API."""
    application = FastAPI(
        title=settings.APP_NAME,
        description="Core API gateway and services for Bharat Sports Grant (Sportsbridge India)",
        version="0.1.0",
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json",
    )

    # CORS Middleware
    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Global Exception Handlers
    application.add_exception_handler(AppError, app_error_handler)
    application.add_exception_handler(RequestValidationError, validation_error_handler)
    application.add_exception_handler(StarletteHTTPException, http_exception_handler)
    application.add_exception_handler(Exception, global_exception_handler)

    # Mount API routers
    application.include_router(api_router, prefix=settings.API_V1_PREFIX)

    @application.get("/", tags=["Root"])
    async def root_status():
        """Root API metadata."""
        return {
            "name": settings.APP_NAME,
            "status": "online",
            "environment": settings.ENVIRONMENT,
            "docs": "/docs",
        }

    logger.info("FastAPI application initialized in %s mode", settings.ENVIRONMENT)
    return application


app = create_application()
