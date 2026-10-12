"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SPORTS_CATALOGUE } from "@/data/mock-data";
import { ArrowRight, Trophy, Sparkles } from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";

export function SportsDiscovery() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const { isAuthenticated } = useAuth();

  const categories = ["All", "Olympic", "Team", "Racquet", "Combat"];

  const filteredSports =
    activeCategory === "All"
      ? SPORTS_CATALOGUE
      : SPORTS_CATALOGUE.filter((s) => s.category === activeCategory);

  return (
    <section id="sports-catalogue" className="py-16 md:py-24 bg-zinc-50/50 dark:bg-[#0c0c0e] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Trophy className="w-3.5 h-3.5" />
              <span>Multi-Sport Merit Catalogue</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Supported Sports Disciplines
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl">
              Explore 14+ recognized sports with transparent scholarship pathways, published age guidelines,
              and verifiable achievement prerequisites.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm self-start md:self-end">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sports Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSports.map((sport) => (
            <div
              key={sport.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-[#121216] border border-zinc-100 dark:border-zinc-800/80 shadow-sm hover:shadow-card-hover hover:border-brand-200 dark:hover:border-red-950 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="badge-tag bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 text-[11px]">
                    {sport.category}
                  </span>
                  <span className="text-[11px] font-medium text-brand-600 dark:text-brand-400">
                    {sport.activePathwaysCount} active schemes
                  </span>
                </div>

                <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {sport.name}
                </h3>
                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-1 mb-2">
                  {sport.tagline}
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  {sport.description}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Indicative Funding</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">
                    {sport.sampleFundingRange}
                  </span>
                </div>

                <Link
                  href={
                    isAuthenticated
                      ? `/eligibility?sport=${sport.code}`
                      : `/login?redirect=/eligibility?sport=${sport.code}`
                  }
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold text-zinc-800 dark:text-zinc-200 bg-red-50/70 dark:bg-zinc-800/60 hover:bg-brand-600 hover:text-white dark:hover:bg-brand-600 dark:hover:text-white border border-red-100 dark:border-zinc-700 transition-all"
                >
                  <span>Check Eligibility</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
