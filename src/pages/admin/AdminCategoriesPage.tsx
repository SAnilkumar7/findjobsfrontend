import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { usePackages } from '../../context/PackagesContext.tsx';
import {
  Tag,
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
  Code,
  Briefcase,
  Landmark,
  Sparkles,
} from 'lucide-react';

interface AdminCategoriesPageProps {
  navigate: (path: string) => void;
}

export const AdminCategoriesPage: React.FC<AdminCategoriesPageProps> = ({ navigate }) => {
  const { adminToken } = useAuth();
  const { packages, refreshPackages, formatPrice } = usePackages();

  const [savingId, setSavingId] = useState<string | null>(null);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handlePriceChange = (pkgId: string, val: string) => {
    setPrices((prev) => ({
      ...prev,
      [pkgId]: Number(val),
    }));
  };

  const handleSavePrice = async (pkgId: string) => {
    if (!adminToken) return;
    const newPrice = prices[pkgId];
    if (newPrice === undefined || isNaN(newPrice) || newPrice <= 0) {
      setErrorMsg('Please enter a valid price amount greater than 0.');
      return;
    }

    setSavingId(pkgId);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(`/api/admin/packages/${pkgId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ price: newPrice }),
      });

      if (!res.ok) {
        throw new Error('Failed to update package price');
      }

      await refreshPackages();
      setSuccessMsg('Price updated successfully! Live across the whole application.');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error updating price');
    } finally {
      setSavingId(null);
    }
  };

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'it':
        return <Code className="w-5 h-5 text-blue-600" />;
      case 'non-it':
        return <Briefcase className="w-5 h-5 text-amber-600" />;
      case 'banking':
        return <Landmark className="w-5 h-5 text-emerald-600" />;
      case 'all':
        return <Sparkles className="w-5 h-5 text-purple-600" />;
      default:
        return <Tag className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button
        onClick={() => navigate('/admin/dashboard')}
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-4"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        <div className="pb-6 mb-6 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
            <Tag className="w-4 h-4" /> Section 8 Compliance
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Categories & Live Pricing
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Prices configured here are read live everywhere in the frontend and enforced server-side for Razorpay order generation. No prices are hard-coded.
          </p>
        </div>

        {successMsg && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="space-y-4">
          {packages.map((pkg) => {
            const currentVal = prices[pkg.id] !== undefined ? prices[pkg.id] : pkg.price;
            const isSaving = savingId === pkg.id;

            return (
              <div
                key={pkg.id}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                    {getCategoryIcon(pkg.slug)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm">{pkg.name}</h3>
                      <span className="text-[10px] font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded-sm">
                        slug: {pkg.slug}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 max-w-md">
                      {pkg.description}
                    </p>
                  </div>
                </div>

                {/* Price input & save */}
                <div className="w-full sm:w-auto flex items-center gap-3">
                  <div className="flex items-center bg-white border border-slate-300 rounded-xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-indigo-500">
                    <span className="text-xs font-bold text-slate-400 mr-1.5">₹</span>
                    <input
                      type="number"
                      min={1}
                      value={currentVal}
                      onChange={(e) => handlePriceChange(pkg.id, e.target.value)}
                      className="w-20 text-sm font-bold text-slate-900 focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={() => handleSavePrice(pkg.id)}
                    disabled={isSaving}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Updating...
                      </>
                    ) : (
                      <span>Save Price</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
