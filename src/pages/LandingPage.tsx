// import React from 'react';
// import { useAuth } from '../context/AuthContext.tsx';
// import { usePackages } from '../context/PackagesContext.tsx';
// import {
//   Code,
//   Briefcase,
//   Landmark,
//   Sparkles,
//   ArrowRight,
//   ShieldCheck,
//   CheckCircle2,
//   ExternalLink,
//   Lock,
//   Zap,
//   Users,
//   Search,
// } from 'lucide-react';

// interface LandingPageProps {
//   navigate: (path: string) => void;
//   onOpenCheckout: (slug: string) => void;
// }

// export const LandingPage: React.FC<LandingPageProps> = ({ navigate, onOpenCheckout }) => {
//   const { user, access } = useAuth();
//   const { packages, formatPrice, getPackageBySlug, settings } = usePackages();

//   const itPkg = getPackageBySlug('it') || { price: 79, name: 'IT Jobs' };
//   const nonItPkg = getPackageBySlug('non-it') || { price: 69, name: 'Non-IT Jobs' };
//   const bankingPkg = getPackageBySlug('banking') || { price: 59, name: 'Banking Jobs' };
//   const allPkg = getPackageBySlug('all') || { price: 99, name: 'All Access' };

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-slate-50 pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-slate-200/60">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="max-w-3xl mx-auto text-center space-y-6">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-800 text-xs font-semibold shadow-xs">
//               <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
//               <span>Direct Link Paid Job Access Board</span>
//             </div>

//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
//               Find Jobs. Get Instant Access.{' '}
//               <span className="text-indigo-600">Apply.</span>
//             </h1>

//             <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
//               Direct access to curated job listings with external application links for IT, Non-IT, and Banking careers. Pay once, unlock instantly, and apply directly on employer portals.
//             </p>

//             <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
//               <button
//                 id="hero-get-started-btn"
//                 onClick={() => {
//                   if (user) {
//                     navigate('/dashboard');
//                   } else {
//                     navigate('/register');
//                   }
//                 }}
//                 className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
//               >
//                 <span>Get Started</span>
//                 <ArrowRight className="w-4 h-4" />
//               </button>
//               <button
//                 id="hero-view-plans-btn"
//                 onClick={() => navigate('/pricing')}
//                 className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-base border border-slate-300 shadow-xs transition-colors flex items-center justify-center gap-2"
//               >
//                 <span>View Plans</span>
//               </button>
//             </div>

