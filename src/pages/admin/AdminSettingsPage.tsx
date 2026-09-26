import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { usePackages } from '../../context/PackagesContext.tsx';
import type { SiteSettings } from '../../types/index.ts';
import {
  Settings,
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
  Globe,
  Mail,
  Phone,
  DollarSign,
} from 'lucide-react';

interface AdminSettingsPageProps {
  navigate: (path: string) => void;
}

export const AdminSettingsPage: React.FC<AdminSettingsPageProps> = ({ navigate }) => {
  const { adminToken } = useAuth();
  const { refreshPackages } = usePackages();

  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form Fields
  const [siteName, setSiteName] = useState('');
  const [siteLogo, setSiteLogo] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [currencySymbol, setCurrencySymbol] = useState('₹');

  // The 4 prices (Section 8)
  const [itPrice, setItPrice] = useState(49);
  const [nonItPrice, setNonItPrice] = useState(39);
  const [bankingPrice, setBankingPrice] = useState(49);
  const [allPrice, setAllPrice] = useState(99);

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }

    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/admin/settings');
        if (res.ok) {
          const data: SiteSettings = await res.json();
          setSettings(data);
          setSiteName(data.site_name);
          setSiteLogo(data.site_logo || '');
          setContactEmail(data.contact_email);
          setContactPhone(data.contact_phone || '');
          setCurrencySymbol(data.currency_symbol || '₹');
          setItPrice(data.price_it);
          setNonItPrice(data.price_non_it);
          setBankingPrice(data.price_banking);
          setAllPrice(data.price_all);
        }
      } catch (err) {
        console.error('Failed to load settings', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [adminToken, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken) return;

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          site_name: siteName,
          site_logo: siteLogo,
          contact_email: contactEmail,
          contact_phone: contactPhone,
          currency_symbol: currencySymbol,
          price_it: Number(itPrice),
          price_non_it: Number(nonItPrice),
          price_banking: Number(bankingPrice),
          price_all: Number(allPrice),
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update platform settings');
      }

      await refreshPackages();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Error updating settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600 mb-2" />
        <p className="text-xs">Loading configuration settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button
        onClick={() => navigate('/admin/dashboard')}
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-4"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        <div className="pb-6 mb-6 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
            <Settings className="w-4 h-4" /> Section 8 Compliance
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Platform Settings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure site name, logo, contact channels, and the four pricing tiers
          </p>
        </div>

        {success && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Platform settings updated successfully!</span>
          </div>
        )}

        {error && (
          <div className="mb-6 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Branding */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Branding & Contact Information
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Site / Application Name
              </label>
              <input
                type="text"
                required
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Support / Contact Email
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Support Phone (Optional)
                </label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Pricing Config (Section 8: The four prices) */}
          <div className="pt-4 border-t border-slate-200 space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              The Four Pricing Tiers (INR)
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  IT Jobs Price
                </label>
                <div className="flex items-center bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5">
                  <span className="text-xs font-bold text-slate-400 mr-1.5">₹</span>
                  <input
                    type="number"
                    min={1}
                    value={itPrice}
                    onChange={(e) => setItPrice(Number(e.target.value))}
                    className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Non-IT Jobs Price
                </label>
                <div className="flex items-center bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5">
                  <span className="text-xs font-bold text-slate-400 mr-1.5">₹</span>
                  <input
                    type="number"
                    min={1}
                    value={nonItPrice}
                    onChange={(e) => setNonItPrice(Number(e.target.value))}
                    className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Banking Jobs Price
                </label>
                <div className="flex items-center bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5">
                  <span className="text-xs font-bold text-slate-400 mr-1.5">₹</span>
                  <input
                    type="number"
                    min={1}
                    value={bankingPrice}
                    onChange={(e) => setBankingPrice(Number(e.target.value))}
                    className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  All Access Bundle
                </label>
                <div className="flex items-center bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5">
                  <span className="text-xs font-bold text-slate-400 mr-1.5">₹</span>
                  <input
                    type="number"
                    min={1}
                    value={allPrice}
                    onChange={(e) => setAllPrice(Number(e.target.value))}
                    className="w-full text-xs font-bold text-slate-900 bg-transparent focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </>
              ) : (
                <span>Save All Settings</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
