"""Global exception handlers and structured error responses."""

from datetime import datetime, timezone
from fastapi import Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from app.core.logging import logger
from app.schemas.common import ApiErrorResponse, ErrorPayload, FieldErrorDetail


class AppError(Exception):
    """Base application domain exception."""
    def __init__(self, message: str, code: str = "APPLICATION_ERROR", status_code: int = 400):
        self.message = message
        self.code = code
        self.status_code = status_code
        super().__init__(message)


async def app_error_handler(request: Request, exc: AppError) -> JSONResponse:
    """Handles custom AppError domain exceptions."""
    logger.warning("Application error: %s (code: %s)", exc.message, exc.code)
    response_data = ApiErrorResponse(
        success=False,
        error=ErrorPayload(code=exc.code, message=exc.message),
        timestamp=datetime.now(timezone.utc).isoformat(),
    )
    return JSONResponse(status_code=exc.status_code, content=response_data.model_dump())


async def validation_error_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    """Handles Pydantic validation errors and converts to standard envelope."""
    details: list[FieldErrorDetail] = []
    for err in exc.errors():
        field = ".".join(str(loc) for loc in err.get("loc", []))
        issue = err.get("msg", "Invalid value")
        details.append(FieldErrorDetail(field=field, issue=issue))

    logger.info("Request validation failed: %d errors on %s", len(details), request.url.path)
    response_data = ApiErrorResponse(
        success=False,
        error=ErrorPayload(
            code="VALIDATION_ERROR",
            message="Request input validation failed. Please check submitted fields.",
            details=details,
        ),
        timestamp=datetime.now(timezone.utc).isoformat(),
    )
    return JSONResponse(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, content=response_data.model_dump())


async def http_exception_handler(request: Request, exc: StarletteHTTPException) -> JSONResponse:
    """Handles Starlette and FastAPI HTTP exceptions."""
    code_map = {
        400: "BAD_REQUEST",
        401: "UNAUTHORIZED",
        403: "FORBIDDEN",
        404: "NOT_FOUND",
        409: "CONFLICT",
        429: "TOO_MANY_REQUESTS",
    }
    code = code_map.get(exc.status_code, "HTTP_ERROR")
    response_data = ApiErrorResponse(
        success=False,
        error=ErrorPayload(code=code, message=str(exc.detail)),
        timestamp=datetime.now(timezone.utc).isoformat(),
    )
    return JSONResponse(status_code=exc.status_code, content=response_data.model_dump())


async def global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """Catch-all unhandled exception handler ensuring no internal stack traces leak."""
    logger.exception("Unhandled server exception encountered on %s", request.url.path)
    response_data = ApiErrorResponse(
        success=False,
        error=ErrorPayload(
            code="INTERNAL_SERVER_ERROR",
            message="An unexpected server error occurred. Please try again later.",
        ),
        timestamp=datetime.now(timezone.utc).isoformat(),
    )
    return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=response_data.model_dump())
