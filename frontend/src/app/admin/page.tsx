"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  FileText,
  Receipt,
  History,
  Lock,
  ArrowRight,
  UserCheck,
  Building,
} from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";

type AdminRole = "REVIEWER" | "FINANCE" | "ADMIN";

export default function AdminPortalPage() {
  const { user } = useAuth();
  const [activeRole, setActiveRole] = useState<AdminRole>("ADMIN");
  const [activeTab, setActiveTab] = useState<"applications" | "expenses" | "audits">("applications");

  // Sample real-time queue states
  const [applications, setApplications] = useState([
    {
      id: "BSG-2026-ARCH-0012",
      name: "Rohan Varma",
      sport: "Archery (Compound)",
      level: "State Championship Gold",
      score: 85,
      status: "SUBMITTED",
      submittedDate: "10 Oct 2026",
    },
    {
      id: "BSG-2026-BADM-0089",
      name: "Kavya Sharma",
      sport: "Badminton (Singles)",
      level: "National Games Quarterfinalist",
      score: 92,
      status: "PRELIMINARY_REVIEW",
      submittedDate: "11 Oct 2026",
    },
    {
      id: "BSG-2026-BOXG-0034",
      name: "Amit Kumar",
      sport: "Boxing (63.5kg)",
      level: "District Champion",
      score: 68,
      status: "VERIFICATION_PENDING",
      submittedDate: "09 Oct 2026",
    },
  ]);

  const [expenses, setExpenses] = useState([
    {
      id: "EXP-2026-901",
      athleteName: "P.V. Sindhu Academy Trainee",
      category: "EQUIPMENT",
      amount: 45000,
      merchant: "Yonex Official",
      status: "PENDING",
    },
    {
      id: "EXP-2026-902",
      athleteName: "Mary Kom Boxing Foundation",
      category: "NUTRITION_DIET",
      amount: 22000,
      merchant: "Optimum Sports Nutrition",
      status: "APPROVED",
    },
  ]);

  const [audits, setAudits] = useState([
    {
      id: "AUD-01",
      actor: "reviewer.archery@sportsbridge.in",
      role: "REVIEWER",
      action: "PRELIMINARY_SCORE_VERIFIED",
      target: "BSG-2026-ARCH-0012",
      time: "10 mins ago",
    },
    {
      id: "AUD-02",
      actor: "finance.officer@sportsbridge.in",
      role: "FINANCE",
      action: "DISBURSEMENT_RESERVED",
      target: "EXP-2026-902",
      time: "1 hour ago",
    },
  ]);

  const handleApproveApp = (appId: string) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: "APPROVED" } : a))
    );
    setAudits((prev) => [
      {
        id: `AUD-${Date.now()}`,
        actor: user?.email || "admin@sportsbridge.in",
        role: activeRole,
        action: "STATUS_TRANSITION_APPROVED",
        target: appId,
        time: "Just now",
      },
      ...prev,
    ]);
  };

  const handleDisburseExpense = (expId: string) => {
    if (activeRole === "REVIEWER") {
      alert("Segregation of Duties Enforcement: Verifiers/Reviewers cannot authorize financial disbursements. Please switch to Finance Officer or Admin.");
      return;
    }
    setExpenses((prev) =>
      prev.map((e) => (e.id === expId ? { ...e, status: "DISBURSED" } : e))
    );
    setAudits((prev) => [
      {
        id: `AUD-${Date.now()}`,
        actor: user?.email || "finance@sportsbridge.in",
        role: activeRole,
        action: "DISBURSEMENT_EXECUTED",
        target: expId,
        time: "Just now",
      },
      ...prev,
    ]);
  };

  return (
    <div className="py-10 md:py-16 bg-zinc-50/50 dark:bg-[#0c0c0e] min-h-[calc(100vh-5rem)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header and Segregation of Duties Selector */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="badge-tag bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 text-xs font-bold">
                Governance Portal
              </span>
              <span className="text-xs text-zinc-400">Phase 9 RBAC Administration</span>
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">
              Platform Administrative & Reviewer Console
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Dual-control segregation of duties: Sports verification and financial disbursement authorization are strictly partitioned.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-xl text-xs font-bold">
            <span className="text-zinc-500 px-2 text-[11px]">Role Simulation:</span>
            <button
              onClick={() => setActiveRole("REVIEWER")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeRole === "REVIEWER"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
              }`}
            >
              Sports Reviewer
            </button>
            <button
              onClick={() => setActiveRole("FINANCE")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeRole === "FINANCE"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
              }`}
            >
              Finance Officer
            </button>
            <button
              onClick={() => setActiveRole("ADMIN")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeRole === "ADMIN"
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
              }`}
            >
              System Admin
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-2 text-sm font-bold">
          <button
            onClick={() => setActiveTab("applications")}
            className={`pb-2 transition-all flex items-center gap-2 ${
              activeTab === "applications"
                ? "border-b-2 border-brand-600 text-brand-600 dark:text-brand-400"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Applications Queue ({applications.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("expenses")}
            className={`pb-2 transition-all flex items-center gap-2 ${
              activeTab === "expenses"
                ? "border-b-2 border-brand-600 text-brand-600 dark:text-brand-400"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>Expense Approvals ({expenses.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("audits")}
            className={`pb-2 transition-all flex items-center gap-2 ${
              activeTab === "audits"
                ? "border-b-2 border-brand-600 text-brand-600 dark:text-brand-400"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            <History className="w-4 h-4" />
            <span>Immutable Audit Trail ({audits.length})</span>
          </button>
        </div>

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-zinc-200 dark:border-zinc-800 space-y-4">
            <h2 className="text-base font-bold text-zinc-900 dark:text-white">
              Pending Grant Applications Queue
            </h2>
            <div className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-brand-600 dark:text-brand-400">
                        {app.id}
                      </span>
                      <span className="font-bold text-sm text-zinc-900 dark:text-white">
                        {app.name}
                      </span>
                      <span className="badge-tag bg-zinc-100 dark:bg-zinc-800 text-[10px]">
                        {app.sport}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      {app.level} • Score: {app.score}/100 • Submitted: {app.submittedDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`badge-tag text-[10px] ${
                        app.status === "APPROVED"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                      }`}
                    >
                      {app.status}
                    </span>

                    {app.status !== "APPROVED" && (
                      <button
                        onClick={() => handleApproveApp(app.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm"
                      >
                        Approve Candidate
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expenses Tab */}
        {activeTab === "expenses" && (
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-zinc-200 dark:border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                Reimbursement Claim Approvals
              </h2>
              {activeRole === "REVIEWER" && (
                <span className="text-xs text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" />
                  Reviewer restricted from fund disbursement
                </span>
              )}
            </div>

            <div className="space-y-3">
              {expenses.map((exp) => (
                <div
                  key={exp.id}
                  className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-zinc-500">
                        {exp.id}
                      </span>
                      <span className="font-bold text-sm text-zinc-900 dark:text-white">
                        {exp.athleteName}
                      </span>
                      <span className="badge-tag bg-zinc-100 dark:bg-zinc-800 text-[10px]">
                        {exp.category}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      Merchant: {exp.merchant} • Amount: ₹{exp.amount.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`badge-tag text-[10px] ${
                        exp.status === "DISBURSED"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                      }`}
                    >
                      {exp.status}
                    </span>

                    {exp.status !== "DISBURSED" && (
                      <button
                        onClick={() => handleDisburseExpense(exp.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          activeRole === "REVIEWER"
                            ? "bg-zinc-300 text-zinc-500 cursor-not-allowed"
                            : "bg-brand-600 hover:bg-brand-700 text-white shadow-sm"
                        }`}
                      >
                        Authorize Disbursement
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Audit Trail Tab */}
        {activeTab === "audits" && (
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-zinc-200 dark:border-zinc-800 space-y-4">
            <h2 className="text-base font-bold text-zinc-900 dark:text-white">
              System Administrative Audit Log
            </h2>
            <div className="space-y-2">
              {audits.map((a) => (
                <div
                  key={a.id}
                  className="p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-zinc-400">{a.id}</span>
                      <strong className="text-zinc-800 dark:text-zinc-200">{a.actor}</strong>
                      <span className="badge-tag bg-zinc-100 dark:bg-zinc-800 text-[9px] font-mono">
                        {a.role}
                      </span>
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      Executed: <code className="text-brand-600 dark:text-brand-400">{a.action}</code> on entity {a.target}
                    </p>
                  </div>
                  <span className="text-[11px] text-zinc-400">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
