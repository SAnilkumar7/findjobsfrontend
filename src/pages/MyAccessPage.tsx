import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { usePackages } from '../context/PackagesContext.tsx';
import {
  Code,
  Briefcase,
  Landmark,
  Sparkles,
  CheckCircle2,
  XCircle,
  Lock,
  ArrowRight,
  Shield,
  Layers,
} from 'lucide-react';

interface MyAccessPageProps {
  navigate: (path: string) => void;
  onOpenCheckout: (slug: string) => void;
}

export const MyAccessPage: React.FC<MyAccessPageProps> = ({ navigate, onOpenCheckout }) => {
  const { user, access, refreshAccess } = useAuth();
  const { getPackageBySlug, formatPrice } = usePackages();

  useEffect(() => {
    refreshAccess();
  }, [refreshAccess]);

  const categories = [
    {
      id: 'it',
      name: 'IT Jobs Access',
      icon: <Code className="w-5 h-5 text-blue-600" />,
      desc: 'Software Engineering, DevOps, Cloud, AI/ML, and Data Analytics.',
      isActive: Boolean(access?.has_it),
      pkg: getPackageBySlug('it') || { price: 49 },
    },
    {
      id: 'non-it',
      name: 'Non-IT Jobs Access',
      icon: <Briefcase className="w-5 h-5 text-amber-600" />,
      desc: 'Operations, Human Resources, Supply Chain, and Digital Marketing.',
      isActive: Boolean(access?.has_non_it),
      pkg: getPackageBySlug('non-it') || { price: 39 },
    },
    {
      id: 'banking',
      name: 'Banking Jobs Access',
      icon: <Landmark className="w-5 h-5 text-emerald-600" />,
      desc: 'Commercial Banking, Wealth Management, Risk Analysis, and FinTech.',
      isActive: Boolean(access?.has_banking),
      pkg: getPackageBySlug('banking') || { price: 49 },
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
          <Layers className="w-4 h-4" /> Account Entitlements
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          My Category Access
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review which job categories are unlocked on your account ({user?.email}). Access is granted immediately upon Razorpay verification.
        </p>
      </div>

      {/* Access Status Cards */}
      <div className="space-y-4 mb-8">
        {categories.map((cat) => (
          <div
            key={cat.id}
            id={`access-row-${cat.id}`}
            className={`bg-white rounded-2xl border p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
              cat.isActive
                ? 'border-emerald-200 shadow-xs'
                : 'border-slate-200 bg-slate-50/50'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                {cat.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">{cat.name}</h3>
                  {cat.isActive ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-200/80 px-2.5 py-0.5 rounded-full">
                      <XCircle className="w-3 h-3 text-slate-400" /> Not Purchased
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1 max-w-lg">{cat.desc}</p>
              </div>
            </div>

            <div className="w-full sm:w-auto flex items-center justify-end">
              {cat.isActive ? (
                <button
                  onClick={() => navigate(`/jobs/${cat.id}`)}
                  className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Browse Jobs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => onOpenCheckout(cat.id)}
                  className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Unlock ({formatPrice(cat.pkg.price)})</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* All Access Bundle Banner */}
      {!access?.has_all && (
        <div className="bg-gradient-to-r from-indigo-900 to-purple-950 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Best Value Upgrade
            </span>
            <h4 className="text-lg font-bold text-white">
              Upgrade to All Access Pass for ₹99
            </h4>
            <p className="text-xs text-indigo-200">
              Instantly activate all three categories simultaneously with lifetime access.
            </p>
          </div>
          <button
            onClick={() => onOpenCheckout('all')}
            className="w-full sm:w-auto px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition-colors whitespace-nowrap shadow-sm"
          >
            Upgrade to All Access
          </button>
        </div>
      )}
    </div>
  );
};
