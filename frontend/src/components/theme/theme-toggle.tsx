"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className={`relative inline-flex items-center justify-center p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-red-50 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 ${className}`}
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 transition-transform duration-200 hover:rotate-12" />
      ) : (
        <Sun className="w-5 h-5 transition-transform duration-200 hover:rotate-45 text-amber-400" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
