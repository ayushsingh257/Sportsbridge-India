"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserRole } from "@/types";

export interface AthleteUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
}

interface AuthContextType {
  user: AthleteUser | null;
  isAuthenticated: boolean;
  loginAsAthlete: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AthleteUser | null>(null);

  useEffect(() => {
    // Check if session was saved in sessionStorage for demo testing
    const stored = sessionStorage.getItem("demo_auth_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        sessionStorage.removeItem("demo_auth_user");
      }
    }
  }, []);

  const loginAsAthlete = () => {
    const demoAthlete: AthleteUser = {
      id: "ath_demo_001",
      name: "Rohan Verma",
      email: "rohan.verma@example.in",
      phone: "+91 9876543210",
      role: "ATHLETE",
    };
    setUser(demoAthlete);
    sessionStorage.setItem("demo_auth_user", JSON.stringify(demoAthlete));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("demo_auth_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginAsAthlete,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
