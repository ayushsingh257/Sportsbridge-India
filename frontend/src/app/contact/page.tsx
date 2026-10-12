"use client";

import React, { useState } from "react";
import { Mail, PhoneCall, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    sport: "General Inquiry",
    subject: "",
    message: "",
    honeypot: "", // Bot prevention field
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Spam honeypot detection
    if (formState.honeypot) {
      console.warn("Spam submission blocked via honeypot trap.");
      return;
    }

    // Basic frontend input validation
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setError("Please complete all required fields (Name, Email, Message).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const tktNum = `TKT-2026-GEN-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketNumber(tktNum);
    setSubmitted(true);
  };

  return (
    <div className="py-12 md:py-20 bg-white dark:bg-[#09090b] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-brand-700 dark:text-brand-300 text-xs font-semibold uppercase tracking-wider">
            <span>Support & Assistance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Contact Bharat Sports Grant
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Have questions about sports criteria, verification guidelines, or technical access? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details & Office */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-[#121216] border border-zinc-100 dark:border-zinc-800 space-y-5">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Contact Information
              </h3>

              <div className="flex items-start gap-3.5 text-xs text-zinc-600 dark:text-zinc-400">
                <Mail className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="block text-zinc-900 dark:text-zinc-200">Electronic Mail</strong>
                  <span>support@sportsbridge.org.in</span>
                  <span className="block text-[11px] text-zinc-400">Response within 2 business days</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs text-zinc-600 dark:text-zinc-400">
                <PhoneCall className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="block text-zinc-900 dark:text-zinc-200">Helpline Assistance</strong>
                  <span>+91 1800-SPORTS-IN (Toll-Free)</span>
                  <span className="block text-[11px] text-zinc-400">Monday to Friday, 9:30 AM – 5:30 PM IST</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs text-zinc-600 dark:text-zinc-400">
                <MapPin className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="block text-zinc-900 dark:text-zinc-200">Registered Office (Demo)</strong>
                  <span>Sports Technology & Grant Operations Center</span>
                  <span className="block text-[11px] text-zinc-400">Bengaluru / New Delhi, India</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 text-xs text-zinc-500 space-y-2">
              <h4 className="font-semibold text-zinc-800 dark:text-zinc-200">Grievance & Appeals</h4>
              <p>
                If you have an active application reference number and wish to appeal an assessment decision,
                please use the dedicated <a href="/grievance" className="text-brand-600 hover:underline">Grievance Redressal Portal</a>.
              </p>
            </div>
          </div>

          {/* Contact Submission Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-white dark:bg-[#121216] border border-zinc-200 dark:border-zinc-800 shadow-sm">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                    Inquiry Submitted Successfully
                  </h3>
                  {ticketNumber && (
                    <div className="p-3 max-w-xs mx-auto rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                      <span className="text-[10px] text-zinc-400 uppercase font-bold block">Support Ticket Reference</span>
                      <strong className="font-mono text-sm text-brand-600 dark:text-brand-400">{ticketNumber}</strong>
                    </div>
                  )}
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto">
                    A member of our support team will review your inquiry and follow up at <strong>{formState.email}</strong> referencing this ticket.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({
                        name: "",
                        email: "",
                        phone: "",
                        sport: "General Inquiry",
                        subject: "",
                        message: "",
                        honeypot: "",
                      });
                    }}
                    className="text-xs font-semibold text-brand-600 hover:underline pt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Anti-spam honeypot (hidden from human users) */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website_trap"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formState.honeypot}
                      onChange={(e) => setFormState({ ...formState, honeypot: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Priya Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="priya@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Indian Mobile Number
                      </label>
                      <input
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                        Sport Discipline
                      </label>
                      <select
                        value={formState.sport}
                        onChange={(e) => setFormState({ ...formState, sport: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                      >
                        <option>General Inquiry</option>
                        <option>Archery</option>
                        <option>Shooting</option>
                        <option>Athletics</option>
                        <option>Badminton</option>
                        <option>Cricket</option>
                        <option>Football</option>
                        <option>Wrestling</option>
                        <option>Boxing</option>
                        <option>Swimming</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="e.g. Query regarding State Archery certificate validity"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Please describe your question or inquiry in detail..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
