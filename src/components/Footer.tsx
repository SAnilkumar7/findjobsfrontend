import React from 'react';
import { Briefcase, Shield, CheckCircle2, Lock } from 'lucide-react';
import { usePackages } from '../context/PackagesContext.tsx';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { settings } = usePackages();
  const siteName = settings?.site_name || 'JobAccess';

  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">
                {siteName}
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              Curated direct-access job board for IT, Non-IT, and Banking careers.
              Pay once for your chosen category to browse verified listings and apply
              directly via external hiring portals.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-600" /> Verified Listings
              </span>
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-indigo-600" /> Razorpay Secured
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Instant Access
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate('/jobs/it')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  IT & Software Jobs
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/jobs/non-it')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Non-IT & Operations
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/jobs/banking')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Banking & Finance
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/pricing')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  All Access Pass (₹99)
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Pages */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Legal & Policies
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate('/terms')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/privacy')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/refund')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Refund Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/disclaimer')}
                  className="hover:text-indigo-600 transition-colors font-medium text-amber-700"
                >
                  Disclaimer & Hiring Notice
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {siteName}. All rights reserved. Platform provides curated job links only; does not guarantee interviews or employment.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/login')}
              className="text-slate-400 hover:text-slate-600 underline"
            >
              Admin Access
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
