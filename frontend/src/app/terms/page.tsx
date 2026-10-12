import React from "react";
import { FileText, ShieldAlert } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="py-12 md:py-20 bg-white dark:bg-[#09090b] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Platform Regulations</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-xs text-zinc-500 font-mono">
            Document Status: Working Prototype Draft • Governed by green.md standards
          </p>
        </div>

        <div className="space-y-6 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">1. Nature of the Grant</h2>
            <p>
              Bharat Sports Grant provides performance-linked scholarship allocations. Preliminary eligibility calculations do not constitute a binding legal award. Formal decisions are awarded only upon satisfactory verification of original documents and approval by authorized sports reviewers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">2. Expense-Based Controlled Disbursements</h2>
            <p>
              Scholarships are not transferred as lump-sum cash awards. Approved allocations are held in the controlled ledger and released against permitted sporting expenses: coaching fees, academy board, equipment invoices, and tournament travel vouchers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">3. Integrity and Anti-Forgery</h2>
            <p>
              Submitting forged tournament certificates, falsified birth records, or manipulated receipts results in immediate cancellation of all applications, revocation of remaining ledger allocations, and permanent blacklisting from platform schemes.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