//             {/* Micro guarantees */}
//             <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
//               <div className="flex items-center gap-1.5">
//                 <CheckCircle2 className="w-4 h-4 text-emerald-600" />
//                 <span>Zero recurring charges</span>
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <CheckCircle2 className="w-4 h-4 text-emerald-600" />
//                 <span>Instant server-side unlock</span>
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <CheckCircle2 className="w-4 h-4 text-emerald-600" />
//                 <span>External employer links</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* How It Works Strip (Section 6) */}
//       <section className="bg-white py-12 border-b border-slate-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-8">
//             <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
//               Simple 5-Step Process
//             </h2>
//             <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
//               How It Works
//             </p>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
//             {[
//               { step: '1', title: 'Sign Up', desc: 'Create your account in 30 seconds.' },
//               { step: '2', title: 'Choose', desc: 'Pick IT, Non-IT, Banking, or All Access.' },
//               { step: '3', title: 'Pay', desc: 'Secure one-time payment via Razorpay.' },
//               { step: '4', title: 'Instant Access', desc: 'Access granted the millisecond payment clears.' },
//               { step: '5', title: 'Apply', desc: 'Click Apply Now to submit on official portal.' },
//             ].map((item, index) => (
//               <div
//                 key={index}
//                 className="relative bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col items-center text-center"
//               >
//                 <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center mb-2.5">
//                   {item.step}
//                 </div>
//                 <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
//                 <p className="text-xs text-slate-500 mt-1 leading-relaxed">
//                   {item.desc}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Visual Category Cards & All Access Best Value (Section 6) */}
//       <section className="py-16 sm:py-24 bg-slate-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="max-w-2xl mx-auto text-center mb-12">
//             <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
//               Choose Your Category
//             </h2>
//             <p className="text-3xl font-extrabold text-slate-900 mt-1">
//               Transparent, One-Time Access Pricing
//             </p>
//             <p className="text-sm text-slate-500 mt-2">
//               No hidden subscriptions. Select the specific industry you are targeting, or unlock everything in one step.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-8">
//             {/* IT Jobs Card */}
//             <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
//               <div>
//                 <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
//                   <Code className="w-6 h-6" />
//                 </div>
//                 <h3 className="text-xl font-bold text-slate-900">IT & Software Jobs</h3>
//                 <p className="text-xs text-slate-500 mt-1">
//                   Software Engineering, DevOps, Cloud, AI/ML, Full Stack, and Data openings.
//                 </p>
//                 <div className="mt-5 mb-4">
//                   <span className="text-3xl font-extrabold text-slate-900">
//                     {formatPrice(itPkg.price)}
//                   </span>
//                   <span className="text-xs text-slate-400 font-medium ml-1">one-time access</span>
//                 </div>
//                 <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
//                   <li className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
//                     <span>Curated tech startups & MNCs</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
//                     <span>Direct official application links</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
//                     <span>Experience & salary breakdowns</span>
//                   </li>
//                 </ul>
//               </div>
//               <div className="pt-6">
//                 {access?.has_it ? (
//                   <button
//                     onClick={() => navigate('/jobs/it')}
//                     className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold rounded-xl text-sm border border-emerald-200 transition-colors flex items-center justify-center gap-1.5"
//                   >
//                     <span>✓ Access Active • Browse Jobs</span>
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => onOpenCheckout('it')}
//                     className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-1.5"
//                   >
//                     <span>Unlock IT Jobs ({formatPrice(itPkg.price)})</span>
//                     <ArrowRight className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Non-IT Jobs Card */}
//             <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
//               <div>
//                 <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
//                   <Briefcase className="w-6 h-6" />
//                 </div>
//                 <h3 className="text-xl font-bold text-slate-900">Non-IT Jobs</h3>
//                 <p className="text-xs text-slate-500 mt-1">
//                   Human Resources, Supply Chain, Operations, Marketing, and Administrative careers.
//                 </p>
//                 <div className="mt-5 mb-4">
//                   <span className="text-3xl font-extrabold text-slate-900">
//                     {formatPrice(nonItPkg.price)}
//                   </span>
//                   <span className="text-xs text-slate-400 font-medium ml-1">one-time access</span>
//                 </div>
//                 <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
//                   <li className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
//                     <span>Corporate & logistics management</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
//                     <span>Verified employer recruitment portals</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
//                     <span>Instant access without manual review</span>
//                   </li>
//                 </ul>
//               </div>
//               <div className="pt-6">
//                 {access?.has_non_it ? (
//                   <button
//                     onClick={() => navigate('/jobs/non-it')}
//                     className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold rounded-xl text-sm border border-emerald-200 transition-colors flex items-center justify-center gap-1.5"
//                   >
//                     <span>✓ Access Active • Browse Jobs</span>
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => onOpenCheckout('non-it')}
//                     className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-1.5"
//                   >
//                     <span>Unlock Non-IT Jobs ({formatPrice(nonItPkg.price)})</span>
//                     <ArrowRight className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Banking Jobs Card */}
//             <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
//               <div>
//                 <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
//                   <Landmark className="w-6 h-6" />
//                 </div>
//                 <h3 className="text-xl font-bold text-slate-900">Banking Jobs</h3>
//                 <p className="text-xs text-slate-500 mt-1">
//                   Commercial Banking, Risk Underwriting, Wealth Management, FinTech & NBFCs.
//                 </p>
//                 <div className="mt-5 mb-4">
//                   <span className="text-3xl font-extrabold text-slate-900">
//                     {formatPrice(bankingPkg.price)}
//                   </span>
//                   <span className="text-xs text-slate-400 font-medium ml-1">one-time access</span>
//                 </div>
//                 <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
//                   <li className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
//                     <span>Private & PSU banking openings</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
//                     <span>Direct careers portal links</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
//                     <span>Detailed eligibility criteria</span>
//                   </li>
//                 </ul>
//               </div>
//               <div className="pt-6">
//                 {access?.has_banking ? (
//                   <button
//                     onClick={() => navigate('/jobs/banking')}
//                     className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold rounded-xl text-sm border border-emerald-200 transition-colors flex items-center justify-center gap-1.5"
//                   >
//                     <span>✓ Access Active • Browse Jobs</span>
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => onOpenCheckout('banking')}
//                     className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-1.5"
//                   >
//                     <span>Unlock Banking Jobs ({formatPrice(bankingPkg.price)})</span>
//                     <ArrowRight className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Highlighted ALL ACCESS Card (Section 6: Best-value styling) */}
//           <div className="relative max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 p-1 shadow-xl">
//             <div className="bg-slate-900/90 rounded-[22px] p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
//               <div className="space-y-3 max-w-lg">
//                 <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-400/20 border border-amber-300/30 px-3 py-1 rounded-full uppercase tracking-wider">
//                   <Sparkles className="w-3.5 h-3.5" /> Best Value Bundle
//                 </div>
//                 <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
//                   All Access Pass — {formatPrice(allPkg.price)}
//                 </h3>
//                 <p className="text-slate-300 text-sm leading-relaxed">
//                   Unlock complete access to all three industries (IT + Non-IT + Banking) in one single payment. Save over 30% compared to purchasing separately.
//                 </p>
//                 <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-slate-300">
//                   <div className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-400" />
//                     <span>All IT & Software roles</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-400" />
//                     <span>All Non-IT & Operations</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-400" />
//                     <span>All Banking & Finance</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-emerald-400" />
//                     <span>Instant lifetime unlock</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="w-full md:w-auto text-center md:text-right shrink-0">
//                 <div className="mb-4">
//                   <span className="text-4xl sm:text-5xl font-extrabold text-white">
//                     {formatPrice(allPkg.price)}
//                   </span>
//                   <div className="text-xs text-indigo-200 mt-1">One-time payment • No charges ever</div>
//                 </div>

