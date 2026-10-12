"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SPORTS_CATALOGUE } from "@/data/mock-data";
import { useAuth } from "@/components/auth/auth-context";
import {
  Trophy,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  LogIn,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
} from "lucide-react";

interface EvaluationResult {
  is_eligible: boolean;
  status: "ELIGIBLE" | "INELIGIBLE" | "BORDERLINE";
  score: number;
  reasons: string[];
  qualifying_programs: string[];
  funding_bracket_inr: number;
  breakdown: Record<string, boolean>;
}

export default function EligibilitySelectionPage() {
  const { isAuthenticated, user, loginAsAthlete } = useAuth();
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [athleteAge, setAthleteAge] = useState<number>(18);
  const [competitionLevel, setCompetitionLevel] = useState<string>("STATE");
  const [incomeBracket, setIncomeBracket] = useState<number>(6);
  const [hasBan, setHasBan] = useState<boolean>(false);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evalResult, setEvalResult] = useState<EvaluationResult | null>(null);

  const handleAssess = (sportCode: string) => {
    setSelectedSport(sportCode);
    setEvalResult(null);
  };

  const runEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEvaluating(true);

    try {
      const res = await fetch("http://localhost:8000/api/v1/eligibility/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          athlete_age: Number(athleteAge),
          sport_code: selectedSport || "archery",
          competition_level: competitionLevel,
          has_active_national_ban: hasBan,
          income_bracket_lpa: Number(incomeBracket),
          state: "All India",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setEvalResult(data);
      } else {
        // Fallback deterministic client-side evaluation matching the backend rules
        simulateClientEvaluation();
      }
    } catch {
      simulateClientEvaluation();
    } finally {
      setIsEvaluating(false);
    }
  };

  const simulateClientEvaluation = () => {
    if (hasBan) {
      setEvalResult({
        is_eligible: false,
        status: "INELIGIBLE",
        score: 0,
        reasons: ["Athlete is serving an active disciplinary or anti-doping suspension."],
        qualifying_programs: [],
        funding_bracket_inr: 0,
        breakdown: { disciplinary_clearance: false },
      });
      return;
    }

    let score = 0;
    if (competitionLevel === "INTERNATIONAL") score += 70;
    else if (competitionLevel === "NATIONAL") score += 55;
    else if (competitionLevel === "STATE") score += 40;
    else score += 25;

    if (athleteAge >= 12 && athleteAge <= 24) score += 15;
    if (incomeBracket <= 8) score += 15;
    score = Math.min(score, 100);

    const isAgeValid = athleteAge >= 10 && athleteAge <= 35;
    const isEligible = isAgeValid && score >= 40;

    let funding = 0;
    if (isEligible) {
      if (competitionLevel === "INTERNATIONAL") funding = 1200000;
      else if (competitionLevel === "NATIONAL") funding = 500000;
      else if (competitionLevel === "STATE") funding = 250000;
      else funding = 100000;
    }

    setEvalResult({
      is_eligible: isEligible,
      status: isEligible ? "ELIGIBLE" : score >= 25 ? "BORDERLINE" : "INELIGIBLE",
      score,
      reasons: isEligible
        ? [`Candidate qualifies at ${competitionLevel} level with score ${score}/100.`]
        : ["Candidate does not meet required competitive threshold."],
      qualifying_programs: isEligible
        ? [`${selectedSport?.toUpperCase()} Development Grant`]
        : [],
      funding_bracket_inr: funding,
      breakdown: {
        disciplinary_clearance: true,
        age_window: isAgeValid,
        prime_age_bonus: athleteAge >= 12 && athleteAge <= 24,
      },
    });
  };

  return (
    <div className="py-12 md:py-20 bg-zinc-50/50 dark:bg-[#0c0c0e] min-h-[calc(100vh-5rem)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            <span>Sports Selection & Rules Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Check Your Sports Scholarship Eligibility
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Powered by the configurable rules engine. Select your sport and enter verified parameters to get an authoritative preliminary assessment.
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
                Authenticated as <strong>{user?.name}</strong> ({user?.phone}). You are authorized to assess criteria and submit applications.
              </span>
            </div>
            <span className="font-semibold text-emerald-700 dark:text-emerald-300">
              Session Active
            </span>
          </div>
        )}

        {/* Dynamic Interactive Evaluator Form if a Sport is Selected */}
        {selectedSport && (
          <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-[#121216] border border-brand-300 dark:border-brand-900/60 shadow-lg space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-600" />
                  <span>Interactive Eligibility Assessment: {selectedSport.toUpperCase()}</span>
                </h2>
                <p className="text-xs text-zinc-500">
                  Rules engine will score criteria and check anti-doping clearance, age window, and competition level.
                </p>
              </div>
              <button
                onClick={() => setSelectedSport(null)}
                className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              >
                ✕ Close Evaluator
              </button>
            </div>

            <form onSubmit={runEvaluation} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Athlete Age (Years)
                </label>
                <input
                  type="number"
                  min="8"
                  max="50"
                  value={athleteAge}
                  onChange={(e) => setAthleteAge(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Highest Competition Level
                </label>
                <select
                  value={competitionLevel}
                  onChange={(e) => setCompetitionLevel(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                >
                  <option value="DISTRICT">District Level</option>
                  <option value="STATE">State Championship</option>
                  <option value="NATIONAL">National Games / Federation Cup</option>
                  <option value="INTERNATIONAL">International / Commonwealth / Asian Games</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Family Income Bracket (LPA)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="50"
                  value={incomeBracket}
                  onChange={(e) => setIncomeBracket(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                />
              </div>

              <div className="flex flex-col justify-end">
                <button
                  type="submit"
                  disabled={isEvaluating}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 transition-colors shadow-sm"
                >
                  {isEvaluating ? "Evaluating Rules..." : "Run Server Evaluation"}
                </button>
              </div>
            </form>

            {/* Evaluation Result View */}
            {evalResult && (
              <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {evalResult.is_eligible ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className="font-bold text-base text-zinc-900 dark:text-white">
                      Result: {evalResult.status}
                    </span>
                  </div>
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                    Calculated Score: {evalResult.score}/100
                  </span>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-300">
                  {evalResult.reasons.join(" ")}
                </p>

                {evalResult.is_eligible && (
                  <div className="pt-2 flex items-center justify-between text-xs border-t border-zinc-200 dark:border-zinc-700">
                    <div>
                      <span className="text-zinc-500 block">Indicative Funding Band:</span>
                      <strong className="text-emerald-600 dark:text-emerald-400 text-sm">
                        ₹{evalResult.funding_bracket_inr.toLocaleString("en-IN")}
                      </strong>
                    </div>
                    {evalResult.qualifying_programs.length > 0 && (
                      <div className="text-right">
                        <span className="text-zinc-500 block">Matching Programs:</span>
                        <span className="font-bold text-zinc-800 dark:text-zinc-200">
                          {evalResult.qualifying_programs.join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
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

                <button
                  type="button"
                  onClick={() => handleAssess(sport.code)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-all"
                >
                  <span>Assess {sport.name} Criteria</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
