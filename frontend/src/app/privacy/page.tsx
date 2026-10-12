import React from "react";
import { ShieldCheck, Lock, AlertTriangle } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="py-12 md:py-20 bg-white dark:bg-[#09090b] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>Data Protection Framework</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Privacy Policy & Data Security
          </h1>
          <p className="text-xs text-zinc-500 font-mono">
            Document Status: Public Draft • Subject to Legal & Statutory Review Prior to Production Launch
          </p>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Prototype Disclosure:</strong> This document represents a working operational draft for Bharat Sports Grant. Personal athlete details submitted during development testing are not stored on live production servers.
          </span>
        </div>

        <div className="space-y-6 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">1. Scope and Principles</h2>
            <p>
              Bharat Sports Grant operates on a principle of data minimization. We only collect the minimal information necessary to evaluate published sports scholarship criteria and disburse approved financial expense reimbursements.
            </p>
            <p>
              Sensitive personal attributes—including caste, religion, family wealth, and political beliefs—are strictly excluded from eligibility computation and are never requested.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Contact Details: Verified Indian mobile number (+91) and active email address.</li>
              <li>Athlete Profile: Full name, verified date of birth, state and city, sporting discipline, and educational qualification.</li>
              <li>Supporting Evidence: Official competition certificates, tournament scorecards, and coach recommendation letters.</li>
              <li>Expense Records: Coaching receipts, equipment invoices, and competition registration vouchers.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">3. Protection of Minor Athletes</h2>
            <p>
              Athletes under the age of 18 require parental or legal guardian consent prior to final document verification and fund disbursement. All communications regarding grant awards for minors are simultaneously routed to the registered guardian.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">4. Secure Document Storage</h2>
            <p>
              Uploaded certificates are stored with cryptographically generated UUID keys outside the public web root. Documents are accessible solely to the owning athlete and assigned authorized verifiers via secured, authenticated proxy routes.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
