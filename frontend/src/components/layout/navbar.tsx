"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Trophy,
  Menu,
  X,
  User,
  LogIn,
  UserPlus,
  ShieldCheck,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useAuth } from "@/components/auth/auth-context";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, loginAsAthlete, logout } = useAuth();

  const handleEligibilityClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      // Prompt requirements: "Clicking Check Eligibility must direct the visitor to the login or registration page before allowing an eligibility application to be submitted."
      router.push("/login?redirect=/eligibility");
    } else {
      router.push("/eligibility");
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/eligibility", label: "Check Eligibility", isEligibility: true },
    { href: "/contact", label: "Contact Us" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-nav transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* LEFT: Brand Logo & Platform Name */}
          <Link
            href="/"
            className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg p-1"
            aria-label="Bharat Sports Grant Home"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center text-white shadow-md shadow-brand-600/30 group-hover:scale-105 transition-transform">
              <Trophy className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-1.5">
                Bharat Sports Grant
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-900">
                  India
                </span>
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                National Athlete Development & Grant Portal
              </span>
            </div>
          </Link>

          {/* RIGHT: Desktop Navigation Links & Actions */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
            <nav className="flex items-center space-x-1 mr-2" aria-label="Main Navigation">
              {navLinks.map((link) => {
                if (link.isEligibility) {
                  return (
                    <button
                      key={link.href}
                      onClick={handleEligibilityClick}
                      className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                        isActive(link.href)
                          ? "text-brand-600 dark:text-brand-400 bg-red-50/80 dark:bg-zinc-800/80"
                          : "text-zinc-700 dark:text-zinc-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-red-50/50 dark:hover:bg-zinc-800/50"
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                      isActive(link.href)
                        ? "text-brand-600 dark:text-brand-400 bg-red-50/80 dark:bg-zinc-800/80"
                        : "text-zinc-700 dark:text-zinc-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-red-50/50 dark:hover:bg-zinc-800/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Authentication States */}
            {!isAuthenticated ? (
              <div className="flex items-center space-x-2 pl-2 border-l border-zinc-200 dark:border-zinc-800">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-red-50/60 dark:hover:bg-zinc-800 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-sm shadow-brand-600/30 hover:shadow-md hover:shadow-brand-600/40 transition-all active:scale-95"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </Link>

                {/* Interactive Demo Auth Switcher */}
                <button
                  type="button"
                  onClick={loginAsAthlete}
                  title="Click to simulate authenticated athlete session"
                  className="text-[11px] px-2 py-1 rounded border border-dashed border-brand-400/60 text-brand-700 dark:text-brand-300 bg-brand-50/50 dark:bg-zinc-900 hover:bg-brand-100 transition-colors ml-1"
                >
                  Demo Log In
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 pl-3 border-l border-zinc-200 dark:border-zinc-800">
                {/* Profile Icon at extreme right */}
                <div className="flex items-center gap-2">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-red-200 dark:border-zinc-700 bg-red-50/40 dark:bg-zinc-800/50 hover:bg-red-100/60 dark:hover:bg-zinc-800 transition-colors"
                    aria-label="Athlete Profile & Dashboard"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
                        {user?.name}
                      </span>
                      <span className="text-[10px] text-brand-600 dark:text-brand-400 font-medium">
                        Verified Athlete
                      </span>
                    </div>
                  </Link>

                  <button
                    type="button"
                    onClick={logout}
                    aria-label="Logout"
                    title="Log out of athlete session"
                    className="p-2 text-zinc-500 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* MOBILE: Menu Trigger */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-red-50 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE: Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0e] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              if (link.isEligibility) {
                return (
                  <button
                    key={link.href}
                    onClick={handleEligibilityClick}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-base font-medium text-left ${
                      isActive(link.href)
                        ? "text-brand-600 dark:text-brand-400 bg-red-50 dark:bg-zinc-800"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-red-50/50 dark:hover:bg-zinc-800/50"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </button>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-base font-medium ${
                    isActive(link.href)
                      ? "text-brand-600 dark:text-brand-400 bg-red-50 dark:bg-zinc-800"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-red-50/50 dark:hover:bg-zinc-800/50"
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-400" />
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-gray-100 dark:border-zinc-800 flex flex-col space-y-2">
            {!isAuthenticated ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-semibold text-zinc-700 dark:text-zinc-200 border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-sm"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    loginAsAthlete();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-brand-600 dark:text-brand-400 py-1 font-medium text-center underline"
                >
                  Simulate Athlete Log In
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg bg-red-50 dark:bg-zinc-800/80 border border-red-100 dark:border-zinc-700"
                >
                  <div className="w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-sm">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-zinc-900 dark:text-white text-sm">
                      {user?.name}
                    </div>
                    <div className="text-xs text-brand-600 dark:text-brand-400">
                      View Athlete Dashboard
                    </div>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-zinc-800 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
