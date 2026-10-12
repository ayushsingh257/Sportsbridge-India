import React from "react";
import { PLATFORM_STATS } from "@/data/mock-data";
import { Info } from "lucide-react";

export function StatsSection() {
  return (
    <section className="py-12 bg-white dark:bg-[#09090b] border-y border-zinc-100 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Platform Impact & Coverage
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              National reach across grassroots, inter-college, and elite competition levels.
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs border border-amber-200 dark:border-amber-900/40">
            <Info className="w-3.5 h-3.5" />
            <span>Figures labelled with asterisk (*) are demonstration data</span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PLATFORM_STATS.map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-xl bg-zinc-50/70 dark:bg-[#121216]/60 border border-zinc-100 dark:border-zinc-800/80 hover:border-red-200 dark:hover:border-zinc-700 transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-brand-600 dark:text-brand-500 tracking-tight">
                {stat.value}
                {stat.isDemonstrationData && (
                  <span className="text-sm align-top text-amber-600 dark:text-amber-400 font-normal ml-0.5">
                    *
                  </span>
                )}
              </div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-1">
                {stat.label}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-snug">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
