import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { usePackages } from '../context/PackagesContext.tsx';
import {
  Briefcase,
  ShieldCheck,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  Lock,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const { user, admin, access, logout } = useAuth();
  const { settings } = usePackages();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false);

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setJobsDropdownOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const siteTitle = settings?.site_name || 'JobAccess';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          id="nav-brand-logo"
          onClick={() => handleNav('/')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200 transition-transform group-hover:scale-105">
            <Briefcase className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-slate-900 tracking-tight leading-none">
              {siteTitle}
            </span>
            <span className="text-[10px] font-semibold text-indigo-600 tracking-wider uppercase">
              Paid Job Access
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium text-slate-700">
          <button
            id="nav-link-home"
            onClick={() => handleNav('/')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              currentPath === '/'
                ? 'bg-indigo-50 text-indigo-700 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Home
          </button>

          {/* Jobs Dropdown */}
          <div className="relative">
            <button
              id="nav-link-jobs-dropdown"
              onClick={() => setJobsDropdownOpen(!jobsDropdownOpen)}
              className={`px-3 py-2 rounded-lg flex items-center gap-1 transition-colors ${
                currentPath.startsWith('/jobs')
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>Jobs</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {jobsDropdownOpen && (
              <div
                className="absolute left-0 mt-2 w-56 rounded-xl bg-white border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                onMouseLeave={() => setJobsDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Job Categories
                </div>
                <button
                  id="nav-dropdown-it"
                  onClick={() => handleNav('/jobs/it')}
                  className="w-full text-left px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                >
                  <span>IT Jobs</span>
                  {access?.has_it ? (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-medium px-1.5 py-0.5 rounded-sm">
                      Unlocked
                    </span>
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>
                <button
                  id="nav-dropdown-non-it"
                  onClick={() => handleNav('/jobs/non-it')}
                  className="w-full text-left px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                >
                  <span>Non-IT Jobs</span>
                  {access?.has_non_it ? (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-medium px-1.5 py-0.5 rounded-sm">
                      Unlocked
                    </span>
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>
                <button
                  id="nav-dropdown-banking"
                  onClick={() => handleNav('/jobs/banking')}
                  className="w-full text-left px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                >
                  <span>Banking Jobs</span>
                  {access?.has_banking ? (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-medium px-1.5 py-0.5 rounded-sm">
                      Unlocked
                    </span>
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>
                <div className="border-t border-slate-100 my-1"></div>
                <button
                  id="nav-dropdown-all"
                  onClick={() => handleNav('/jobs/all')}
                  className="w-full text-left px-3.5 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> All Jobs View
                  </span>
                </button>
              </div>
            )}
          </div>

          <button
            id="nav-link-pricing"
            onClick={() => handleNav('/pricing')}
            className={`px-3 py-2 rounded-lg transition-colors ${
              currentPath === '/pricing'
                ? 'bg-indigo-50 text-indigo-700 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Pricing
          </button>

          {user && (
            <>
              <button
                id="nav-link-dashboard"
                onClick={() => handleNav('/dashboard')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentPath === '/dashboard'
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Dashboard
              </button>
              <button
                id="nav-link-my-access"
                onClick={() => handleNav('/my-access')}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentPath === '/my-access'
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                My Access
              </button>
            </>
          )}

          {admin && (
            <button
              id="nav-link-admin-panel"
              onClick={() => handleNav('/admin/dashboard')}
              className="px-2.5 py-1 text-xs font-semibold rounded-md bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 transition-colors flex items-center gap-1 ml-2"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" /> Admin Console
            </button>
          )}
        </nav>

        {/* User Right Section */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <button
                id="nav-user-profile-btn"
                onClick={() => handleNav('/profile')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-sm font-medium text-slate-800"
              >
                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[120px] truncate">{user.name}</span>
              </button>
              <button
                id="nav-logout-btn"
                onClick={handleLogout}
                title="Log out"
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                id="nav-login-btn"
                onClick={() => handleNav('/login')}
                className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Log In
              </button>
              <button
                id="nav-register-btn"
                onClick={() => handleNav('/register')}
                className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
              >
                Get Access
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          {admin && (
            <button
              onClick={() => handleNav('/admin/dashboard')}
              className="p-1.5 text-xs bg-amber-100 text-amber-800 rounded-md border border-amber-300"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          )}
          <button
            id="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          <button
            onClick={() => handleNav('/')}
            className={`w-full text-left px-3 py-2 rounded-lg text-base font-medium ${
              currentPath === '/' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-800'
            }`}
          >
            Home
          </button>
          <div className="pl-3 py-1 space-y-1">
            <div className="text-xs font-semibold text-slate-400 uppercase">Jobs Categories</div>
            <button
              onClick={() => handleNav('/jobs/it')}
              className="w-full text-left px-3 py-1.5 text-sm text-slate-700 flex justify-between"
            >
              <span>IT Jobs</span>
              {access?.has_it && <span className="text-xs text-emerald-600 font-medium">✓ Unlocked</span>}
            </button>
            <button
              onClick={() => handleNav('/jobs/non-it')}
              className="w-full text-left px-3 py-1.5 text-sm text-slate-700 flex justify-between"
            >
              <span>Non-IT Jobs</span>
              {access?.has_non_it && <span className="text-xs text-emerald-600 font-medium">✓ Unlocked</span>}
            </button>
            <button
              onClick={() => handleNav('/jobs/banking')}
              className="w-full text-left px-3 py-1.5 text-sm text-slate-700 flex justify-between"
            >
              <span>Banking Jobs</span>
              {access?.has_banking && <span className="text-xs text-emerald-600 font-medium">✓ Unlocked</span>}
            </button>
            <button
              onClick={() => handleNav('/jobs/all')}
              className="w-full text-left px-3 py-1.5 text-sm font-semibold text-indigo-600"
            >
              All Jobs
            </button>
          </div>
          <button
            onClick={() => handleNav('/pricing')}
            className={`w-full text-left px-3 py-2 rounded-lg text-base font-medium ${
              currentPath === '/pricing' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-800'
            }`}
          >
            Pricing
          </button>
          {user ? (
            <>
              <button
                onClick={() => handleNav('/dashboard')}
                className={`w-full text-left px-3 py-2 rounded-lg text-base font-medium ${
                  currentPath === '/dashboard' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-800'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => handleNav('/my-access')}
                className={`w-full text-left px-3 py-2 rounded-lg text-base font-medium ${
                  currentPath === '/my-access' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-800'
                }`}
              >
                My Access
              </button>
              <button
                onClick={() => handleNav('/profile')}
                className={`w-full text-left px-3 py-2 rounded-lg text-base font-medium ${
                  currentPath === '/profile' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-800'
                }`}
              >
                Profile ({user.name})
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-rose-600 font-medium text-base rounded-lg flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Log Out
              </button>
            </>
          ) : (
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => handleNav('/login')}
                className="w-full py-2.5 text-center font-medium border border-slate-300 rounded-lg text-slate-700"
              >
                Log In
              </button>
              <button
                onClick={() => handleNav('/register')}
                className="w-full py-2.5 text-center font-semibold bg-indigo-600 text-white rounded-lg"
              >
                Sign Up & Unlock Jobs
              </button>
            </div>
          )}

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Admin Portal</span>
            <button
              onClick={() => handleNav(admin ? '/admin/dashboard' : '/admin/login')}
              className="text-indigo-600 font-medium hover:underline"
            >
              {admin ? 'Go to Admin Dashboard' : 'Admin Login'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
