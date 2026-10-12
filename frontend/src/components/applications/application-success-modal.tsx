"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Sparkles, Copy, ArrowRight, ShieldCheck } from "lucide-react";

interface ApplicationSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationNumber: string;
  sportName: string;
}

export function ApplicationSuccessModal({
  isOpen,
  onClose,
  applicationNumber,
  sportName,
}: ApplicationSuccessModalProps) {
  if (!isOpen) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(applicationNumber);
    alert("Application Reference copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#141419] border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-center space-y-6">
        {/* Animated Celebration Badge */}
        <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg transform rotate-3">
            <CheckCircle2 className="w-9 h-9" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Application Submitted</span>
          </div>
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white">
            Application Registered Successfully!
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Your scholarship grant application for <strong>{sportName}</strong> has entered our preliminary verification queue.
          </p>
        </div>

        {/* Reference Box */}
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-1">
          <span className="text-[11px] text-zinc-400 uppercase font-bold tracking-wider block">
            Official Reference Number
          </span>
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg font-mono font-black text-brand-600 dark:text-brand-400">
              {applicationNumber}
            </span>
            <button
              type="button"
              onClick={copyToClipboard}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              title="Copy to clipboard"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Verification Note */}
        <div className="flex items-start gap-2.5 text-left p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-xs text-blue-800 dark:text-blue-300">
          <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>
            An assigned state reviewer will inspect your competition credentials and supporting records within 3-5 working days.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md transition-all"
          >
            <span>Track in Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-4 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
