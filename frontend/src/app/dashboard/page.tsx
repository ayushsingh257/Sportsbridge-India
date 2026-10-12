"use client";

import React from "react";
import Link from "next/link";
import { User, ShieldCheck, Trophy, Layers, Clock, FileText, ArrowRight } from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";

export default function DashboardPage() {
  const { user, isAuthenticated, loginAsAthlete } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="py-20 max-w-lg mx-auto text-center px-4 space-y-4">
        <div className="w-12 h-12 rounded-xl bg-red-100 text-brand-600 flex items-center justify-center mx-auto">
          <User className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Sign In to Access Athlete Dashboard
        </h1>
        <p className="text-xs text-zinc-500">
          The dashboard is restricted to authenticated athletes. You can simulate signing in below.
        </p>
        <button
          type="button"
          onClick={loginAsAthlete}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm"
        >
          Sign In as Demo Athlete
        </button>
      </div>
    );
  }

  return (
    <div className="py-10 md:py-16 bg-zinc-50/50 dark:bg-[#0c0c0e] min-h-[calc(100vh-5rem)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Athlete Overview Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-600 text-white font-black text-2xl flex items-center justify-center shadow-md">
              <User className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {user?.name}
                </h1>
                <span className="badge-tag bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[11px]">
                  Verified Phone
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {user?.email} • {user?.phone} • Karnataka, India
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/eligibility"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-all"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Apply for New Grant</span>
            </Link>
          </div>
        </div>

        {/* Dashboard Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications Status */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-[#121216] border border-zinc-200 dark:border-zinc-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-600" />
                <span>My Scholarship Applications</span>
              </h2>
              <span className="text-xs text-zinc-400 font-medium">1 Application</span>
            </div>

            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-900 dark:text-white">
                  State Archery Development Grant (BSG-2026-ARCH-0012)
                </span>
                <span className="badge-tag bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 text-[10px]">
                  Verification Pending
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Preliminary score: 85/100 • Submitted on 10 Oct 2026 • Assigned to State Archery Reviewer
              </p>
            </div>
          </div>

          {/* Ledger Summary */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-zinc-200 dark:border-zinc-800 space-y-4">
            <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Scholarship Ledger</span>
            </h2>
            <div className="p-4 rounded-xl bg-red-50/60 dark:bg-zinc-800/50 border border-red-100 dark:border-zinc-700 space-y-2">
              <span className="text-xs text-zinc-500 block">Total Approved Allocation</span>
              <span className="text-2xl font-black text-zinc-900 dark:text-white">₹3,50,000</span>
              <div className="pt-2 flex justify-between text-xs text-zinc-600 dark:text-zinc-300 border-t border-red-100 dark:border-zinc-700">
                <span>Available: <strong>₹2,80,000</strong></span>
                <span>Released: <strong>₹70,000</strong></span>
              </div>
            </div>
            <p className="text-[11px] text-zinc-400">
              Complete expense reimbursement workflows and balance ledger management will be wired in Phase 8.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
