import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { PasswordChecklist, getPasswordIssues } from '../components/PasswordChecklist.tsx';

interface ForgotPasswordPageProps {
  navigate: (path: string) => void;
}

const API_URL = ((import.meta.env.VITE_BACKEND_URL as string) || '').replace(/\/$/, '');

type Step = 'email' | 'code' | 'password';

const safeJson = async (res: Response): Promise<any> => {
  try {
    return await res.json();
  } catch {
    return {};
  }
};

const getErrorMessage = (data: any, fallback: string): string => {
  if (!data) return fallback;
  if (typeof data.detail === 'string') return data.detail;
  if (Array.isArray(data.detail)) return data.detail[0]?.msg || fallback;
  return fallback;
};

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ navigate }) => {
  const [step, setStep] = useState<Step>('email');

  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [resendCooldown, setResendCooldown] = useState(0);
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  useEffect(() => {
    return () => {
      if (cooldownRef.current) clearInterval(cooldownRef.current);
    };
  }, []);

  const startCooldown = (seconds: number = 60) => {
    if (cooldownRef.current) clearInterval(cooldownRef.current);
    setResendCooldown(seconds);
    cooldownRef.current = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          if (cooldownRef.current) clearInterval(cooldownRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Step 1 (and "resend"): request a code
  const requestCode = async () => {
    if (!isEmailValid) {
      setError('Enter a valid email address');
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await safeJson(res);

      if (!res.ok) {
        throw new Error(getErrorMessage(data, 'Could not send reset code'));
      }

      setStep('code');
      setOtpCode('');
      setMessage('If an account exists for this email, a 6-digit code has been sent. It expires in 10 minutes.');
      startCooldown(60);
    } catch (err: any) {
      setError(err.message || 'Could not send reset code');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: verify the code
  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otpCode.trim().length !== 6) {
      setError('Enter the 6-digit code from your email');
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch(`${API_URL}/api/auth/verify-reset-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), otp_code: otpCode.trim() }),
      });
      const data = await safeJson(res);

      if (!res.ok) {
        if (res.status === 429) setOtpCode('');
        throw new Error(getErrorMessage(data, 'Invalid or expired code'));
      }

      setResetToken(data.reset_token);
      setStep('password');
    } catch (err: any) {
      setError(err.message || 'Invalid or expired code');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: set the new password
  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (getPasswordIssues(newPassword).length > 0) {
      setError('Password is too weak. Please meet all the rules below.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          reset_token: resetToken,
          new_password: newPassword,
        }),
      });
      const data = await safeJson(res);

      if (!res.ok) {
        throw new Error(getErrorMessage(data, 'Could not reset password'));
      }

      // LoginPage reads this flag and shows a success banner
      sessionStorage.setItem('passwordResetSuccess', '1');
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Could not reset password');
    } finally {
      setLoading(false);
    }
  };

  const titles: Record<Step, { title: string; subtitle: string }> = {
    email: {
      title: 'Forgot Password?',
      subtitle: "Enter your account email and we'll send you a reset code",
    },
    code: {
      title: 'Check Your Email',
      subtitle: `Enter the 6-digit code sent to ${email.trim()}`,
    },
    password: {
      title: 'Set New Password',
      subtitle: 'Choose a new password. Your account and purchased access stay exactly the same.',
    },
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">{titles[step].title}</h1>
          <p className="text-xs text-slate-500 mt-1">{titles[step].subtitle}</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {message && !error && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
            <span>{message}</span>
          </div>
        )}

        {/* STEP 1: email */}
        {step === 'email' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              requestCode();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="forgot-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
              </div>
            </div>

            <button
              id="forgot-send-btn"
              type="submit"
              disabled={loading || !isEmailValid}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending Code...
                </>
              ) : (
                <>
                  <span>Send Reset Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2: code */}
        {step === 'code' && (
          <form onSubmit={verifyCode} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                6-Digit Code
              </label>
              <div className="relative">
                <input
                  id="forgot-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  required
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit code"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
                <ShieldCheck className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
              </div>
            </div>

            <button
              id="forgot-verify-btn"
              type="submit"
              disabled={loading || otpCode.length !== 6}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <span>Verify Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => {
                  setStep('email');
                  setError(null);
                  setMessage(null);
                  setOtpCode('');
                }}
                className="text-slate-500 hover:text-slate-700 flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" />
                Change email
              </button>

              <button
                type="button"
                onClick={requestCode}
                disabled={loading || resendCooldown > 0}
                className="text-indigo-600 font-semibold hover:underline disabled:text-slate-400 disabled:no-underline"
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend code'}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: new password */}
        {step === 'password' && (
          <form onSubmit={resetPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  id="forgot-new-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full px-3.5 py-2.5 pr-10 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-600"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <PasswordChecklist
                password={newPassword}
                onSuggest={(p) => {
                  setNewPassword(p);
                  setConfirmPassword(p);
                  setShowPassword(true);
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="forgot-confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-[11px] text-rose-600 mt-1">Passwords do not match</p>
              )}
            </div>

            <button
              id="forgot-reset-btn"
              type="submit"
              disabled={
                loading ||
                getPasswordIssues(newPassword).length > 0 ||
                newPassword !== confirmPassword
              }
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <span>Update Password</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        <p className="text-center text-xs text-slate-500 mt-6">
          Remembered your password?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Back to sign in
          </button>
        </p>
      </div>
    </div>
  );
};