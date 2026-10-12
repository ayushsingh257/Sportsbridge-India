import React from "react";
import { BookOpen, Check, Layers, AlertCircle } from "lucide-react";

export default function GuidelinesPage() {
  const bands = [
    {
      level: "Inter-College & Zonal Level",
      funding: "Up to ₹2,00,000",
      criteria: "Representation in University first team or top-4 finish in inter-zonal university championship.",
      documents: ["College Bonafide Certificate", "University Sports Board Medal/Participation Certificate", "Valid Student ID"],
    },
    {
      level: "State Championship Level",
      funding: "Up to ₹4,50,000",
      criteria: "Podium finish (Gold, Silver, Bronze) or top-8 rank in recognized State Federation Championship in past 24 months.",
      documents: ["State Association Certificate", "Birth Certificate / Aadhar DOB verification", "Academy Coach Verification"],
    },
    {
      level: "National & Elite Pathways",
      funding: "Up to ₹12,00,000",
      criteria: "National championship qualification or Junior National medal in AFI, AAI, BFI, or affiliated bodies.",
      documents: ["National Federation Certificate", "Bio-passport/Age verification", "Yearly Training Expense Plan"],
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-white dark:bg-[#09090b] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Merit Evaluation Standards</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Scholarship Guidelines & Funding Bands
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Transparent breakdown of indicative financial tiers, competition categories, and mandatory verification evidence.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Illustrative Benchmark Disclosure:</strong> Funding bands are demonstration model figures designed for testing prototype allocations. Exact award limits for official schemes depend on authorized program endowments.
          </span>
        </div>

        <div className="space-y-6">
          {bands.map((band) => (
            <div
              key={band.level}
              className="p-6 rounded-2xl bg-zinc-50 dark:bg-[#121216] border border-zinc-200 dark:border-zinc-800 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  {band.level}
                </h2>
                <span className="badge-tag bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300 text-xs font-bold">
                  {band.funding}
                </span>
              </div>

              <div className="text-xs text-zinc-600 dark:text-zinc-300">
                <strong className="block text-zinc-900 dark:text-zinc-100 mb-1">Published Criterion:</strong>
                {band.criteria}
              </div>

              <div>
                <strong className="block text-xs text-zinc-900 dark:text-zinc-100 mb-2">Required Supporting Evidence:</strong>
                <ul className="space-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {band.documents.map((doc) => (
                    <li key={doc} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
