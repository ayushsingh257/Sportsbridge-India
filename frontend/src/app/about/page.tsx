import React from "react";
import { Shield, Target, Users, Award, HeartHandshake } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20 bg-white dark:bg-[#09090b] transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold uppercase tracking-wider">
            <span>Our Foundation & Vision</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            About Bharat Sports Grant
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Bridging the gap between grassroots athletic potential and elite performance funding across India.
          </p>
        </div>

        {/* Core Mission Card */}
        <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-[#121216] border border-zinc-100 dark:border-zinc-800 space-y-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-brand-600" />
            <span>The Equal Access Mandate</span>
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Every year, thousands of talented young athletes in India discontinue competitive sport not due to a lack of talent or dedication, but because of escalating costs for specialized coaching, quality equipment, travel to national ranking tournaments, and sports medicine.
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            <strong>Bharat Sports Grant</strong> was conceived to ensure that scholarship eligibility is determined strictly through published, verifiable athletic criteria rather than arbitrary decisions or an applicant&apos;s personal background, wealth, religion, caste, or regional origin.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-red-100 dark:bg-zinc-800 text-brand-600 flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">Audited Financial Ledger</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Funds are reserved in dedicated allocation accounts and released exclusively upon verified bills for coaching, equipment, and tournament travel.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-red-100 dark:bg-zinc-800 text-brand-600 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">14+ Sporting Disciplines</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Equal dignity and structured merit pathways across Olympic, Commonwealth, and national sports—from Archery and Shooting to Wrestling and Football.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-red-100 dark:bg-zinc-800 text-brand-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">Authorized Sport Verifiers</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Independent evaluation by certified sport-specific reviewers ensures authenticity of tournament certificates and timings.
            </p>
          </div>
        </div>

        {/* Prototype Transparency Notice */}
        <div className="p-5 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/60 dark:bg-amber-950/20 text-xs text-amber-800 dark:text-amber-300">
          <strong>Demonstration Platform Notice:</strong> Bharat Sports Grant is an independent engineering prototype demonstrating a transparent public-service scholarship distribution platform. It does not represent an official statutory ministry or claim authorized federation governance.
        </div>

        <div className="text-center pt-4">
          <Link
            href="/eligibility"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-all"
          >
            <span>Explore Published Scholarships</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
