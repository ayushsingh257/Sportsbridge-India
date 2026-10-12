"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, Trophy, CheckCircle, ShieldCheck } from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";

export default function RegisterPage() {
  const router = useRouter();
  const { loginAsAthlete } = useAuth();
  const [step, setStep] = useState(1);

  const handleSimulateRegister = () => {
    loginAsAthlete();
    router.push("/dashboard");
  };

  return (
    <div className="py-12 md:py-20 min-h-[calc(100vh-5rem)] flex items-center justify-center bg-zinc-50/50 dark:bg-[#0c0c0e] px-4 transition-colors">
      <div className="w-full max-w-lg p-8 rounded-2xl bg-white dark:bg-[#121216] border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Trophy className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
            Athlete Registration Portal
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Multi-Step National Sports Scholarship Profile Creation
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between border-y border-zinc-100 dark:border-zinc-800 py-3 text-xs">
          <span className={`font-bold ${step === 1 ? "text-brand-600" : "text-zinc-400"}`}>
            1. Contact (+91 Phone)
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">→</span>
          <span className={`font-bold ${step === 2 ? "text-brand-600" : "text-zinc-400"}`}>
            2. Password
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">→</span>
          <span className={`font-bold ${step === 3 ? "text-brand-600" : "text-zinc-400"}`}>
            3. Sporting Details
          </span>
        </div>

        {/* Development Notice */}
        <div className="p-3.5 rounded-xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200/60 dark:border-brand-900/40 text-xs text-brand-900 dark:text-brand-200 space-y-2">
          <div className="font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-600" />
            <span>Phase 2 Architecture Preview</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Full 3-step registration with backend phone uniqueness, OTP validation, and Argon2 password hashing will be wired in <strong>Phase 4</strong>. Click below to simulate completing registration.
          </p>
          <button
            type="button"
            onClick={handleSimulateRegister}
            className="w-full py-2.5 px-3 rounded-lg text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-all"
          >
            Complete Demo Registration & Enter Dashboard
          </button>
        </div>

        <div className="text-center text-xs text-zinc-500 pt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-brand-600 font-semibold hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}
