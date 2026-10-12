"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn, Trophy, ArrowRight, ShieldCheck, UserCheck, AlertCircle } from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";
import { loginUser } from "@/services/auth-service";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const { loginAsAthlete, isAuthenticated } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim() || !password) {
      setError("Please provide your email/phone and password.");
      return;
    }

    setLoading(true);
    const res = await loginUser(identifier.trim(), password);
    setLoading(false);

    if (res.success && res.data) {
      loginAsAthlete();
      router.push(redirect);
    } else {
      // If network is offline during dev, inform the user or permit demo session
      setError(res.error?.message || "Invalid credentials. For local dev demo, use the Instant Athlete Sign-In button.");
    }
  };

  const handleDemoLogin = () => {
    loginAsAthlete();
    router.push(redirect);
  };

  return (
    <div className="w-full max-w-md p-8 rounded-2xl bg-white dark:bg-[#121216] border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center mx-auto shadow-md">
          <Trophy className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
          Athlete Portal Sign-In
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Access your scholarship applications, documents, and expense requests.
        </p>
      </div>

      {isAuthenticated ? (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-center space-y-3">
          <UserCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
          <div className="text-xs text-emerald-900 dark:text-emerald-200">
            You are currently logged in as an active athlete.
          </div>
          <Link
            href={redirect}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm"
          >
            <span>Continue to Destination</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Email Address or Indian Mobile Number
              </label>
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="athlete@example.in or +91 9876543210"
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-all disabled:opacity-50"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{loading ? "Authenticating..." : "Sign In to Portal"}</span>
            </button>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800" />
            <span className="flex-shrink mx-3 text-[11px] text-zinc-400 uppercase">Or Demo Access</span>
            <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800" />
          </div>

          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 border border-dashed border-brand-300 hover:bg-red-50/50 dark:hover:bg-zinc-800 transition-colors"
          >
            Instant Athlete Sign-In (Demo Profile)
          </button>

          <div className="text-center text-xs text-zinc-500 pt-2">
            Don&apos;t have an athlete account?{" "}
            <Link href="/register" className="text-brand-600 font-semibold hover:underline">
              Register here
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="py-12 md:py-20 min-h-[calc(100vh-5rem)] flex items-center justify-center bg-zinc-50/50 dark:bg-[#0c0c0e] px-4 transition-colors">
      <Suspense fallback={<div className="text-xs text-zinc-500">Loading portal...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
