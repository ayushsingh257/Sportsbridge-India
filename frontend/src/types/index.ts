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

export interface SportItem {
  id: string;
  code: string;
  name: string;
  category: "Olympic" | "Commonwealth" | "National" | "Racquet" | "Combat" | "Team";
  tagline: string;
  description: string;
  iconName: string;
  sampleFundingRange: string;
  activePathwaysCount: number;
  featured: boolean;
}

export interface ScholarshipProgram {
  id: string;
  code: string;
  title: string;
  sport: string;
  targetLevel: string;
  fundingMin: number;
  fundingMax: number;
  fundingFormatted: string;
  coveredExpenses: string[];
  eligibilitySnippet: string;
  deadline: string;
  status: "OPEN" | "CLOSING_SOON" | "UPCOMING";
}

export interface PlatformStat {
  label: string;
  value: string;
  numericTarget: number;
  description: string;
  isDemonstrationData: boolean;
}

export interface PartnerOrg {
  id: string;
  name: string;
  type: "Sports Academy" | "State Sports University" | "Performance Center" | "Sports Medicine Clinic";
  city: string;
  state: string;
  isDemonstrationRecord: boolean;
}
