/**
 * Core type definitions for Bharat Sports Grant frontend.
 */

export type UserRole =
  | "VISITOR"
  | "ATHLETE"
  | "VERIFIER"
  | "FINANCE_OFFICER"
  | "SCHOLARSHIP_ADMIN"
  | "SUPER_ADMIN";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: Array<{ field: string; issue: string }>;
  };
  timestamp: string;
}
