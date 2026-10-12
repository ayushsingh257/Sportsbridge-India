"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  LogIn,
  Trophy,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";
import { loginUser } from "@/services/auth-service";
import { ShaderBackground } from "@/components/ui/213";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const { loginAsAthlete, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Both email and phone number are strictly required
    if (!email.trim() || !phone.trim() || !password) {
      setError("Both Email Address and Phone Number are required along with your password.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    // Use email as primary credential
    const res = await loginUser(email.trim(), password);
    setLoading(false);

    if (res.success && res.data) {
      loginAsAthlete();
      router.push(redirect);
    } else {
      setError(
        res.error?.message ||
          "Invalid credentials. For local demonstration, use the Instant Athlete Sign-In button below."
      );
    }
  };

  const handleDemoLogin = () => {
    loginAsAthlete();
    router.push(redirect);
  };

  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* LEFT COLUMN: Overview & Assistance Cards (matching reference design) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold uppercase tracking-wider">
            <span>ATHLETE PORTAL</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            Athlete Sign-In
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Access your national scholarship grants, upload competition certificates, and manage your verified financial reimbursement ledger.
          </p>
        </div>

        {/* Info Cards (matching reference layout) */}
        <div className="space-y-3.5">
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#121216]/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex items-center gap-4 transition-all hover:border-brand-300">
            <div className="w-11 h-11 rounded-xl bg-red-50 dark:bg-red-950/50 text-brand-600 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-400 block">
                EMAIL SUPPORT
              </span>
              <strong className="text-xs text-zinc-800 dark:text-zinc-200 block">
                support@sportsbridge.org.in
              </strong>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#121216]/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex items-center gap-4 transition-all hover:border-brand-300">
            <div className="w-11 h-11 rounded-xl bg-red-50 dark:bg-red-950/50 text-brand-600 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-400 block">
                ATHLETE HELPLINE
              </span>
              <strong className="text-xs text-zinc-800 dark:text-zinc-200 block">
                +91 1800-SPORTS-IN (Toll-Free)
              </strong>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#121216]/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex items-center gap-4 transition-all hover:border-brand-300">
            <div className="w-11 h-11 rounded-xl bg-red-50 dark:bg-red-950/50 text-brand-600 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-400 block">
                GRANT HEADQUARTERS
              </span>
              <strong className="text-xs text-zinc-800 dark:text-zinc-200 block">
                Bengaluru / New Delhi, India
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Sign In Form Box (matching Send Us A Message container in reference image) */}
      <div className="lg:col-span-7">
        <div className="p-8 sm:p-10 rounded-3xl bg-white/95 dark:bg-[#121216]/90 backdrop-blur-xl border border-white/80 dark:border-zinc-800/80 shadow-2xl space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
              Sign In To Your Account
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Please enter your registered credentials to access your athlete dashboard.
            </p>
          </div>

          {isAuthenticated ? (
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-center space-y-3">
              <UserCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <div className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">
                You are currently logged in as an active athlete.
              </div>
              <Link
                href={redirect}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm"
              >
                <span>Continue to Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* SEPARATE BOX 1: EMAIL */}
              <div>
                <label className="block text-[11px] font-bold tracking-wider text-zinc-700 dark:text-zinc-300 uppercase mb-1.5">
                  EMAIL <span className="text-brand-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="athlete@example.in"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                />
              </div>

              {/* SEPARATE BOX 2: PHONE NUMBER */}
              <div>
                <label className="block text-[11px] font-bold tracking-wider text-zinc-700 dark:text-zinc-300 uppercase mb-1.5">
                  PHONE NUMBER <span className="text-brand-600">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 XXXXXXXXXX"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                />
              </div>

              {/* BOX 3: PASSWORD */}
              <div>
                <label className="block text-[11px] font-bold tracking-wider text-zinc-700 dark:text-zinc-300 uppercase mb-1.5">
                  PASSWORD <span className="text-brand-600">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                />
              </div>

              {/* SUBMIT BUTTON (styled with Send icon like reference image) */}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md transition-all active:scale-[0.99] disabled:opacity-50"
              >
                <span>{loading ? "Authenticating..." : "Sign In to Portal"}</span>
                <Send className="w-4 h-4" />
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800" />
                <span className="flex-shrink mx-3 text-[10px] text-zinc-400 uppercase font-semibold">
                  Or Instant Demo Access
                </span>
                <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800" />
              </div>

              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 border border-dashed border-brand-300 hover:bg-red-50/50 dark:hover:bg-zinc-800 transition-colors"
              >
                Instant Athlete Sign-In (Demo Profile)
              </button>

              <div className="text-center text-xs text-zinc-500 pt-1">
                Don&apos;t have an athlete account?{" "}
                <Link href="/register" className="text-brand-600 font-semibold hover:underline">
                  Register here
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-12 md:py-20 transition-colors">
      {/* Dynamic 21st.dev Mesh Drift Shader Background */}
      <div className="absolute inset-0 pointer-events-none opacity-90 dark:opacity-75">
        <ShaderBackground className="h-full w-full" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/40 dark:from-black/40 dark:via-transparent dark:to-black/50 pointer-events-none" />

      <div className="relative z-10 w-full">
        <Suspense fallback={<div className="text-xs text-zinc-500 text-center">Loading portal...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
