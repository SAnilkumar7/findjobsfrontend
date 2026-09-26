import React from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { usePackages } from '../context/PackagesContext.tsx';
import {
  Code,
  Briefcase,
  Landmark,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface PricingPageProps {
  navigate: (path: string) => void;
  onOpenCheckout: (slug: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ navigate, onOpenCheckout }) => {
  const { user, access } = useAuth();
  const { packages, formatPrice, getPackageBySlug } = usePackages();

  const itPkg = getPackageBySlug('it') || { price: 49, name: 'IT Jobs' };
  const nonItPkg = getPackageBySlug('non-it') || { price: 39, name: 'Non-IT Jobs' };
  const bankingPkg = getPackageBySlug('banking') || { price: 49, name: 'Banking Jobs' };
  const allPkg = getPackageBySlug('all') || { price: 99, name: 'All Access' };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Title */}
      <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
        <h1 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
          Transparent Pricing
        </h1>
        <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Simple, One-Time Access Plans
        </p>
        <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
          No recurring monthly fees. Pay once for the category you need, or get complete access to everything for only ₹99.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-16">
        {/* IT Jobs */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">IT Jobs Access</h3>
            <p className="text-xs text-slate-500 mt-1 min-h-[32px]">
              Software, Data, AI/ML, Cloud & DevOps roles.
            </p>
            <div className="my-5">
              <span className="text-3xl font-extrabold text-slate-900">
                {formatPrice(itPkg.price)}
              </span>
              <span className="text-xs text-slate-400 ml-1">one-time</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified tech listings</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>External application URLs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Salary & eligibility breakdowns</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <XCircle className="w-4 h-4 text-slate-300 shrink-0" />
                <span>Non-IT or Banking roles</span>
              </li>
            </ul>
          </div>
          <div className="pt-6">
            {access?.has_it ? (
              <button
                onClick={() => navigate('/jobs/it')}
                className="w-full py-3 bg-emerald-50 text-emerald-700 font-semibold rounded-xl text-xs border border-emerald-200"
              >
                ✓ Access Active • Browse
              </button>
            ) : (
              <button
                onClick={() => onOpenCheckout('it')}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Unlock for {formatPrice(itPkg.price)}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Non-IT Jobs */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Non-IT Jobs</h3>
            <p className="text-xs text-slate-500 mt-1 min-h-[32px]">
              HR, Operations, Logistics & Marketing.
            </p>
            <div className="my-5">
              <span className="text-3xl font-extrabold text-slate-900">
                {formatPrice(nonItPkg.price)}
              </span>
              <span className="text-xs text-slate-400 ml-1">one-time</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Corporate & operations jobs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>External application URLs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Requirements & qualifications</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <XCircle className="w-4 h-4 text-slate-300 shrink-0" />
                <span>IT or Banking roles</span>
              </li>
            </ul>
          </div>
          <div className="pt-6">
            {access?.has_non_it ? (
              <button
                onClick={() => navigate('/jobs/non-it')}
                className="w-full py-3 bg-emerald-50 text-emerald-700 font-semibold rounded-xl text-xs border border-emerald-200"
              >
                ✓ Access Active • Browse
              </button>
            ) : (
              <button
                onClick={() => onOpenCheckout('non-it')}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Unlock for {formatPrice(nonItPkg.price)}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Banking Jobs */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Landmark className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Banking Jobs</h3>
            <p className="text-xs text-slate-500 mt-1 min-h-[32px]">
              Private/PSU Banks, Wealth, Risk & FinTech.
            </p>
            <div className="my-5">
              <span className="text-3xl font-extrabold text-slate-900">
                {formatPrice(bankingPkg.price)}
              </span>
              <span className="text-xs text-slate-400 ml-1">one-time</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Commercial & Investment roles</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direct banking portal links</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Full eligibility & deadlines</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <XCircle className="w-4 h-4 text-slate-300 shrink-0" />
                <span>IT or Non-IT roles</span>
              </li>
            </ul>
          </div>
          <div className="pt-6">
            {access?.has_banking ? (
              <button
                onClick={() => navigate('/jobs/banking')}
                className="w-full py-3 bg-emerald-50 text-emerald-700 font-semibold rounded-xl text-xs border border-emerald-200"
              >
                ✓ Access Active • Browse
              </button>
            ) : (
              <button
                onClick={() => onOpenCheckout('banking')}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Unlock for {formatPrice(bankingPkg.price)}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* All Access Pass (Highlighted Best Value) */}
        <div className="relative bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 flex flex-col justify-between shadow-xl border-2 border-indigo-500/50">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm flex items-center gap-1 whitespace-nowrap">
            <Sparkles className="w-3 h-3" /> Recommended
          </div>
          <div>
            <div className="w-10 h-10 rounded-xl bg-white/10 text-amber-300 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-lg">All Access Pass</h3>
            <p className="text-xs text-indigo-200 mt-1 min-h-[32px]">
              Complete access to all three industries.
            </p>
            <div className="my-5">
              <span className="text-4xl font-extrabold text-white">
                {formatPrice(allPkg.price)}
              </span>
              <span className="text-xs text-indigo-300 ml-1">one-time</span>
            </div>
            <ul className="space-y-2 text-xs text-indigo-100 border-t border-indigo-800/80 pt-4">
              <li className="flex items-center gap-2 font-medium text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Unlocks IT Jobs</span>
              </li>
              <li className="flex items-center gap-2 font-medium text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Unlocks Non-IT Jobs</span>
              </li>
              <li className="flex items-center gap-2 font-medium text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Unlocks Banking Jobs</span>
              </li>
              <li className="flex items-center gap-2 font-medium text-amber-300">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Lifetime access with zero fees</span>
              </li>
            </ul>
          </div>
          <div className="pt-6">
            {access?.has_all ? (
              <button
                onClick={() => navigate('/jobs/all')}
                className="w-full py-3 bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-sm"
              >
                ✓ All Access Active
              </button>
            ) : (
              <button
                onClick={() => onOpenCheckout('all')}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <span>Get All Access for {formatPrice(allPkg.price)}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Feature Comparison Matrix */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8">
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Plan Comparison & Features
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider">
                <th className="py-3 pr-4 font-semibold">Features</th>
                <th className="py-3 px-4 font-semibold">IT Only ({formatPrice(itPkg.price)})</th>
                <th className="py-3 px-4 font-semibold">Non-IT Only ({formatPrice(nonItPkg.price)})</th>
                <th className="py-3 px-4 font-semibold">Banking Only ({formatPrice(bankingPkg.price)})</th>
                <th className="py-3 px-4 font-bold text-indigo-700 bg-indigo-50/50 rounded-t-xl">
                  All Access ({formatPrice(allPkg.price)})
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-3 pr-4 font-medium">IT & Software Jobs</td>
                <td className="py-3 px-4 text-emerald-600 font-bold">✓ Included</td>
                <td className="py-3 px-4 text-slate-300">—</td>
                <td className="py-3 px-4 text-slate-300">—</td>
                <td className="py-3 px-4 text-emerald-700 font-bold bg-indigo-50/30">✓ Included</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium">Non-IT & Operations Jobs</td>
                <td className="py-3 px-4 text-slate-300">—</td>
                <td className="py-3 px-4 text-emerald-600 font-bold">✓ Included</td>
                <td className="py-3 px-4 text-slate-300">—</td>
                <td className="py-3 px-4 text-emerald-700 font-bold bg-indigo-50/30">✓ Included</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium">Banking & Finance Jobs</td>
                <td className="py-3 px-4 text-slate-300">—</td>
                <td className="py-3 px-4 text-slate-300">—</td>
                <td className="py-3 px-4 text-emerald-600 font-bold">✓ Included</td>
                <td className="py-3 px-4 text-emerald-700 font-bold bg-indigo-50/30">✓ Included</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium">Official External Apply Links</td>
                <td className="py-3 px-4 text-emerald-600 font-bold">✓ Yes</td>
                <td className="py-3 px-4 text-emerald-600 font-bold">✓ Yes</td>
                <td className="py-3 px-4 text-emerald-600 font-bold">✓ Yes</td>
                <td className="py-3 px-4 text-emerald-700 font-bold bg-indigo-50/30">✓ Yes</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium">Payment Type</td>
                <td className="py-3 px-4">One-Time</td>
                <td className="py-3 px-4">One-Time</td>
                <td className="py-3 px-4">One-Time</td>
                <td className="py-3 px-4 font-semibold text-indigo-700 bg-indigo-50/30">One-Time</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
