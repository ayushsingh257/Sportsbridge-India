import React from "react";
import Link from "next/link";
import { Trophy, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-24 max-w-lg mx-auto text-center px-4 space-y-5">
      <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-zinc-800 text-brand-600 flex items-center justify-center mx-auto shadow-sm">
        <Trophy className="w-7 h-7" />
      </div>
      <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">
        404 — Page Not Found
      </h1>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        The sports scholarship resource or pathway you are seeking could not be found.
      </p>
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
