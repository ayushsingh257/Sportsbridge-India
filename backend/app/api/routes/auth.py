"""Authentication and registration API endpoints."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.repositories.user_repo import UserRepository
from app.schemas.auth import (
    UserRegisterRequest,
    UserLoginRequest,
    TokenResponse,
    TokenRefreshRequest,
    UserResponse,
    OTPVerifyRequest,
)
from app.schemas.common import ApiResponse
from app.security.auth import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
    decode_token,
    get_current_user,
)
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Authentication & Access Control"])


@router.post("/register", response_model=ApiResponse[TokenResponse], status_code=status.HTTP_201_CREATED)
async def register_athlete(
    payload: UserRegisterRequest,
    db: AsyncSession = Depends(get_db),
) -> ApiResponse[TokenResponse]:
    """Registers a new athlete account with unique email and Indian phone validation."""
    user_repo = UserRepository(db)

    # Check email uniqueness
    existing_email = await user_repo.get_by_email(payload.email)
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email address already exists.",
        )

    # Check phone uniqueness
    existing_phone = await user_repo.get_by_phone(payload.phone)
    if existing_phone:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this Indian mobile number already exists.",
        )

    # Hash password securely
    hashed_pw = hash_password(payload.password)

    # Create user
    user = await user_repo.create_user(
        email=payload.email,
        phone=payload.phone,
        password_hash=hashed_pw,
        role=payload.role.value,
    )

    # Issue JWT tokens
    access_token = create_access_token(subject=str(user.id), role=user.role)
    refresh_token = create_refresh_token(subject=str(user.id))

    token_data = TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
        user=UserResponse.model_validate(user),
    )

    return ApiResponse(
        success=True,
        data=token_data,
        message="Athlete registration completed successfully.",
    )


@router.post("/login", response_model=ApiResponse[TokenResponse])
async def login(
    payload: UserLoginRequest,
    db: AsyncSession = Depends(get_db),
) -> ApiResponse[TokenResponse]:
    """Authenticates an athlete or administrator by email or phone and password."""
    user_repo = UserRepository(db)
    user = await user_repo.get_by_identifier(payload.identifier)

    # Generic error message to prevent account enumeration
    invalid_creds_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid credentials. Please verify your email/phone and password.",
    )

    if not user:
        raise invalid_creds_error

    if not verify_password(payload.password, user.password_hash):
        raise invalid_creds_error

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is deactivated. Please contact support.",
        )

    access_token = create_access_token(subject=str(user.id), role=user.role)
    refresh_token = create_refresh_token(subject=str(user.id))

    token_data = TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
        user=UserResponse.model_validate(user),
    )

    return ApiResponse(
        success=True,
        data=token_data,
        message="Authentication successful.",
    )


@router.post("/refresh", response_model=ApiResponse[TokenResponse])
async def refresh_access_token(
    payload: TokenRefreshRequest,
    db: AsyncSession = Depends(get_db),
) -> ApiResponse[TokenResponse]:
    """Refreshes expired access token using a valid refresh token."""
    decoded = decode_token(payload.refresh_token)
    if decoded.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token type for refresh endpoint.",
        )

    user_id = decoded.get("sub")
    user_repo = UserRepository(db)
    user = await user_repo.get_by_id(user_id)

    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User session invalid or deactivated.",
        )

    new_access = create_access_token(subject=str(user.id), role=user.role)
    new_refresh = create_refresh_token(subject=str(user.id))

    token_data = TokenResponse(
        access_token=new_access,
        refresh_token=new_refresh,
        token_type="bearer",
        user=UserResponse.model_validate(user),
    )

    return ApiResponse(
        success=True,
        data=token_data,
        message="Tokens refreshed successfully.",
    )


@router.get("/me", response_model=ApiResponse[UserResponse])
async def get_current_user_profile(
    current_user: User = Depends(get_current_user),
) -> ApiResponse[UserResponse]:
    """Retrieves current authenticated athlete's account details."""
    return ApiResponse(
        success=True,
        data=UserResponse.model_validate(current_user),
        message="Profile retrieved.",
    )


@router.post("/verify-otp", response_model=ApiResponse[dict])
async def verify_otp_dev_flow(
    payload: OTPVerifyRequest,
    db: AsyncSession = Depends(get_db),
) -> ApiResponse[dict]:
    """Simulated OTP verification for Indian phone or email during development."""
    user_repo = UserRepository(db)
    user = await user_repo.get_by_identifier(payload.identifier)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Account not found for provided contact identifier.",
        )

    # In development prototype, accepting standard demo OTP '123456'
    if payload.otp_code != "123456":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid OTP code. For development prototype, use demo OTP: 123456",
        )

    await user_repo.mark_phone_verified(user.id)

    return ApiResponse(
        success=True,
        data={"verified": True, "identifier": payload.identifier},
        message="Phone contact successfully verified.",
    )
