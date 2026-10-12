"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Award } from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";

export function HeroSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-red-50/60 via-white to-white dark:from-[#13070a]/40 dark:via-[#09090b] dark:to-[#09090b] transition-colors">
      {/* Background Subtle Accent Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-red-500/10 via-brand-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Mission Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100/80 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 text-brand-700 dark:text-brand-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span>Equal Opportunity Indian Sports Scholarship Portal</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
              Your Talent Deserves a Chance.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-rose-600 to-red-700">
                Your Financial Situation
              </span>{" "}
              Shouldn&apos;t Decide Your Future.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Bharat Sports Grant empowers emerging athletes across India to access structured financial
              backing for coaching, specialized equipment, academy fees, competition travel, and sports science support.
              Assessed strictly on published merit—not personal background.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href={isAuthenticated ? "/eligibility" : "/login?redirect=/eligibility"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-600/30 hover:shadow-lg hover:shadow-brand-600/40 transition-all active:scale-[0.98]"
              >
                <span>Check Eligibility</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#sports-catalogue"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 shadow-sm transition-all"
              >
                <span>Explore 14+ Sports</span>
              </Link>
              <Link
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-zinc-600 dark:text-zinc-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                <span>Learn How It Works</span>
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Published Objective Criteria
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                Strict Identity & Document Privacy
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Dedicated Expense Ledger
              </span>
            </div>
          </div>

          {/* Interactive Feature Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md rounded-2xl border border-red-100 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 shadow-xl shadow-zinc-200/50 dark:shadow-black/60 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Live Portal Overview
                  </span>
                </div>
                <span className="badge-tag bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200/50 dark:border-brand-900">
                  Merit Ledger
                </span>
              </div>

              {/* Sample Athlete Grant Card Preview */}
              <div className="py-5 space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-red-50 to-rose-50/50 dark:from-zinc-800 dark:to-zinc-800/50 border border-red-100 dark:border-zinc-700">
                  <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                    <span>Approved Pathway Allocation</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Audited</span>
                  </div>
                  <div className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                    ₹3,50,000 <span className="text-xs font-normal text-zinc-500">INR</span>
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                    State Championship Archery Grant • Year 2026–27
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-500 block">Available Balance</span>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">₹2,80,000</span>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                    <span className="text-zinc-500 block">Released (Disbursed)</span>
                    <span className="font-bold text-brand-600 dark:text-brand-400 text-sm">₹70,000</span>
                  </div>
                </div>

                <div className="space-y-2 pt-1 text-xs">
                  <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-400">
                    <span>Recent Claim: Tournament Target Set</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">₹30,000</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-brand-600 h-full rounded-full" style={{ width: "20%" }} />
                  </div>
                  <div className="flex justify-between text-[11px] text-zinc-400">
                    <span>Category: Equipment</span>
                    <span>Status: Disbursed</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-zinc-800 text-center">
                <p className="text-[11px] text-zinc-400">
                  Controlled double-entry balance arithmetic prevents over-release.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