//                 {access?.has_all ? (
//                   <button
//                     onClick={() => navigate('/jobs/all')}
//                     className="w-full md:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm transition-colors shadow-md flex items-center justify-center gap-2"
//                   >
//                     <span>✓ All Access Active • View All Jobs</span>
//                   </button>
//                 ) : (
//                   <button
//                     id="landing-buy-all-access-btn"
//                     onClick={() => onOpenCheckout('all')}
//                     className="w-full md:w-auto px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-sm transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
//                   >
//                     <span>Get All Access Now</span>
//                     <ArrowRight className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Scope Disclaimer Banner (Section 1) */}
//       <section className="bg-slate-100 py-8 border-t border-slate-200">
//         <div className="max-w-4xl mx-auto px-4 text-center text-xs text-slate-500 space-y-1">
//           <p className="font-semibold text-slate-700">
//             Important Notice on Application Links:
//           </p>
//           <p>
//             {settings?.site_name || 'FindMyJobs'} is a curated job listing and link provider. Users never apply inside this application. Clicking &quot;Apply Now&quot; sends you to original employer application URLs. We do not participate in candidate selection or employment decisions.
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// };




















import React from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { usePackages } from '../context/PackagesContext.tsx';
import {
  Code,
  Briefcase,
  Landmark,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Lock,
  Zap,
  Users,
  Search,
} from 'lucide-react';

interface LandingPageProps {
  navigate: (path: string) => void;
  onOpenCheckout: (slug: string) => void;
}

/* ---------- Decorative helpers (design only, no logic) ---------- */

// Soft organic blob used as a background shape
const Blob: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 200 200"
    aria-hidden="true"
    className={`pointer-events-none absolute ${className}`}
  >
    <path
      fill="currentColor"
      transform="translate(100 100)"
      d="M44.7,-61.6C57.6,-52.4,67.6,-38.9,72.6,-23.6C77.6,-8.3,77.6,8.8,71.6,23.1C65.6,37.4,53.6,48.9,40,57.9C26.4,66.9,11.2,73.4,-4.4,79.5C-20,85.6,-36,91.3,-48.4,85.3C-60.8,79.3,-69.6,61.6,-74.4,44.3C-79.2,27,-79.9,10.1,-75.7,-4.6C-71.5,-19.3,-62.4,-31.8,-51.6,-41.4C-40.8,-51,-28.3,-57.7,-14.7,-63.2C-1.1,-68.7,13.6,-73,27.2,-70.7C40.8,-68.4,31.8,-70.8,44.7,-61.6Z"
    />
  </svg>
);

