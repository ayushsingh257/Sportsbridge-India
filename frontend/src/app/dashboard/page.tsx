"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  ShieldCheck,
  Trophy,
  Layers,
  Clock,
  FileText,
  ArrowRight,
  PlusCircle,
  Receipt,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";

interface ExpenseClaim {
  id: string;
  category: string;
  amount: number;
  merchant: string;
  status: "PENDING" | "APPROVED" | "DISBURSED";
  date: string;
}

export default function DashboardPage() {
  const { user, isAuthenticated, loginAsAthlete } = useAuth();
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [claimCategory, setClaimCategory] = useState("EQUIPMENT");
  const [claimAmount, setClaimAmount] = useState(15000);
  const [merchantName, setMerchantName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [expenses, setExpenses] = useState<ExpenseClaim[]>([
    {
      id: "EXP-2026-001",
      category: "EQUIPMENT",
      amount: 45000,
      merchant: "ArrowTech Archery Supplies",
      status: "DISBURSED",
      date: "05 Oct 2026",
    },
    {
      id: "EXP-2026-002",
      category: "COACHING_FEES",
      amount: 25000,
      merchant: "National High Performance Camp",
      status: "APPROVED",
      date: "08 Oct 2026",
    },
  ]);

  const totalAllocation = 350000;
  const disbursed = expenses
    .filter((e) => e.status === "DISBURSED")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const reserved = expenses
    .filter((e) => e.status === "PENDING" || e.status === "APPROVED")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const available = totalAllocation - (disbursed + reserved);

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (claimAmount > available) {
      alert(`Claim amount ₹${claimAmount.toLocaleString("en-IN")} exceeds available balance ₹${available.toLocaleString("en-IN")}.`);
      return;
    }

    const newClaim: ExpenseClaim = {
      id: `EXP-2026-00${expenses.length + 1}`,
      category: claimCategory,
      amount: Number(claimAmount),
      merchant: merchantName || "Certified Sporting Vendor",
      status: "PENDING",
      date: "Today",
    };

    setExpenses([newClaim, ...expenses]);
    setShowExpenseModal(false);
    setMerchantName("");
    setPurpose("");
    alert("Expense reimbursement request submitted successfully! Funds reserved pending verification.");
  };

  if (!isAuthenticated) {
    return (
      <div className="py-20 max-w-lg mx-auto text-center px-4 space-y-4">
        <div className="w-12 h-12 rounded-xl bg-red-100 text-brand-600 flex items-center justify-center mx-auto">
          <User className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Sign In to Access Athlete Dashboard
        </h1>
        <p className="text-xs text-zinc-500">
          The dashboard is restricted to authenticated athletes. You can simulate signing in below.
        </p>
        <button
          type="button"
          onClick={loginAsAthlete}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm"
        >
          Sign In as Demo Athlete
        </button>
      </div>
    );
  }

  return (
    <div className="py-10 md:py-16 bg-zinc-50/50 dark:bg-[#0c0c0e] min-h-[calc(100vh-5rem)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Athlete Overview Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-600 text-white font-black text-2xl flex items-center justify-center shadow-md">
              <User className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {user?.name}
                </h1>
                <span className="badge-tag bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[11px]">
                  Verified Athlete Profile
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {user?.email} • {user?.phone} • Karnataka, India
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowExpenseModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-sm transition-all"
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>Claim Expense</span>
            </button>
            <Link
              href="/eligibility"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-all"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Apply for New Grant</span>
            </Link>
          </div>
        </div>

        {/* Dashboard Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications Status */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-zinc-200 dark:border-zinc-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-600" />
                  <span>My Scholarship Applications</span>
                </h2>
                <span className="text-xs text-zinc-400 font-medium">1 Active Application</span>
              </div>

              <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-900 dark:text-white">
                    State Archery Development Grant (BSG-2026-ARCH-0012)
                  </span>
                  <span className="badge-tag bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 text-[10px]">
                    Under Verification
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Preliminary score: 85/100 • Submitted on 10 Oct 2026 • Assigned to State Archery Reviewer
                </p>
              </div>
            </div>

            {/* Expense Reimbursements Table */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-zinc-200 dark:border-zinc-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-brand-600" />
                  <span>Expense Claims & Reimbursement Ledger</span>
                </h2>
                <button
                  type="button"
                  onClick={() => setShowExpenseModal(true)}
                  className="text-xs text-brand-600 dark:text-brand-400 font-bold hover:underline"
                >
                  + New Claim
                </button>
              </div>

              <div className="space-y-3">
                {expenses.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-zinc-900 dark:text-white">
                          {exp.merchant}
                        </span>
                        <span className="badge-tag bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 text-[9px]">
                          {exp.category}
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-400">
                        {exp.id} • {exp.date}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold text-zinc-900 dark:text-white block">
                        ₹{exp.amount.toLocaleString("en-IN")}
                      </span>
                      <span
                        className={`badge-tag text-[9px] ${
                          exp.status === "DISBURSED"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : exp.status === "APPROVED"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                        }`}
                      >
                        {exp.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ledger Summary */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121216] border border-zinc-200 dark:border-zinc-800 space-y-4">
            <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Scholarship Financial Ledger</span>
            </h2>

            <div className="p-4 rounded-xl bg-red-50/60 dark:bg-zinc-800/50 border border-red-100 dark:border-zinc-700 space-y-2">
              <span className="text-xs text-zinc-500 block">Total Approved Allocation</span>
              <span className="text-2xl font-black text-zinc-900 dark:text-white">
                ₹{totalAllocation.toLocaleString("en-IN")}
              </span>
              <div className="pt-2 flex justify-between text-xs text-zinc-600 dark:text-zinc-300 border-t border-red-100 dark:border-zinc-700">
                <div>
                  <span className="text-zinc-400 block text-[10px]">Available</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">
                    ₹{available.toLocaleString("en-IN")}
                  </strong>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">Reserved</span>
                  <strong className="text-amber-600 dark:text-amber-400">
                    ₹{reserved.toLocaleString("en-IN")}
                  </strong>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">Disbursed</span>
                  <strong className="text-zinc-800 dark:text-zinc-200">
                    ₹{disbursed.toLocaleString("en-IN")}
                  </strong>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-500 space-y-1">
              <span className="font-bold text-zinc-700 dark:text-zinc-300 block">
                Double-Entry Balance Invariant:
              </span>
              <p className="font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
                Available = Allocation - (Reserved + Disbursed)
              </p>
              <p className="text-[10px] text-zinc-400 pt-1">
                Verified cryptographically by immutable ledger transactions.
              </p>
            </div>
          </div>
        </div>

        {/* Expense Claim Modal */}
        {showExpenseModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-[#141419] border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-brand-600" />
                  <span>Claim Expense Reimbursement</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowExpenseModal(false)}
                  className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleExpenseSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Expense Category
                  </label>
                  <select
                    value={claimCategory}
                    onChange={(e) => setClaimCategory(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                  >
                    <option value="EQUIPMENT">Equipment & Protective Gear</option>
                    <option value="COACHING_FEES">Certified Coaching Fees</option>
                    <option value="NUTRITION_DIET">Sports Nutrition & Diet</option>
                    <option value="TRAVEL_COMPETITION">Competition Travel & Boarding</option>
                    <option value="MEDICAL_PHYSIO">Sports Physiotherapy & Medical</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Amount (₹ INR) — Max Available ₹{available.toLocaleString("en-IN")}
                  </label>
                  <input
                    type="number"
                    min="100"
                    max={available}
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Merchant / Provider Name
                  </label>
                  <input
                    type="text"
                    value={merchantName}
                    onChange={(e) => setMerchantName(e.target.value)}
                    placeholder="e.g. Apex Sports Academy"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Purpose Description
                  </label>
                  <textarea
                    rows={2}
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="Briefly describe the expenditure purpose..."
                    className="w-full px-3 py-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                    required
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md transition-all"
                  >
                    Submit Expense Claim
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
