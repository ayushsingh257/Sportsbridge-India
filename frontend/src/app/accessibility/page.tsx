import React from "react";
import { Eye, CheckCircle2 } from "lucide-react";

export default function AccessibilityPage() {
  return (
    <div className="py-12 md:py-20 bg-white dark:bg-[#09090b] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold uppercase tracking-wider">
            <Eye className="w-3.5 h-3.5" />
            <span>Inclusive Design Standards</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Accessibility Statement
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Commitment to WCAG 2.1 AA accessibility guidelines across light and dark theme viewports.
          </p>
        </div>

        <div className="space-y-4 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
          <p>
            Bharat Sports Grant is committed to ensuring digital accessibility for athletes, coaches, and verifiers with disabilities. We continually improve the user experience and apply relevant accessibility standards.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-[#121216] border border-zinc-200 dark:border-zinc-800 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-zinc-900 dark:text-white text-xs">High Contrast Ratios</strong>
                <span>Minimum 4.5:1 text contrast preserved across Light (Red/White) and Dark (Charcoal/Red) themes.</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-[#121216] border border-zinc-200 dark:border-zinc-800 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-zinc-900 dark:text-white text-xs">Full Keyboard Navigation</strong>
                <span>All interactive cards, modals, navigation dropdowns, and form elements are operable via keyboard.</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-[#121216] border border-zinc-200 dark:border-zinc-800 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-zinc-900 dark:text-white text-xs">Reduced Motion Support</strong>
                <span>Respects user system preferences for prefers-reduced-motion, silencing heavy transitions.</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-[#121216] border border-zinc-200 dark:border-zinc-800 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-zinc-900 dark:text-white text-xs">Screen Reader Semantics</strong>
                <span>Native semantic HTML structure with explicit ARIA roles and descriptive image alts.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
