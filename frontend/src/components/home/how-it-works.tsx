import React from "react";
import { HOW_IT_WORKS_STEPS } from "@/data/mock-data";
import { AlertCircle, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white dark:bg-[#09090b] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Transparent 9-Step Lifecycle</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            How Bharat Sports Grant Operates
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2">
            From registration and merit evaluation to controlled expense reimbursements through our audited ledger.
          </p>

          {/* Mandatory Disclaimer Alert */}
          <div className="mt-4 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2.5 text-left">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Crucial Transparency Rule:</strong> Preliminary eligibility assessment indicates only that initial criteria are satisfied.
              It does <em>not</em> guarantee a final scholarship allocation until human verifiers confirm sports certificates and age proofs.
            </span>
          </div>
        </div>

        {/* 9-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div
              key={step.step}
              className="relative p-6 rounded-2xl bg-zinc-50/70 dark:bg-[#121216]/60 border border-zinc-100 dark:border-zinc-800/80 hover:border-red-200 dark:hover:border-zinc-700 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-600 text-white font-black text-lg flex items-center justify-center shadow-sm">
                  {step.step}
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  Step {step.step} of 9
                </span>
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1.5">
                {step.title}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Next Step Call to Action */}
        <div className="mt-12 text-center">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-all"
          >
            <span>Start Your Application Today</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
