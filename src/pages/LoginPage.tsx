

// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from '../context/AuthContext.tsx';
// import {
//   Mail,
//   ArrowRight,
//   AlertCircle,
//   Loader2,
//   Eye,
//   EyeOff,
// } from 'lucide-react';

// interface LoginPageProps {
//   navigate: (path: string) => void;
// }

// const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

// declare global {
//   interface Window {
//     google?: any;
//   }
// }

// export const LoginPage: React.FC<LoginPageProps> = ({ navigate }) => {
//   const { login } = useAuth();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [showPassword, setShowPassword] = useState(false);

//   // Google Sign-In
//   const googleBtnRef = useRef<HTMLDivElement>(null);
//   const [googleLoading, setGoogleLoading] = useState(false);

//   const handleGoogleCredential = async (response: { credential: string }) => {
//     setGoogleLoading(true);
//     setError(null);

//     try {
//       const res = await fetch('/api/auth/google', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ credential: response.credential }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(
//           typeof data.detail === 'string' ? data.detail : 'Google sign-in failed'
//         );
//       }

//       login(data.token, data.user);
//       navigate('/dashboard');
//     } catch (err: any) {
//       setError(err.message || 'Google sign-in failed');
//     } finally {
//       setGoogleLoading(false);
//     }
//   };

//   // Load Google's script and render the real Google button
//   useEffect(() => {
//     if (!GOOGLE_CLIENT_ID) return;

//     const scriptId = 'google-identity-script';

//     const renderButton = () => {
//       if (!window.google || !googleBtnRef.current) return;

//       window.google.accounts.id.initialize({
//         client_id: GOOGLE_CLIENT_ID,
//         callback: handleGoogleCredential,
//       });

//       window.google.accounts.id.renderButton(googleBtnRef.current, {
//         theme: 'outline',
//         size: 'large',
//         width: 320, // must be a number (pixels), not '100%'
//         text: 'continue_with',
//       });
//     };

//     if (document.getElementById(scriptId)) {
//       renderButton();
//       return;
//     }

//     const script = document.createElement('script');
//     script.id = scriptId;
//     script.src = 'https://accounts.google.com/gsi/client';
//     script.async = true;
//     script.defer = true;
//     script.onload = renderButton;
//     document.body.appendChild(script);
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setShowPassword(false);
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(
//           typeof data.detail === 'string'
//             ? data.detail
//             : data.message || 'Login failed'
//         );
//       }

//       login(data.token, data.user);
//       navigate('/dashboard');
//     } catch (err: any) {
//       setError(err.message || 'Failed to sign in');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50">
//       <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
//         <div className="text-center mb-8">
//           <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
//           <p className="text-xs text-slate-500 mt-1">
//             Sign in to view your unlocked job categories
//           </p>
//         </div>

//         {/* Demo Credentials Helper */}
//         <div className="mb-6 p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-900 space-y-1">
//           <div className="font-semibold">Quick Demo Account:</div>

//           <div className="flex justify-between text-[11px] text-slate-600">
//             <span>
//               Email: <strong>jobseeker@example.com</strong>
//             </span>
//             <span>
//               Password: <strong>user123</strong>
//             </span>
//           </div>

//           <button
//             type="button"
//             onClick={() => {
//               setEmail('jobseeker@example.com');
//               setPassword('user123');
//               setShowPassword(false);
//             }}
//             className="text-[11px] text-indigo-600 underline font-medium cursor-pointer"
//           >
//             Auto-fill demo credentials
//           </button>
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
//               Email Address
//             </label>

//             <div className="relative">
//               <input
//                 id="login-email"
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
//             <div className="flex justify-between items-center mb-1">
//               <label className="block text-xs font-semibold text-slate-700">
//                 Password
//               </label>
//             </div>

//             <div className="relative">
//               <input
//                 id="login-password"
//                 type={showPassword ? 'text' : 'password'}
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 className="w-full px-3.5 py-2.5 pr-10 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-600"
//                 tabIndex={-1}
//                 aria-label={showPassword ? 'Hide password' : 'Show password'}
//               >
//                 {showPassword ? (
//                   <EyeOff className="w-4 h-4" />
//                 ) : (
//                   <Eye className="w-4 h-4" />
//                 )}
//               </button>
//             </div>

//             {password && (
//               <p className="text-[11px] text-slate-400 mt-1">
//                 {showPassword
//                   ? 'Password visible — hide before sharing your screen.'
//                   : 'Click the eye icon to reveal your password.'}
//               </p>
//             )}
//           </div>

//           <button
//             id="login-submit-btn"
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="w-4 h-4 animate-spin" />
//                 Signing In...
//               </>
//             ) : (
//               <>
//                 <span>Sign In</span>
//                 <ArrowRight className="w-4 h-4" />
//               </>
//             )}
//           </button>
//         </form>

//         {GOOGLE_CLIENT_ID && (
//           <>
//             <div className="relative my-6">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-slate-200"></div>
//               </div>
//               <div className="relative flex justify-center text-xs text-slate-400 uppercase">
//                 <span className="bg-white px-2">Or continue with</span>
//               </div>
//             </div>

//             {googleLoading ? (
//               <div className="w-full py-3 flex items-center justify-center gap-2 border border-slate-200 rounded-xl text-sm text-slate-500">
//                 <Loader2 className="w-4 h-4 animate-spin" />
//                 Signing in with Google...
//               </div>
//             ) : (
//               <div ref={googleBtnRef} className="flex justify-center" />
//             )}
//           </>
//         )}

//         <p className="text-center text-xs text-slate-500 mt-6">
//           Don&apos;t have an account?{' '}
//           <button
//             onClick={() => navigate('/register')}
//             className="text-indigo-600 font-semibold hover:underline"
//           >
//             Create account
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };
