// Round illustrated avatar badge
const Avatar: React.FC<{
  bg: string;
  shirt: string;
  hair: string;
  skin?: string;
  className?: string;
}> = ({ bg, shirt, hair, skin = '#FCD9B6', className = '' }) => (
  <svg
    viewBox="0 0 100 100"
    aria-hidden="true"
    className={`pointer-events-none absolute rounded-full shadow-sm ${className}`}
  >
    <defs>
      <clipPath id={`clip-${bg.replace('#', '')}`}>
        <circle cx="50" cy="50" r="50" />
      </clipPath>
    </defs>
    <g clipPath={`url(#clip-${bg.replace('#', '')})`}>
      <rect width="100" height="100" fill={bg} />
      <ellipse cx="50" cy="104" rx="38" ry="34" fill={shirt} />
      <rect x="44" y="58" width="12" height="14" rx="5" fill={skin} />
      <circle cx="50" cy="44" r="19" fill={skin} />
      <path d="M30 44c0-14 8-24 21-24s20 9 19 24c-4-8-9-12-20-12s-16 4-20 12z" fill={hair} />
      <circle cx="43" cy="46" r="1.8" fill="#1e293b" />
      <circle cx="57" cy="46" r="1.8" fill="#1e293b" />
      <path d="M45 54q5 4 10 0" stroke="#1e293b" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </g>
  </svg>
);

