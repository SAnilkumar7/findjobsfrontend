import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { usePackages } from '../../context/PackagesContext.tsx';
import type { DashboardStats } from '../../types/index.ts';
import {
  Users,
  Briefcase,
  CreditCard,
  TrendingUp,
  PlusCircle,
  Tag,
  Settings,
  ShieldCheck,
  Code,
  Landmark,
  Layers,
  ArrowRight,
  LogOut,
  Loader2,
} from 'lucide-react';

interface AdminDashboardPageProps {
  navigate: (path: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ navigate }) => {
  const { admin, adminToken, adminLogout } = useAuth();
  const { formatPrice } = usePackages();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats', {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error('Failed to load admin stats', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [adminToken, navigate]);

  if (loading) {
    return (
      <div className="py-24 text-center text-slate-400 space-y-3">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-amber-500" />
        <p className="text-sm">Loading admin metrics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" /> Admin Console
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Platform Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Signed in as {admin?.email} ({admin?.role})
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => navigate('/admin/jobs/add')}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <PlusCircle className="w-4 h-4" /> Add New Job
          </button>
          <button
            onClick={() => {
              adminLogout();
              navigate('/admin/login');
            }}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl text-xs flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Exit Console
          </button>
        </div>
      </div>

      {/* Primary Stat Cards (Section 8: Total users, total jobs, jobs per category, total payments, total revenue) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Total Users */}
        <div
          onClick={() => navigate('/admin/users')}
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase">Total Users</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            {stats?.total_users ?? 0}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Registered job seekers</span>
        </div>

        {/* Total Jobs */}
        <div
          onClick={() => navigate('/admin/jobs')}
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase">Total Jobs</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            {stats?.total_jobs ?? 0}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Active across categories</span>
        </div>

        {/* Total Payments */}
        <div
          onClick={() => navigate('/admin/payments')}
          className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase">Successful Orders</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            {stats?.total_payments ?? 0}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Verified Razorpay orders</span>
        </div>

        {/* Total Revenue */}
        <div
          onClick={() => navigate('/admin/payments')}
          className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-5 shadow-xs cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-indigo-200 uppercase">Total Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-white/10 text-amber-300 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">
            {formatPrice(stats?.total_revenue ?? 0)}
          </div>
          <span className="text-[11px] text-indigo-200 mt-1 block">Gross settled collections</span>
        </div>
      </div>

      {/* Jobs per Category Breakdown */}
      <div className="mb-10">
        <h2 className="text-base font-bold text-slate-900 mb-4">
          Jobs per Category (Section 8)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Code className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase">IT & Software</span>
              <div className="text-2xl font-bold text-slate-900">
                {stats?.jobs_per_category?.it ?? 0} Jobs
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase">Non-IT & Operations</span>
              <div className="text-2xl font-bold text-slate-900">
                {stats?.jobs_per_category?.non_it ?? 0} Jobs
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase">Banking & Finance</span>
              <div className="text-2xl font-bold text-slate-900">
                {stats?.jobs_per_category?.banking ?? 0} Jobs
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Management Navigation Hub */}
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-4">
          Admin Management Modules
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            id="admin-nav-jobs"
            onClick={() => navigate('/admin/jobs')}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-xs transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Manage Jobs</h3>
            <p className="text-xs text-slate-500 mt-1">
              Add, edit, publish/unpublish, or delete job listings.
            </p>
          </button>

          <button
            id="admin-nav-pricing"
            onClick={() => navigate('/admin/categories')}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-xs transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Tag className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Categories & Pricing</h3>
            <p className="text-xs text-slate-500 mt-1">
              Configure prices per category and All Access bundle.
            </p>
          </button>

          <button
            id="admin-nav-users"
            onClick={() => navigate('/admin/users')}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-xs transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">User Directory</h3>
            <p className="text-xs text-slate-500 mt-1">
              Inspect user accounts, active entitlements, or toggle access.
            </p>
          </button>

          <button
            id="admin-nav-settings"
            onClick={() => navigate('/admin/settings')}
            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-xs transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Settings className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Platform Settings</h3>
            <p className="text-xs text-slate-500 mt-1">
              Configure brand name, logo, support email, and currency.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
