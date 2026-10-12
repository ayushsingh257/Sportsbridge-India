/**
 * Authentication API client service for communicating with FastAPI backend.
 */

import { ApiResponse, UserRole } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: {
    id: string;
    email: string;
    phone: string;
    role: UserRole;
    is_email_verified: boolean;
    is_phone_verified: boolean;
    is_active: boolean;
    created_at: string;
  };
}

export async function loginUser(identifier: string, password: string): Promise<ApiResponse<AuthTokens>> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });
    return await res.json();
  } catch (error) {
    return {
      success: false,
      error: {
        code: "NETWORK_ERROR",
        message: "Failed to connect to authentication server.",
      },
      timestamp: new Date().toISOString(),
    };
  }
}

export async function registerUser(
  email: string,
  phone: string,
  password: string,
  role: UserRole = "ATHLETE",
): Promise<ApiResponse<AuthTokens>> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phone, password, role }),
    });
    return await res.json();
  } catch (error) {
    return {
      success: false,
      error: {
        code: "NETWORK_ERROR",
        message: "Failed to connect to registration server.",
      },
      timestamp: new Date().toISOString(),
    };
  }
}

export async function verifyOTP(identifier: string, otp_code: string): Promise<ApiResponse<{ verified: boolean }>> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, otp_code }),
    });
    return await res.json();
  } catch (error) {
    return {
      success: false,
      error: {
        code: "NETWORK_ERROR",
        message: "Failed to connect to verification server.",
      },
      timestamp: new Date().toISOString(),
    };
  }
}
