import React from "react";
import { PARTNER_ORGS } from "@/data/mock-data";
import { Building2, ShieldAlert } from "lucide-react";

export function ParticipatingOrgs() {
  return (
    <section className="py-14 bg-white dark:bg-[#09090b] border-t border-zinc-100 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Participating Academies & Training Centers
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Registered sports development centers accepting verified scholarship expense vouchers.
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-400">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
            <span>
              Disclaimer: Sample demonstration institutions. No unauthorized federation endorsements are implied.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PARTNER_ORGS.map((org) => (
            <div
              key={org.id}
              className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#121216]/50 flex items-start space-x-3"
            >
              <div className="p-2.5 rounded-lg bg-red-100/80 dark:bg-zinc-800 text-brand-600 dark:text-brand-400 mt-0.5">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                  {org.name}
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {org.type}
                </p>
                <span className="text-[10px] text-zinc-400 font-medium">
                  {org.city}, {org.state}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
