

// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from '../context/AuthContext.tsx';
// import { Lock, Mail, User, Phone, MapPin, Calendar, ArrowRight, AlertCircle, Loader2, ShieldCheck, CheckCircle2 } from 'lucide-react';

// interface RegisterPageProps {
//   navigate: (path: string) => void;
// }

// export const RegisterPage: React.FC<RegisterPageProps> = ({ navigate }) => {
//   const { login } = useAuth();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [age, setAge] = useState('');
//   const [location, setLocation] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // OTP state
//   const [otpCode, setOtpCode] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [otpSending, setOtpSending] = useState(false);
//   const [otpVerifying, setOtpVerifying] = useState(false);
//   const [otpError, setOtpError] = useState<string | null>(null);
//   const [otpMessage, setOtpMessage] = useState<string | null>(null);
//   const [resendCooldown, setResendCooldown] = useState(0);
//   const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   const phoneDigits = phone.replace(/\D/g, '').slice(-10);
//   const isPhoneValid = phoneDigits.length === 10;

//   useEffect(() => {
//     return () => {
//       if (cooldownRef.current) clearInterval(cooldownRef.current);
//     };
//   }, []);

//   const startCooldown = () => {
//     setResendCooldown(30);
//     cooldownRef.current = setInterval(() => {
//       setResendCooldown((prev) => {
//         if (prev <= 1) {
//           if (cooldownRef.current) clearInterval(cooldownRef.current);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   // If phone number changes after being verified, require re-verification
//   const handlePhoneChange = (value: string) => {
//     setPhone(value);
//     if (otpVerified) {
//       setOtpVerified(false);
//       setOtpSent(false);
//       setOtpCode('');
//       setOtpMessage(null);
//     }
//   };

//   const handleSendOtp = async () => {
//     if (!isPhoneValid) {
//       setOtpError('Enter a valid 10-digit phone number');
//       return;
//     }
//     setOtpSending(true);
//     setOtpError(null);
//     setOtpMessage(null);

//     try {
//       const res = await fetch('/api/auth/send-otp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ phone: phoneDigits }),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         throw new Error(data.detail || 'Failed to send OTP');
//       }
//       setOtpSent(true);
//       setOtpMessage('OTP sent! Check your phone.');
//       startCooldown();
//     } catch (err: any) {
//       setOtpError(err.message || 'Failed to send OTP');
//     } finally {
//       setOtpSending(false);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     if (!otpCode.trim()) {
//       setOtpError('Enter the OTP sent to your phone');
//       return;
//     }
//     setOtpVerifying(true);
//     setOtpError(null);

//     try {
//       const res = await fetch('/api/auth/verify-otp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ phone: phoneDigits, otp_code: otpCode.trim() }),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         throw new Error(data.detail || 'Incorrect OTP');
//       }
//       setOtpVerified(true);
//       setOtpMessage('Phone number verified successfully!');
//       setOtpError(null);
//     } catch (err: any) {
//       setOtpError(err.message || 'Incorrect OTP');
//     } finally {
//       setOtpVerifying(false);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!isPhoneValid) {
//       setError('A valid phone number is required');
//       return;
//     }
//     if (!otpVerified) {
//       setError('Please verify your phone number with the OTP before continuing');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch('/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//           phone: phoneDigits,
//           otp_code: otpCode.trim(),
//           age: age ? Number(age) : undefined,
//           location: location || undefined,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         throw new Error(data.detail || 'Registration failed');
//       }

//       login(data.token, data.user);
//       navigate('/dashboard');
//     } catch (err: any) {
//       setError(err.message || 'Registration failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50">
//       <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
//         <div className="text-center mb-8">
//           <h1 className="text-2xl font-bold text-slate-900">Create Your Account</h1>
//           <p className="text-xs text-slate-500 mt-1">
//             Choose your category and unlock curated direct job links immediately
//           </p>
//         </div>

//         {error && (
//           <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
//             <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
//             <span>{error}</span>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-xs font-semibold text-slate-700 mb-1">
//               Full Name *
//             </label>
//             <div className="relative">
//               <input
//                 id="register-name"
//                 type="text"
//                 required
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="e.g. Priya Nair"
//                 className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
//               />
//               <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
//             </div>
//           </div>

