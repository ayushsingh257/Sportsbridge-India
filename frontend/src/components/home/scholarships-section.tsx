import React from "react";
import Link from "next/link";
import { SCHOLARSHIP_PROGRAMS } from "@/data/mock-data";
import { Calendar, Tag, Check, ArrowRight } from "lucide-react";

export function ScholarshipsSection() {
  return (
    <section className="py-16 md:py-24 bg-zinc-50/50 dark:bg-[#0c0c0e] border-t border-zinc-100 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Tag className="w-3.5 h-3.5" />
              <span>Published Grant Pathways</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Active Scholarship Opportunities
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl">
              Each scholarship scheme features discrete funding caps, tailored expense categories, and specialized evaluation criteria.
            </p>
          </div>
          <Link
            href="/eligibility"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
          >
            <span>View All Programs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SCHOLARSHIP_PROGRAMS.map((prog) => (
            <div
              key={prog.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-zinc-100 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="badge-tag bg-red-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300">
                    {prog.sport}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500 font-mono">{prog.code}</span>
                    <span
                      className={`badge-tag text-[10px] ${
                        prog.status === "CLOSING_SOON"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                          : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                      }`}
                    >
                      {prog.status === "CLOSING_SOON" ? "Closing Soon" : "Open for Assessment"}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">
                  {prog.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                  Target Competition: <strong className="text-zinc-700 dark:text-zinc-300">{prog.targetLevel}</strong>
                </p>

                <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">Indicative Allocation Cap</span>
                    <span className="font-extrabold text-base text-zinc-900 dark:text-white">
                      {prog.fundingFormatted}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    Released incrementally for approved coaching, equipment & travel expenses.
                  </p>
                </div>

                <div className="space-y-2 mb-4">
                  <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Approved Expense Coverage:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {prog.coveredExpenses.map((exp) => (
                      <span
                        key={exp}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                      >
                        <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 italic mb-4">
                  &quot;{prog.eligibilitySnippet}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                  <Calendar className="w-3.5 h-3.5 text-brand-600" />
                  <span>Deadline: {prog.deadline}</span>
                </div>
                <Link
                  href={`/eligibility?program=${prog.code}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 px-3.5 py-1.5 rounded-lg transition-colors shadow-sm"
                >
                  <span>Apply Pathway</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
