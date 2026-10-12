"use client";

import React from "react";
import Link from "next/link";
import { SPORTS_CATALOGUE } from "@/data/mock-data";
import { useAuth } from "@/components/auth/auth-context";
import { Trophy, AlertCircle, ArrowRight, ShieldCheck, LogIn } from "lucide-react";

export default function EligibilitySelectionPage() {
  const { isAuthenticated, user, loginAsAthlete } = useAuth();

  return (
    <div className="py-12 md:py-20 bg-zinc-50/50 dark:bg-[#0c0c0e] min-h-[calc(100vh-5rem)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            <span>Sports Selection Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Check Your Sports Scholarship Eligibility
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Select your competitive sporting discipline below to review published age, competition level, and performance criteria.
          </p>
        </div>

        {/* Authentication Notice Banner */}
        {!isAuthenticated ? (
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-brand-200 dark:border-brand-900/60 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-brand-600 dark:text-brand-400 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Account Registration Required for Application Submission
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Per platform governance rules, athletes must create or log into a verified account before an authoritative eligibility application can be registered.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 self-stretch sm:self-auto flex-shrink-0">
              <Link
                href="/login?redirect=/eligibility"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In</span>
              </Link>
              <button
                type="button"
                onClick={loginAsAthlete}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 transition-colors shadow-sm"
              >
                <span>Demo Athlete Sign-In</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-200">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>
                Authenticated as <strong>{user?.name}</strong> ({user?.phone}). You are authorized to select a pathway and proceed.
              </span>
            </div>
            <span className="font-semibold text-emerald-700 dark:text-emerald-300">
              Session Active
            </span>
          </div>
        )}

        {/* Sports Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SPORTS_CATALOGUE.map((sport) => (
            <div
              key={sport.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-zinc-100 dark:border-zinc-800/80 shadow-sm hover:border-brand-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="badge-tag bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 text-[10px]">
                    {sport.category}
                  </span>
                  <span className="text-[11px] font-semibold text-brand-600 dark:text-brand-400">
                    {sport.activePathwaysCount} Schemes
                  </span>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  {sport.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mb-2">
                  {sport.tagline}
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  {sport.description}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
                <div className="text-xs">
                  <span className="text-zinc-500 block">Indicative Funding</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">
                    {sport.sampleFundingRange}
                  </span>
                </div>

                {isAuthenticated ? (
                  <button
                    type="button"
                    onClick={() => {
                      alert(`Sport pathway selected: ${sport.name}. The complete backend rules evaluation engine will be implemented in Phase 6.`);
                    }}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-all"
                  >
                    <span>Assess {sport.name} Criteria</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <Link
                    href={`/login?redirect=/eligibility?sport=${sport.code}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-zinc-800 dark:text-zinc-200 bg-red-50/70 dark:bg-zinc-800 hover:bg-brand-600 hover:text-white transition-all"
                  >
                    <span>Log In to Check</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