//           <div>
//             <label className="block text-xs font-semibold text-slate-700 mb-1">
//               Email Address *
//             </label>
//             <div className="relative">
//               <input
//                 id="register-email"
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="name@example.com"
//                 className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
//               />
//               <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
//             </div>
//           </div>

//           <div>
//             <label className="block text-xs font-semibold text-slate-700 mb-1">
//               Password * (min 6 chars)
//             </label>
//             <div className="relative">
//               <input
//                 id="register-password"
//                 type="password"
//                 required
//                 minLength={6}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
//               />
//               <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
//             </div>
//           </div>

//           {/* Phone Number + OTP Verification (now mandatory) */}
//           <div>
//             <label className="block text-xs font-semibold text-slate-700 mb-1">
//               Phone Number *
//             </label>
//             <div className="flex gap-2">
//               <div className="relative flex-1">
//                 <input
//                   id="register-phone"
//                   type="tel"
//                   required
//                   value={phone}
//                   onChange={(e) => handlePhoneChange(e.target.value)}
//                   disabled={otpVerified}
//                   placeholder="98765 43210"
//                   className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white disabled:bg-emerald-50 disabled:text-emerald-800 disabled:border-emerald-200"
//                 />
//                 <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
//               </div>
//               {!otpVerified && (
//                 <button
//                   type="button"
//                   onClick={handleSendOtp}
//                   disabled={!isPhoneValid || otpSending || resendCooldown > 0}
//                   className="shrink-0 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
//                 >
//                   {otpSending ? (
//                     <Loader2 className="w-3.5 h-3.5 animate-spin" />
//                   ) : resendCooldown > 0 ? (
//                     <span>Resend in {resendCooldown}s</span>
//                   ) : otpSent ? (
//                     <span>Resend OTP</span>
//                   ) : (
//                     <span>Send OTP</span>
//                   )}
//                 </button>
//               )}
//               {otpVerified && (
//                 <div className="shrink-0 px-4 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl flex items-center gap-1.5">
//                   <CheckCircle2 className="w-3.5 h-3.5" /> Verified
//                 </div>
//               )}
//             </div>

//             {otpSent && !otpVerified && (
//               <div className="mt-2.5 flex gap-2">
//                 <div className="relative flex-1">
//                   <input
//                     type="text"
//                     inputMode="numeric"
//                     maxLength={6}
//                     value={otpCode}
//                     onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
//                     placeholder="Enter 6-digit OTP"
//                     className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
//                   />
//                   <ShieldCheck className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
//                 </div>
//                 <button
//                   type="button"
//                   onClick={handleVerifyOtp}
//                   disabled={otpVerifying || !otpCode.trim()}
//                   className="shrink-0 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
//                 >
//                   {otpVerifying ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span>Verify</span>}
//                 </button>
//               </div>
//             )}

//             {otpError && (
//               <p className="text-[11px] text-rose-600 mt-1.5 flex items-center gap-1">
//                 <AlertCircle className="w-3 h-3" /> {otpError}
//               </p>
//             )}
//             {otpMessage && !otpError && (
//               <p className="text-[11px] text-emerald-600 mt-1.5 flex items-center gap-1">
//                 <CheckCircle2 className="w-3 h-3" /> {otpMessage}
//               </p>
//             )}
//           </div>

//           {/* Optional fields from Section 7 */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
//             <div>
//               <label className="block text-xs font-medium text-slate-600 mb-1">
//                 Age <span className="text-slate-400">(Optional)</span>
//               </label>
//               <div className="relative">
//                 <input
//                   id="register-age"
//                   type="number"
//                   min={18}
//                   max={90}
//                   value={age}
//                   onChange={(e) => setAge(e.target.value)}
//                   placeholder="e.g. 24"
//                   className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
//                 />
//                 <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
//               </div>
//             </div>

//             <div>
//               <label className="block text-xs font-medium text-slate-600 mb-1">
//                 Current Location / City <span className="text-slate-400">(Optional)</span>
//               </label>
//               <div className="relative">
//                 <input
//                   id="register-location"
//                   type="text"
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                   placeholder="e.g. Bengaluru, Karnataka"
//                   className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
//                 />
//                 <MapPin className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
//               </div>
//             </div>
//           </div>

