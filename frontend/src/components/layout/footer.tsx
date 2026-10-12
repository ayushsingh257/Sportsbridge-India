import React from "react";
import Link from "next/link";
import { Trophy, Shield, HeartHandshake, PhoneCall, Mail, AlertTriangle } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-zinc-950 text-zinc-300 border-t border-zinc-900 transition-colors">
      {/* Top Banner: Transparency & Non-Government Disclaimer */}
      <div className="bg-red-950/40 border-b border-red-900/30 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-red-300">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 text-brand-400" />
            <span>
              <strong>Platform Notice:</strong> Bharat Sports Grant is an independent, merit-driven sports initiative prototype.
              Demonstration data is utilized; it does not represent official government departments or statutory federation endorsements.
            </span>
          </div>
          <span className="hidden sm:inline-block font-mono text-[11px] text-zinc-400">
            v0.1.0-beta
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1 & 2: Platform Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Bharat Sports Grant
              </span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Your talent deserves a chance. Your financial situation shouldn't decide your future.
              Connecting Indian youth athletes to transparent, merit-based scholarship allocations across 14+ sporting disciplines.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Audited Ledger</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-brand-400" />
                <span>Merit-Only Access</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-200 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-brand-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/eligibility" className="hover:text-brand-400 transition-colors">
                  Check Eligibility
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Transparency & Guidelines */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-200 mb-4">
              Scholarship Integrity
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/guidelines" className="hover:text-brand-400 transition-colors">
                  Scholarship Guidelines
                </Link>
              </li>
              <li>
                <Link href="/grievance" className="hover:text-brand-400 transition-colors">
                  Grievance Redressal
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-brand-400 transition-colors">
                  Accessibility Statement
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-brand-400 transition-colors">
                  How Review Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal & Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-200 mb-4">
              Legal & Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-brand-400 transition-colors">
                  Privacy Policy (Draft)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-400 transition-colors">
                  Terms & Conditions (Draft)
                </Link>
              </li>
              <li className="pt-2 text-xs text-zinc-400 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-400" />
                <span>support@sportsbridge.org.in</span>
              </li>
              <li className="text-xs text-zinc-400 flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-brand-400" />
                <span>+91 1800-SPORTS-IN (Toll-Free)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {currentYear} Bharat Sports Grant (Sportsbridge India). All rights reserved.</p>
          <p className="text-center sm:text-right">
            Designed with Indian sports engineering standards. Styled in Red & Charcoal.
          </p>
        </div>
      </div>
    </footer>
  );
}