export const LandingPage: React.FC<LandingPageProps> = ({ navigate, onOpenCheckout }) => {
  const { user, access } = useAuth();
  const { packages, formatPrice, getPackageBySlug, settings } = usePackages();

  const itPkg = getPackageBySlug('it') || { price: 79, name: 'IT Jobs' };
  const nonItPkg = getPackageBySlug('non-it') || { price: 69, name: 'Non-IT Jobs' };
  const bankingPkg = getPackageBySlug('banking') || { price: 59, name: 'Banking Jobs' };
  const allPkg = getPackageBySlug('all') || { price: 99, name: 'All Access' };

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-blue-50 pt-12 pb-14 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
        {/* Background blobs */}
        <Blob className="-left-32 -top-20 w-[280px] sm:-left-40 sm:-top-24 sm:w-[420px] lg:w-[520px] text-blue-100" />
        <Blob className="-right-36 top-24 w-[300px] sm:-right-48 sm:top-10 sm:w-[460px] lg:w-[560px] text-blue-100/80" />
        <Blob className="left-1/4 -bottom-40 w-[300px] sm:left-1/3 sm:-bottom-56 sm:w-[420px] lg:w-[480px] text-sky-100/70" />

        {/* Floating avatars (tablet and desktop only, so they never crowd mobile text) */}
        <Avatar bg="#BFDBFE" shirt="#1D4ED8" hair="#0F172A" className="hidden md:block left-[3%] lg:left-[9%] top-16 w-16 h-16 lg:w-28 lg:h-28" />
        <Avatar bg="#DBEAFE" shirt="#3B82F6" hair="#1E3A8A" className="hidden md:block right-[4%] lg:right-[12%] top-14 w-12 h-12 lg:w-20 lg:h-20" />
        <Avatar bg="#93C5FD" shirt="#1E40AF" hair="#172554" className="hidden md:block left-[2%] lg:left-[5%] bottom-24 w-10 h-10 lg:w-14 lg:h-14" />
        <Avatar bg="#7DD3FC" shirt="#2563EB" hair="#0F172A" className="hidden md:block right-[3%] lg:right-[7%] bottom-20 w-20 h-20 lg:w-32 lg:h-32" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-blue-200 text-blue-800 text-[11px] sm:text-xs font-semibold shadow-xs backdrop-blur">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Direct Link Paid Job Access Board</span>
            </div>

            <h1 className="text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-950 tracking-tighter leading-[1.15] sm:leading-[1.12]">
              Find Jobs. Get Instant Access.{' '}
              <span className="text-blue-600">Apply.</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Direct access to curated job listings with external application links for IT, Non-IT, and Banking careers. Pay once, unlock instantly, and apply directly on employer portals.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                id="hero-get-started-btn"
                onClick={() => {
                  if (user) {
                    navigate('/dashboard');
                  } else {
                    navigate('/register');
                  }
                }}
                className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-base shadow-md shadow-blue-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="hero-view-plans-btn"
                onClick={() => navigate('/pricing')}
                className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-white hover:bg-blue-50 text-blue-900 font-semibold rounded-xl text-base border border-blue-200 shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>View Plans</span>
              </button>
            </div>

            {/* Micro guarantees */}
            <div className="pt-6 sm:pt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-left">
              {[
                'Zero recurring charges',
                'Instant server-side unlock',
                'External employer links',
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 rounded-2xl bg-white/70 border border-blue-100 px-4 py-3 sm:py-3.5 text-sm text-blue-950 font-semibold shadow-xs backdrop-blur"
                >
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Strip (Section 6) */}
      <section className="bg-white py-10 sm:py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Simple 5-Step Process
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-blue-950 mt-1 tracking-tight">
              How It Works
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
            {[
              { step: '1', title: 'Sign Up', desc: 'Create your account in 30 seconds.' },
              { step: '2', title: 'Choose', desc: 'Pick IT, Non-IT, Banking, or All Access.' },
              { step: '3', title: 'Pay', desc: 'Secure one-time payment via Razorpay.' },
              { step: '4', title: 'Instant Access', desc: 'Access granted the millisecond payment clears.' },
              { step: '5', title: 'Apply', desc: 'Click Apply Now to submit on official portal.' },
            ].map((item, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl p-4 sm:p-5 shadow-[0_6px_24px_-8px_rgba(37,99,235,0.25)] ring-1 ring-blue-50 flex flex-col items-center text-center ${
                  index === 4 ? 'col-span-2 md:col-span-1' : ''
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-sm text-blue-950">{item.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Category Cards & All Access Best Value (Section 6) */}
      <section className="relative overflow-hidden py-12 sm:py-20 lg:py-24 bg-blue-50">
        <Blob className="-left-40 top-20 w-[300px] sm:-left-48 sm:w-[420px] lg:w-[480px] text-blue-100" />
        <Blob className="-right-44 bottom-0 w-[320px] sm:-right-52 sm:w-[460px] lg:w-[520px] text-blue-100/80" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-12">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Choose Your Category
            </h2>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-950 mt-1 tracking-tighter">
              Transparent, One-Time Access Pricing
            </p>
            <p className="text-sm text-slate-600 mt-3">
              No hidden subscriptions. Select the specific industry you are targeting, or unlock everything in one step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8 items-stretch mb-8">
            {/* IT Jobs Card */}
            <div className="bg-white rounded-2xl p-5 lg:p-6 flex flex-col justify-between shadow-[0_8px_30px_-10px_rgba(37,99,235,0.25)] ring-1 ring-blue-100 hover:shadow-[0_12px_36px_-8px_rgba(37,99,235,0.35)] transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                  <Code className="w-6 h-6" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-blue-950">IT & Software Jobs</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Software Engineering, DevOps, Cloud, AI/ML, Full Stack, and Data openings.
                </p>
                <div className="mt-5 mb-4">
                  <span className="text-3xl font-extrabold text-blue-950">
                    {formatPrice(itPkg.price)}
                  </span>
                  <span className="text-xs text-slate-400 font-medium ml-1">one-time access</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 border-t border-blue-100 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Curated tech startups & MNCs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Direct official application links</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Experience & salary breakdowns</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                {access?.has_it ? (
                  <button
                    onClick={() => navigate('/jobs/it')}
                    className="w-full min-h-[44px] px-3 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold rounded-xl text-sm border border-emerald-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>✓ Access Active • Browse Jobs</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onOpenCheckout('it')}
                    className="w-full min-h-[44px] px-3 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Unlock IT Jobs ({formatPrice(itPkg.price)})</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                )}
              </div>
            </div>

            {/* Non-IT Jobs Card */}
            <div className="bg-white rounded-2xl p-5 lg:p-6 flex flex-col justify-between shadow-[0_8px_30px_-10px_rgba(37,99,235,0.25)] ring-1 ring-blue-100 hover:shadow-[0_12px_36px_-8px_rgba(37,99,235,0.35)] transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-blue-950">Non-IT Jobs</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Human Resources, Supply Chain, Operations, Marketing, and Administrative careers.
                </p>
                <div className="mt-5 mb-4">
                  <span className="text-3xl font-extrabold text-blue-950">
                    {formatPrice(nonItPkg.price)}
                  </span>
                  <span className="text-xs text-slate-400 font-medium ml-1">one-time access</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 border-t border-blue-100 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Corporate & logistics management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Verified employer recruitment portals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Instant access without manual review</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                {access?.has_non_it ? (
                  <button
                    onClick={() => navigate('/jobs/non-it')}
                    className="w-full min-h-[44px] px-3 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold rounded-xl text-sm border border-emerald-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>✓ Access Active • Browse Jobs</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onOpenCheckout('non-it')}
                    className="w-full min-h-[44px] px-3 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Unlock Non-IT Jobs ({formatPrice(nonItPkg.price)})</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                )}
              </div>
            </div>

            {/* Banking Jobs Card */}
            <div className="bg-white rounded-2xl p-5 lg:p-6 flex flex-col justify-between shadow-[0_8px_30px_-10px_rgba(37,99,235,0.25)] ring-1 ring-blue-100 hover:shadow-[0_12px_36px_-8px_rgba(37,99,235,0.35)] transition-shadow">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
                  <Landmark className="w-6 h-6" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-blue-950">Banking Jobs</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Commercial Banking, Risk Underwriting, Wealth Management, FinTech & NBFCs.
                </p>
                <div className="mt-5 mb-4">
                  <span className="text-3xl font-extrabold text-blue-950">
                    {formatPrice(bankingPkg.price)}
                  </span>
                  <span className="text-xs text-slate-400 font-medium ml-1">one-time access</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 border-t border-blue-100 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Private & PSU banking openings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Direct careers portal links</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Detailed eligibility criteria</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                {access?.has_banking ? (
                  <button
                    onClick={() => navigate('/jobs/banking')}
                    className="w-full min-h-[44px] px-3 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold rounded-xl text-sm border border-emerald-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>✓ Access Active • Browse Jobs</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onOpenCheckout('banking')}
                    className="w-full min-h-[44px] px-3 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Unlock Banking Jobs ({formatPrice(bankingPkg.price)})</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Highlighted ALL ACCESS Card (Section 6: Best-value styling) */}
          <div className="relative max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 p-1 shadow-xl shadow-blue-600/20">
            <div className="bg-blue-950/95 rounded-[22px] p-5 sm:p-8 lg:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
              <div className="space-y-3 max-w-lg w-full">
                <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-sky-200 bg-sky-400/20 border border-sky-300/30 px-3 py-1 rounded-full uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> Best Value Bundle
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                  All Access Pass — {formatPrice(allPkg.price)}
                </h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Unlock complete access to all three industries (IT + Non-IT + Banking) in one single payment. Save over 30% compared to purchasing separately.
                </p>
                <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2 pt-2 text-xs text-blue-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0" />
                    <span>All IT & Software roles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0" />
                    <span>All Non-IT & Operations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0" />
                    <span>All Banking & Finance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0" />
                    <span>Instant lifetime unlock</span>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-auto text-center md:text-right shrink-0 border-t border-white/10 pt-5 md:border-0 md:pt-0">
                <div className="mb-4">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white">
                    {formatPrice(allPkg.price)}
                  </span>
                  <div className="text-xs text-blue-200 mt-1">One-time payment • No charges ever</div>
                </div>

                {access?.has_all ? (
                  <button
                    onClick={() => navigate('/jobs/all')}
                    className="w-full md:w-auto min-h-[44px] px-6 sm:px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <span>✓ All Access Active • View All Jobs</span>
                  </button>
                ) : (
                  <button
                    id="landing-buy-all-access-btn"
                    onClick={() => onOpenCheckout('all')}
                    className="w-full md:w-auto min-h-[44px] px-6 sm:px-8 py-3.5 bg-white hover:bg-blue-50 text-blue-900 font-bold rounded-xl text-sm transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Get All Access Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scope Disclaimer Banner (Section 1) */}
      <section className="bg-white py-6 sm:py-8 border-t border-blue-100">
        <div className="max-w-4xl mx-auto px-4 text-center text-xs text-slate-500 space-y-1">
          <p className="font-semibold text-blue-900">
            Important Notice on Application Links:
          </p>
          <p>
            {settings?.site_name || 'FindMyJobs'} is a curated job listing and link provider. Users never apply inside this application. Clicking &quot;Apply Now&quot; sends you to original employer application URLs. We do not participate in candidate selection or employment decisions.
          </p>
        </div>
      </section>
    </div>
  );
};