//           <button
//             id="register-submit-btn"
//             type="submit"
//             disabled={loading || !otpVerified}
//             className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-xs mt-2"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="w-4 h-4 animate-spin" /> Creating Account...
//               </>
//             ) : !otpVerified ? (
//               <span>Verify Phone Number to Continue</span>
//             ) : (
//               <>
//                 <span>Sign Up & Continue</span>
//                 <ArrowRight className="w-4 h-4" />
//               </>
//             )}
//           </button>
//         </form>

//         <p className="text-center text-xs text-slate-500 mt-6">
//           Already registered?{' '}
//           <button
//             onClick={() => navigate('/login')}
//             className="text-indigo-600 font-semibold hover:underline"
//           >
//             Sign in
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };













import React, { useState, useEffect, useRef } from 'react';

import { useAuth } from '../context/AuthContext.tsx';

import {
  Lock,
  Mail,
  User,
  Phone,
  MapPin,
  Calendar,
  ArrowRight,
  AlertCircle,
  Loader2,
  ShieldCheck,
  CheckCircle2,
  Eye,
  EyeOff,
} from 'lucide-react';

interface RegisterPageProps {
  navigate: (path: string) => void;
}

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

declare global {
  interface Window {
    google?: any;
  }
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ navigate }) => {
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Google Sign-In
  const googleBtnRef = useRef<HTMLDivElement>(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  // OTP state (email)
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);

  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpMessage, setOtpMessage] = useState<string | null>(null);

  const [resendCooldown, setResendCooldown] = useState(0);

  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    return () => {
      if (cooldownRef.current) {
        clearInterval(cooldownRef.current);
      }
    };
  }, []);

  // Load Google's Identity Services script and render the button
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;

    const scriptId = 'google-identity-script';

    const renderButton = () => {
      if (!window.google || !googleBtnRef.current) return;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredential,
      });

      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: 'outline',
        size: 'large',
        width: '320',
        text: 'signup_with',
      });
    };

    if (document.getElementById(scriptId)) {
      renderButton();
      return;
    }

    const script = document.createElement('script');

    script.id = scriptId;
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = renderButton;

    document.body.appendChild(script);
  }, []);

  const handleGoogleCredential = async (response: {
    credential: string;
  }) => {
    setGoogleLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential: response.credential,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || 'Google sign-up failed');
      }

      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err: any) {
      // FIXED: Extract specific error message from FastAPI 422 validation array
      let errorMessage = 'Google sign-up failed';
      
      if (err.message) {
        errorMessage = err.message;
      } else if (err.detail && Array.isArray(err.detail)) {
        // Handle FastAPI 422 Unprocessable Content errors
        errorMessage = err.detail[0]?.msg || 'Validation error';
      } else if (typeof err === 'object') {
        // Fallback for unexpected objects
        errorMessage = JSON.stringify(err);
      }

      setError(errorMessage);
    } finally {
      setGoogleLoading(false);
    }
  };

  const startCooldown = () => {
    setResendCooldown(30);

    cooldownRef.current = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          if (cooldownRef.current) {
            clearInterval(cooldownRef.current);
          }

          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);

    if (otpVerified) {
      setOtpVerified(false);
      setOtpSent(false);
      setOtpCode('');
      setOtpMessage(null);
    }
  };

  const handleSendOtp = async () => {
    if (!isEmailValid) {
      setOtpError('Enter a valid email address');
      return;
    }

    setOtpSending(true);
    setOtpError(null);
    setOtpMessage(null);

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || 'Failed to send OTP');
      }

      setOtpSent(true);
      setOtpMessage('OTP sent! Check your email inbox.');

      startCooldown();
    } catch (err: any) {
      setOtpError(err.message || 'Failed to send OTP');
    } finally {
      setOtpSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpCode.trim()) {
      setOtpError('Enter the OTP sent to your email');
      return;
    }

    setOtpVerifying(true);
    setOtpError(null);

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp_code: otpCode.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || 'Incorrect OTP');
      }

      setOtpVerified(true);
      setOtpMessage('Email verified successfully!');
      setOtpError(null);
    } catch (err: any) {
      setOtpError(err.message || 'Incorrect OTP');
    } finally {
      setOtpVerifying(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otpVerified) {
      setError('Please verify your email with the OTP before continuing');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          otp_code: otpCode.trim(),
          phone: phone || undefined,
          age: age ? Number(age) : undefined,
          location: location || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || 'Registration failed');
      }

      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Create Your Account
          </h1>

          <p className="text-xs text-slate-500 mt-1">
            Choose your category and unlock curated direct job links immediately
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Google Sign-Up */}
        {GOOGLE_CLIENT_ID && (
          <div className="mb-5">

            {googleLoading ? (
              <div className="w-full py-3 flex items-center justify-center gap-2 border border-slate-200 rounded-xl text-sm text-slate-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing up with Google...
              </div>
            ) : (
              <div ref={googleBtnRef} className="flex justify-center" />
            )}

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-slate-200" />

              <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                Or sign up with email
              </span>

              <div className="flex-1 h-px bg-slate-200" />
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name *
            </label>

            <div className="relative">
              <input
                id="register-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Nair"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />

              <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
            </div>
          </div>

          {/* Email Address + OTP Verification */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address *
            </label>

            <div className="flex gap-2">

              <div className="relative flex-1">
                <input
                  id="register-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  disabled={otpVerified}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white disabled:bg-emerald-50 disabled:text-emerald-800 disabled:border-emerald-200"
                />

                <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
              </div>

              {!otpVerified && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={!isEmailValid || otpSending || resendCooldown > 0}
                  className="shrink-0 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  {otpSending ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : resendCooldown > 0 ? (
                    <span>Resend in {resendCooldown}s</span>
                  ) : otpSent ? (
                    <span>Resend OTP</span>
                  ) : (
                    <span>Send OTP</span>
                  )}
                </button>
              )}

              {otpVerified && (
                <div className="shrink-0 px-4 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified
                </div>
              )}
            </div>

            {/* OTP Input */}
            {otpSent && !otpVerified && (
              <div className="mt-2.5 flex gap-2">

                <div className="relative flex-1">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) =>
                      setOtpCode(
                        e.target.value.replace(/\D/g, '')
                      )
                    }
                    placeholder="Enter 6-digit OTP"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />

                  <ShieldCheck className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                </div>

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={otpVerifying || !otpCode.trim()}
                  className="shrink-0 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  {otpVerifying ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <span>Verify</span>
                  )}
                </button>
              </div>
            )}

            {otpError && (
              <p className="text-[11px] text-rose-600 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {otpError}
              </p>
            )}

            {otpMessage && !otpError && (
              <p className="text-[11px] text-emerald-600 mt-1.5 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {otpMessage}
              </p>
            )}
          </div>

          {/* Password */}
          <div>

            <div className="mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Password * (min 6 chars)
              </label>
            </div>

            <div className="relative">
              <input
                id="register-password"
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 pr-10 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />

              {/* Show / Hide Password */}
              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-600"
                tabIndex={-1}
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {password && (
              <p className="text-[11px] text-slate-400 mt-1">
                {showPassword
                  ? 'Password visible — hide before sharing your screen.'
                  : 'Click the eye icon to reveal your password.'}
              </p>
            )}
          </div>

          {/* Optional Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Phone Number{' '}
                <span className="text-slate-400">
                  (Optional)
                </span>
              </label>

              <div className="relative">
                <input
                  id="register-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />

                <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Age{' '}
                <span className="text-slate-400">
                  (Optional)
                </span>
              </label>

              <div className="relative">
                <input
                  id="register-age"
                  type="number"
                  min={18}
                  max={90}
                  value={age}
                  onChange={(e) =>
                    setAge(e.target.value)
                  }
                  placeholder="e.g. 24"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                />

                <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
              </div>
            </div>
          </div>

          {/* Current Location */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Current Location / City{' '}
              <span className="text-slate-400">
                (Optional)
              </span>
            </label>

            <div className="relative">
              <input
                id="register-location"
                type="text"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                placeholder="e.g. Bengaluru, Karnataka"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />

              <MapPin className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            id="register-submit-btn"
            type="submit"
            disabled={loading || !otpVerified}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-xs mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating Account...
              </>
            ) : !otpVerified ? (
              <span>Verify Email to Continue</span>
            ) : (
              <>
                <span>Sign Up & Continue</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Already registered?{' '}

          <button
            onClick={() => navigate('/login')}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};