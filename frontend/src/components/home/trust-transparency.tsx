import React from "react";
import { ShieldCheck, FileCheck, Landmark, Lock, HelpCircle, AlertOctagon } from "lucide-react";

export function TrustTransparency() {
  const transparencyPillars = [
    {
      icon: FileCheck,
      title: "Objective Merit Evaluation",
      description:
        "Preliminary eligibility is computed automatically against published sporting criteria. No arbitrary discretionary bypasses or favoritism.",
    },
    {
      icon: ShieldCheck,
      title: "Authorized Sport Verifiers",
      description:
        "Every qualifying candidate has certificates, tournament scores, and identity verified by authorized discipline review officers.",
    },
    {
      icon: Landmark,
      title: "Double-Entry Financial Ledger",
      description:
        "Allocations remain reserved until eligible expense invoices are submitted and audited. Balances cannot be manipulated or over-released.",
    },
    {
      icon: Lock,
      title: "Strict Identity Protection",
      description:
        "Private documents are secured behind authorized access proxies. Minor athletes benefit from parental consent workflows.",
    },
    {
      icon: HelpCircle,
      title: "Formal Appeals & Redressal",
      description:
        "Disputed preliminary outcomes or document rejections can be formally appealed with additional supporting evidence within 14 days.",
    },
    {
      icon: AlertOctagon,
      title: "Zero Tolerance for Forgery",
      description:
        "Fabricated tournament certificates or age falsification results in immediate disqualification and blacklisting from all partner schemes.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-zinc-50/60 dark:bg-[#0c0c0e] border-t border-zinc-100 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Public Service Integrity Standard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Trust & Transparency Protocols
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2">
            Every application, document verification, fund allocation, and expense release is audited
            under strict public-service governance standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transparencyPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-zinc-100 dark:border-zinc-800 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-zinc-800 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
