import React from 'react';
import { ShieldCheck, AlertTriangle, FileText, Lock, ChevronLeft } from 'lucide-react';

interface LegalPageProps {
  type: 'terms' | 'privacy' | 'refund' | 'disclaimer';
  navigate: (path: string) => void;
}

export const LegalPages: React.FC<LegalPageProps> = ({ type, navigate }) => {
  const renderContent = () => {
    switch (type) {
      case 'terms':
        return (
          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <h1 className="text-3xl font-extrabold text-slate-900">Terms & Conditions</h1>
            <p className="text-xs text-slate-400">Last updated: September 2026</p>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">1. Nature of the Platform</h2>
              <p>
                JobAccess is a paid information aggregator that provides curated access to verified job listings across IT, Non-IT, and Banking sectors. We provide users with direct links to external employer application URLs.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">2. External Applications</h2>
              <p>
                Job applications are conducted entirely on third-party employer career sites, ATS platforms, or official corporate portals. JobAccess does not collect job applications, resumes, or interview submissions directly inside the application.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">3. Access Rights & Payment</h2>
              <p>
                Access to categories is purchased as a one-time fee via Razorpay. Each purchase grants access to view verified listings and external application links for that specific category or bundle.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">4. User Conduct</h2>
              <p>
                Users agree not to scrape, distribute, reproduce, or resell access to the curated listings without prior written consent from the platform administrators.
              </p>
            </section>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
            <p className="text-xs text-slate-400">Last updated: September 2026</p>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
              <p>
                We collect basic contact information during registration: name, email address, password hash, and optional phone number, age, and location.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">2. Payment Security</h2>
              <p>
                Payments are securely processed via Razorpay. JobAccess does not store credit card numbers, debit card details, CVVs, or UPI PINs on our servers. All transactions are protected by industry-standard 256-bit SSL encryption.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">3. Use of Personal Data</h2>
              <p>
                Your personal details are used strictly to maintain your account, authenticate login sessions, and track your purchased access rights. We do not sell your personal information to third-party advertisers.
              </p>
            </section>
          </div>
        );

      case 'refund':
        return (
          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <h1 className="text-3xl font-extrabold text-slate-900">Refund Policy</h1>
            <p className="text-xs text-slate-400">Last updated: September 2026</p>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">1. Instant Digital Access</h2>
              <p>
                Due to the immediate digital delivery of our service (unrestricted access to proprietary curated job listings and external application URLs upon verified payment), standard refunds are not offered once access has been activated.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">2. Failed or Duplicate Deductions</h2>
              <p>
                If your account was debited more than once for the same order due to a network timeout, or if payment succeeded but access was not provisioned within 2 hours, please contact our support team with your Razorpay Payment ID. Verified duplicate charges will be refunded to the original payment source within 5–7 business days.
              </p>
            </section>
          </div>
        );

      case 'disclaimer':
        return (
          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-900 text-sm">Mandatory Hiring Notice</h3>
                <p className="text-xs text-amber-800 mt-1">
                  JobAccess does not guarantee interviews, selection, or hiring outcomes. We provide curated job information and external links only.
                </p>
              </div>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900">Disclaimer & Hiring Policy</h1>
            <p className="text-xs text-slate-400">Section 12 Compliance</p>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">1. Information & Aggregation Notice</h2>
              <p>
                All job postings displayed on JobAccess are curated from public employer hiring notices, corporate career websites, and verified recruitment channels. While we strive for accuracy, job vacancies, salaries, and application deadlines are determined solely by the respective hiring companies and are subject to change without notice.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">2. No Guarantee of Employment</h2>
              <p>
                JobAccess is an informational platform, not an employer or staffing agency. We do not evaluate resumes, schedule interviews, or influence hiring decisions in any capacity. Your application is submitted directly to the employer through their official link.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">3. Caution Against Fraudulent Job Offers</h2>
              <p>
                Legitimate companies and employers never demand payment for job offers, security deposits for equipment, or laptop charges. If any company asks you for money during an interview process, do not proceed and report it immediately.
              </p>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors mb-6 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Home
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs">
        {renderContent()}
      </div>
    </div>
  );
};
