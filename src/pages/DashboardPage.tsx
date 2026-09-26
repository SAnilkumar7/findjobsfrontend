import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { usePackages } from '../context/PackagesContext.tsx';
import {
  Code,
  Briefcase,
  Landmark,
  Sparkles,
  Lock,
  CheckCircle2,
  ArrowRight,
  Shield,
  Layers,
  Search,
  ExternalLink,
} from 'lucide-react';

interface DashboardPageProps {
  navigate: (path: string) => void;
  onOpenCheckout: (slug: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ navigate, onOpenCheckout }) => {
  const { user, access, refreshAccess } = useAuth();
  const { packages, formatPrice, getPackageBySlug } = usePackages();

  useEffect(() => {
    refreshAccess();
  }, [refreshAccess]);

  const itPkg = getPackageBySlug('it') || { id: 'pkg_it', slug: 'it', price: 49, name: 'IT Jobs' };
  const nonItPkg = getPackageBySlug('non-it') || { id: 'pkg_non_it', slug: 'non-it', price: 39, name: 'Non-IT Jobs' };
  const bankingPkg = getPackageBySlug('banking') || { id: 'pkg_banking', slug: 'banking', price: 49, name: 'Banking Jobs' };
  const allPkg = getPackageBySlug('all') || { id: 'pkg_all', slug: 'all', price: 99, name: 'All Access' };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Welcome Banner */}
      <div className="mb-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" /> Candidate Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Welcome back, {user?.name || 'Job Seeker'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Manage your unlocked job categories, view live openings, and apply directly to external employer listings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {access?.has_all ? (
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-xl text-xs font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>All Access VIP Pass Active</span>
            </div>
          ) : (
            <button
              onClick={() => onOpenCheckout('all')}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-semibold rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unlock All 3 Categories ({formatPrice(allPkg.price)})</span>
            </button>
          )}
        </div>
      </div>

      {/* The Four Purchase Cards (Section 7: Real-time Access State) */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Access Categories
          </h2>
          <span className="text-xs text-slate-500">
            Server-verified instant access
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 1. IT Jobs Card */}
          <div
            id="dash-card-it"
            className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
              access?.has_it
                ? 'bg-emerald-50/40 border-emerald-300 shadow-xs'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Code className="w-5 h-5" />
                </div>
                {access?.has_it ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> Access Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                    <Lock className="w-3 h-3 text-slate-400" /> Locked
                  </span>
                )}
              </div>

              <h3 className="font-bold text-slate-900 text-base">IT Jobs</h3>
              <p className="text-xs text-slate-500 mt-1 min-h-[36px]">
                Software, DevOps, Cloud, AI & Data Engineering listings.
              </p>

              <div className="mt-3 mb-4">
                {access?.has_it ? (
                  <span className="text-xs font-semibold text-emerald-700">
                    Unlimited Access Unlocked
                  </span>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-slate-900">
                      {formatPrice(itPkg.price)}
                    </span>
                    <span className="text-[11px] text-slate-400">one-time</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              {access?.has_it ? (
                <button
                  id="dash-btn-view-it"
                  onClick={() => navigate('/jobs/it')}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>View IT Jobs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  id="dash-btn-buy-it"
                  onClick={() => onOpenCheckout('it')}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Unlock for {formatPrice(itPkg.price)}</span>
                </button>
              )}
            </div>
          </div>

          {/* 2. Non-IT Jobs Card */}
          <div
            id="dash-card-non-it"
            className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
              access?.has_non_it
                ? 'bg-emerald-50/40 border-emerald-300 shadow-xs'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Briefcase className="w-5 h-5" />
                </div>
                {access?.has_non_it ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> Access Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                    <Lock className="w-3 h-3 text-slate-400" /> Locked
                  </span>
                )}
              </div>

              <h3 className="font-bold text-slate-900 text-base">Non-IT Jobs</h3>
              <p className="text-xs text-slate-500 mt-1 min-h-[36px]">
                HR, Operations, Logistics, Sales & Marketing roles.
              </p>

              <div className="mt-3 mb-4">
                {access?.has_non_it ? (
                  <span className="text-xs font-semibold text-emerald-700">
                    Unlimited Access Unlocked
                  </span>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-slate-900">
                      {formatPrice(nonItPkg.price)}
                    </span>
                    <span className="text-[11px] text-slate-400">one-time</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              {access?.has_non_it ? (
                <button
                  id="dash-btn-view-non-it"
                  onClick={() => navigate('/jobs/non-it')}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>View Non-IT Jobs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  id="dash-btn-buy-non-it"
                  onClick={() => onOpenCheckout('non-it')}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Unlock for {formatPrice(nonItPkg.price)}</span>
                </button>
              )}
            </div>
          </div>

          {/* 3. Banking Jobs Card */}
          <div
            id="dash-card-banking"
            className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
              access?.has_banking
                ? 'bg-emerald-50/40 border-emerald-300 shadow-xs'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Landmark className="w-5 h-5" />
                </div>
                {access?.has_banking ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> Access Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                    <Lock className="w-3 h-3 text-slate-400" /> Locked
                  </span>
                )}
              </div>

              <h3 className="font-bold text-slate-900 text-base">Banking Jobs</h3>
              <p className="text-xs text-slate-500 mt-1 min-h-[36px]">
                Private/PSU Banks, Wealth, Risk Underwriting & NBFCs.
              </p>

              <div className="mt-3 mb-4">
                {access?.has_banking ? (
                  <span className="text-xs font-semibold text-emerald-700">
                    Unlimited Access Unlocked
                  </span>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-slate-900">
                      {formatPrice(bankingPkg.price)}
                    </span>
                    <span className="text-[11px] text-slate-400">one-time</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              {access?.has_banking ? (
                <button
                  id="dash-btn-view-banking"
                  onClick={() => navigate('/jobs/banking')}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>View Banking Jobs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  id="dash-btn-buy-banking"
                  onClick={() => onOpenCheckout('banking')}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Unlock for {formatPrice(bankingPkg.price)}</span>
                </button>
              )}
            </div>
          </div>

          {/* 4. All Access Pass Card */}
          <div
            id="dash-card-all"
            className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
              access?.has_all
                ? 'bg-purple-50/50 border-purple-300 shadow-sm'
                : 'bg-gradient-to-b from-slate-900 to-indigo-950 text-white border-indigo-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  access?.has_all ? 'bg-purple-100 text-purple-700' : 'bg-white/10 text-amber-300'
                }`}>
                  <Sparkles className="w-5 h-5" />
                </div>
                {access?.has_all ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> All Access Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Best Value
                  </span>
                )}
              </div>

              <h3 className={`font-bold text-base ${access?.has_all ? 'text-slate-900' : 'text-white'}`}>
                All Access Bundle
              </h3>
              <p className={`text-xs mt-1 min-h-[36px] ${access?.has_all ? 'text-slate-500' : 'text-slate-300'}`}>
                Unlocks all 3 categories (IT, Non-IT, Banking) together.
              </p>

              <div className="mt-3 mb-4">
                {access?.has_all ? (
                  <span className="text-xs font-semibold text-purple-700">
                    Complete Lifetime Pass Unlocked
                  </span>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-white">
                      {formatPrice(allPkg.price)}
                    </span>
                    <span className="text-[11px] text-slate-400">one-time</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              {access?.has_all ? (
                <button
                  id="dash-btn-view-all"
                  onClick={() => navigate('/jobs/all')}
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Browse All Categories</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  id="dash-btn-buy-all"
                  onClick={() => onOpenCheckout('all')}
                  className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Get All Access ({formatPrice(allPkg.price)})</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">
              Looking for a specific role?
            </h4>
            <p className="text-xs text-slate-500">
              Browse unlocked categories with instant search by company, title, or city.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/my-access')}
            className="px-4 py-2 text-xs font-semibold bg-white border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Check My Access Status
          </button>
        </div>
      </div>
    </div>
  );
};