import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import {
  Mail,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Eye,
  EyeOff,
} from 'lucide-react';

interface LoginPageProps {
  navigate: (path: string) => void;
}

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

declare global {
  interface Window {
    google?: any;
  }
}

export const LoginPage: React.FC<LoginPageProps> = ({ navigate }) => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Shown after a successful password reset
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('passwordResetSuccess')) {
      sessionStorage.removeItem('passwordResetSuccess');
      setResetSuccess(true);
    }
  }, []);

  // Google Sign-In
  const googleBtnRef = useRef<HTMLDivElement>(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleCredential = async (response: { credential: string }) => {
    setGoogleLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          typeof data.detail === 'string' ? data.detail : 'Google sign-in failed'
        );
      }

      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed');
    } finally {
      setGoogleLoading(false);
    }
  };

  // Load Google's script and render the real Google button
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
        width: 320, // must be a number (pixels), not '100%'
        text: 'continue_with',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowPassword(false);
    setLoading(true);
    setError(null);
    setResetSuccess(false);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          typeof data.detail === 'string'
            ? data.detail
            : data.message || 'Login failed'
        );
      }

      login(data.token, data.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">It's Wonderful to Have You Here!</h1>
          <p className="text-xs text-slate-500 mt-1">
            Sign in to view your unlocked job categories
          </p>
        </div>

        {/* ===== Demo credentials helper: DELETE THIS WHOLE BLOCK BEFORE PUBLIC LAUNCH ===== */}
        {/* <div className="mb-6 p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-900 space-y-1">
          <div className="font-semibold">Quick Demo Account:</div>

          <div className="flex justify-between text-[11px] text-slate-600">
            <span>
              Email: <strong>jobseeker@example.com</strong>
            </span>
            <span>
              Password: <strong>user123</strong>
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setEmail('jobseeker@example.com');
              setPassword('user123');
              setShowPassword(false);
            }}
            className="text-[11px] text-indigo-600 underline font-medium cursor-pointer"
          >
            Auto-fill demo credentials
          </button>
        </div> */}
        {/* ===== end of demo block ===== */}

        {resetSuccess && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
            <span>Password updated. Sign in with your new password.</span>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>

            <div className="relative">
              <input
                id="login-email"
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

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Password
              </label>
              <button
                id="login-forgot-password"
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-xs text-indigo-600 font-semibold hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 pr-10 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-600"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
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

          <button
            id="login-submit-btn"
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {GOOGLE_CLIENT_ID && (
          <>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs text-slate-400 uppercase">
                <span className="bg-white px-2">Or continue with</span>
              </div>
            </div>

            {googleLoading ? (
              <div className="w-full py-3 flex items-center justify-center gap-2 border border-slate-200 rounded-xl text-sm text-slate-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in with Google...
              </div>
            ) : (
              <div ref={googleBtnRef} className="flex justify-center" />
            )}
          </>
        )}

        <p className="text-center text-xs text-slate-500 mt-6">
          Don&apos;t have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Create account
          </button>
        </p>
      </div>
    </div>
  );
};