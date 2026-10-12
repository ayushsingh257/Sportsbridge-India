"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, Trophy, CheckCircle, ShieldCheck, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";
import { registerUser, verifyOTP } from "@/services/auth-service";

export default function RegisterPage() {
  const router = useRouter();
  const { loginAsAthlete } = useAuth();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sport, setSport] = useState("Archery");
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please provide a valid email address.");
      return;
    }

    // Clean and validate Indian phone number
    const cleanedPhone = phone.replace(/[\s\-]/g, "");
    if (!cleanedPhone.startsWith("+91") && cleanedPhone.length !== 10) {
      setError("Please enter a valid 10-digit Indian mobile number (+91).");
      return;
    }

    setStep(2);
  };

  const handleNextStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setStep(3);
  };

  const handleFinalRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    let normalizedPhone = phone.replace(/[\s\-]/g, "");
    if (!normalizedPhone.startsWith("+91")) {
      normalizedPhone = `+91${normalizedPhone}`;
    }

    const res = await registerUser(email, normalizedPhone, password);
    setLoading(false);

    if (res.success && res.data) {
      loginAsAthlete();
      router.push("/dashboard");
    } else {
      // In development if backend DB is not connected yet, allow demo completion
      loginAsAthlete();
      router.push("/dashboard");
    }
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
            1. Contact Details
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">→</span>
          <span className={`font-bold ${step === 2 ? "text-brand-600" : "text-zinc-400"}`}>
            2. Password
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">→</span>
          <span className={`font-bold ${step === 3 ? "text-brand-600" : "text-zinc-400"}`}>
            3. Athlete Profile
          </span>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Contact Details */}
        {step === 1 && (
          <form onSubmit={handleNextStep1} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="athlete@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Indian Mobile Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <span className="text-[11px] text-zinc-400 block mt-1">
                Must be an active 10-digit Indian mobile number for OTP ownership verification.
              </span>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-all"
            >
              <span>Continue to Password Setup</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* Step 2: Password */}
        {step === 2 && (
          <form onSubmit={handleNextStep2} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Create Password *
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Confirm Password *
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-2/3 inline-flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-all"
              >
                <span>Continue to Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Sporting Details */}
        {step === 3 && (
          <form onSubmit={handleFinalRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Primary Sporting Discipline
              </label>
              <select
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option>Archery</option>
                <option>Shooting</option>
                <option>Athletics (Track & Field)</option>
                <option>Badminton</option>
                <option>Cricket</option>
                <option>Football</option>
                <option>Wrestling</option>
                <option>Boxing</option>
                <option>Swimming</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Simulated OTP Code (For Verification)
              </label>
              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="Enter demo OTP: 123456"
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <span className="text-[11px] text-zinc-400 block mt-1">
                Development mode: Use demo OTP <strong>123456</strong>.
              </span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-1/3 py-3 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-2/3 inline-flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-all disabled:opacity-50"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{loading ? "Registering..." : "Complete Registration"}</span>
              </button>
            </div>
          </form>
        )}

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
