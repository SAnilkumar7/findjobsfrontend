import React from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { User, Mail, Phone, MapPin, Calendar, ShieldCheck, LogOut, CheckCircle2 } from 'lucide-react';

interface ProfilePageProps {
  navigate: (path: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ navigate }) => {
  const { user, access, logout } = useAuth();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const formattedDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Recent Member';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-slate-200 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-3xl font-extrabold shadow-sm">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
              <span className="text-[11px] font-semibold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-200">
                Job Seeker Account
              </span>
            </div>
            <p className="text-xs text-slate-500">{user.email}</p>
            <p className="text-[11px] text-slate-400">Member since {formattedDate}</p>
          </div>
        </div>

        {/* Profile Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-b border-slate-200 text-xs">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <Mail className="w-4 h-4 text-slate-400" />
            <div>
              <span className="text-slate-400 block text-[10px]">Email Address</span>
              <span className="text-slate-800 font-medium">{user.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <Phone className="w-4 h-4 text-slate-400" />
            <div>
              <span className="text-slate-400 block text-[10px]">Phone</span>
              <span className="text-slate-800 font-medium">{user.phone || 'Not provided'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <MapPin className="w-4 h-4 text-slate-400" />
            <div>
              <span className="text-slate-400 block text-[10px]">Location</span>
              <span className="text-slate-800 font-medium">{user.location || 'India'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
            <Calendar className="w-4 h-4 text-slate-400" />
            <div>
              <span className="text-slate-400 block text-[10px]">Age</span>
              <span className="text-slate-800 font-medium">{user.age ? `${user.age} years` : 'Not provided'}</span>
            </div>
          </div>
        </div>

        {/* Unlocked Entitlements */}
        <div className="py-6 border-b border-slate-200">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
            Active Category Access
          </h3>
          <div className="flex flex-wrap gap-2">
            {access?.has_it && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> IT Jobs
              </span>
            )}
            {access?.has_non_it && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Non-IT Jobs
              </span>
            )}
            {access?.has_banking && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Banking Jobs
              </span>
            )}
            {!access?.has_it && !access?.has_non_it && !access?.has_banking && (
              <div className="text-xs text-slate-500">
                No active categories purchased yet.{' '}
                <button
                  onClick={() => navigate('/pricing')}
                  className="text-indigo-600 font-semibold underline"
                >
                  View plans
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 flex justify-between items-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            ← Back to Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-xl text-xs transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
