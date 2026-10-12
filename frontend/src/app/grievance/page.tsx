import React from "react";
import { HelpCircle, Clock, ShieldCheck, Mail } from "lucide-react";

export default function GrievancePage() {
  return (
    <div className="py-12 md:py-20 bg-white dark:bg-[#09090b] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Appeals & Inquiries</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Grievance Redressal & Decision Appeals
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            A transparent framework for reviewing disputed eligibility decisions, missing document reconsiderations, and technical concerns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-[#121216] border border-zinc-200 dark:border-zinc-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 text-brand-600 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">14-Day Appeal Window</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Athletes may lodge an appeal within 14 calendar days of receiving an official decision or document rejection notification.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-[#121216] border border-zinc-200 dark:border-zinc-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 text-brand-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Independent Review</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Appeals are re-evaluated by a senior review panel distinct from the original verifier assigned to the application.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-[#121216] border border-zinc-200 dark:border-zinc-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 text-brand-600 flex items-center justify-center font-bold">
              <Mail className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Dedicated Desk</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Contact grievance@sportsbridge.org.in referencing your application tracking ID for urgent escalation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
