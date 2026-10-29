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

// /* ---------- Decorative helpers (design only, no logic) ---------- */

// // Soft organic blob used as a background shape
// const Blob: React.FC<{ className?: string }> = ({ className = '' }) => (
//   <svg
//     viewBox="0 0 200 200"
//     aria-hidden="true"
//     className={`pointer-events-none absolute ${className}`}
//   >
//     <path
//       fill="currentColor"
//       transform="translate(100 100)"
//       d="M44.7,-61.6C57.6,-52.4,67.6,-38.9,72.6,-23.6C77.6,-8.3,77.6,8.8,71.6,23.1C65.6,37.4,53.6,48.9,40,57.9C26.4,66.9,11.2,73.4,-4.4,79.5C-20,85.6,-36,91.3,-48.4,85.3C-60.8,79.3,-69.6,61.6,-74.4,44.3C-79.2,27,-79.9,10.1,-75.7,-4.6C-71.5,-19.3,-62.4,-31.8,-51.6,-41.4C-40.8,-51,-28.3,-57.7,-14.7,-63.2C-1.1,-68.7,13.6,-73,27.2,-70.7C40.8,-68.4,31.8,-70.8,44.7,-61.6Z"
//     />
//   </svg>
// );

// // Round illustrated avatar badge
// const Avatar: React.FC<{
//   bg: string;
//   shirt: string;
//   hair: string;
//   skin?: string;
//   className?: string;
// }> = ({ bg, shirt, hair, skin = '#FCD9B6', className = '' }) => (
//   <svg
//     viewBox="0 0 100 100"
//     aria-hidden="true"
//     className={`pointer-events-none absolute rounded-full shadow-sm ${className}`}
//   >
//     <defs>
//       <clipPath id={`clip-${bg.replace('#', '')}`}>
//         <circle cx="50" cy="50" r="50" />
//       </clipPath>
//     </defs>
//     <g clipPath={`url(#clip-${bg.replace('#', '')})`}>
//       <rect width="100" height="100" fill={bg} />
//       <ellipse cx="50" cy="104" rx="38" ry="34" fill={shirt} />
//       <rect x="44" y="58" width="12" height="14" rx="5" fill={skin} />
//       <circle cx="50" cy="44" r="19" fill={skin} />
//       <path d="M30 44c0-14 8-24 21-24s20 9 19 24c-4-8-9-12-20-12s-16 4-20 12z" fill={hair} />
//       <circle cx="43" cy="46" r="1.8" fill="#1e293b" />
//       <circle cx="57" cy="46" r="1.8" fill="#1e293b" />
//       <path d="M45 54q5 4 10 0" stroke="#1e293b" strokeWidth="1.6" fill="none" strokeLinecap="round" />
//     </g>
//   </svg>
// );

// export const LandingPage: React.FC<LandingPageProps> = ({ navigate, onOpenCheckout }) => {
//   const { user, access } = useAuth();
//   const { packages, formatPrice, getPackageBySlug, settings } = usePackages();

//   const itPkg = getPackageBySlug('it') || { price: 79, name: 'IT Jobs' };
//   const nonItPkg = getPackageBySlug('non-it') || { price: 69, name: 'Non-IT Jobs' };
//   const bankingPkg = getPackageBySlug('banking') || { price: 59, name: 'Banking Jobs' };
//   const allPkg = getPackageBySlug('all') || { price: 99, name: 'All Access' };

//   return (
//     <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-blue-50 pt-12 pb-14 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
//         {/* Background blobs */}
//         <Blob className="-left-32 -top-20 w-[280px] sm:-left-40 sm:-top-24 sm:w-[420px] lg:w-[520px] text-blue-100" />
//         <Blob className="-right-36 top-24 w-[300px] sm:-right-48 sm:top-10 sm:w-[460px] lg:w-[560px] text-blue-100/80" />
//         <Blob className="left-1/4 -bottom-40 w-[300px] sm:left-1/3 sm:-bottom-56 sm:w-[420px] lg:w-[480px] text-sky-100/70" />

//         {/* Floating avatars (tablet and desktop only, so they never crowd mobile text) */}
//         <Avatar bg="#BFDBFE" shirt="#1D4ED8" hair="#0F172A" className="hidden md:block left-[3%] lg:left-[9%] top-16 w-16 h-16 lg:w-28 lg:h-28" />
//         <Avatar bg="#DBEAFE" shirt="#3B82F6" hair="#1E3A8A" className="hidden md:block right-[4%] lg:right-[12%] top-14 w-12 h-12 lg:w-20 lg:h-20" />
//         <Avatar bg="#93C5FD" shirt="#1E40AF" hair="#172554" className="hidden md:block left-[2%] lg:left-[5%] bottom-24 w-10 h-10 lg:w-14 lg:h-14" />
//         <Avatar bg="#7DD3FC" shirt="#2563EB" hair="#0F172A" className="hidden md:block right-[3%] lg:right-[7%] bottom-20 w-20 h-20 lg:w-32 lg:h-32" />

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="max-w-3xl mx-auto text-center space-y-5 sm:space-y-6">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-blue-200 text-blue-800 text-[11px] sm:text-xs font-semibold shadow-xs backdrop-blur">
//               <Sparkles className="w-3.5 h-3.5 text-blue-600" />
//               <span>Direct Link Paid Job Access Board</span>
//             </div>

//             <h1 className="text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-950 tracking-tighter leading-[1.15] sm:leading-[1.12]">
//               Find Jobs. Get Instant Access.{' '}
//               <span className="text-blue-600">Apply.</span>
//             </h1>

//             <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
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
//                 className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-base shadow-md shadow-blue-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-2"
//               >
//                 <span>Get Started</span>
//                 <ArrowRight className="w-4 h-4" />
//               </button>
//               <button
//                 id="hero-view-plans-btn"
//                 onClick={() => navigate('/pricing')}
//                 className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-white hover:bg-blue-50 text-blue-900 font-semibold rounded-xl text-base border border-blue-200 shadow-xs transition-colors flex items-center justify-center gap-2"
//               >
//                 <span>View Plans</span>
//               </button>
//             </div>

//             {/* Micro guarantees */}
//             <div className="pt-6 sm:pt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-left">
//               {[
//                 'Zero recurring charges',
//                 'Instant server-side unlock',
//                 'External employer links',
//               ].map((text, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center gap-2.5 rounded-2xl bg-white/70 border border-blue-100 px-4 py-3 sm:py-3.5 text-sm text-blue-950 font-semibold shadow-xs backdrop-blur"
//                 >
//                   <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
//                   <span>{text}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* How It Works Strip (Section 6) */}
//       <section className="bg-white py-10 sm:py-14 lg:py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-8 sm:mb-10">
//             <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider">
//               Simple 5-Step Process
//             </h2>
//             <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-blue-950 mt-1 tracking-tight">
//               How It Works
//             </p>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
//             {[
//               { step: '1', title: 'Sign Up', desc: 'Create your account in 30 seconds.' },
//               { step: '2', title: 'Choose', desc: 'Pick IT, Non-IT, Banking, or All Access.' },
//               { step: '3', title: 'Pay', desc: 'Secure one-time payment via Razorpay.' },
//               { step: '4', title: 'Instant Access', desc: 'Access granted the millisecond payment clears.' },
//               { step: '5', title: 'Apply', desc: 'Click Apply Now to submit on official portal.' },
//             ].map((item, index) => (
//               <div
//                 key={index}
//                 className={`relative bg-white rounded-2xl p-4 sm:p-5 shadow-[0_6px_24px_-8px_rgba(37,99,235,0.25)] ring-1 ring-blue-50 flex flex-col items-center text-center ${
//                   index === 4 ? 'col-span-2 md:col-span-1' : ''
//                 }`}
//               >
//                 <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center mb-3">
//                   {item.step}
//                 </div>
//                 <h3 className="font-bold text-sm text-blue-950">{item.title}</h3>
//                 <p className="text-xs text-slate-500 mt-1 leading-relaxed">
//                   {item.desc}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Visual Category Cards & All Access Best Value (Section 6) */}
//       <section className="relative overflow-hidden py-12 sm:py-20 lg:py-24 bg-blue-50">
//         <Blob className="-left-40 top-20 w-[300px] sm:-left-48 sm:w-[420px] lg:w-[480px] text-blue-100" />
//         <Blob className="-right-44 bottom-0 w-[320px] sm:-right-52 sm:w-[460px] lg:w-[520px] text-blue-100/80" />

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-12">
//             <h2 className="text-xs font-bold text-blue-600 uppercase tracking-wider">
//               Choose Your Category
//             </h2>
//             <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-950 mt-1 tracking-tighter">
//               Transparent, One-Time Access Pricing
//             </p>
//             <p className="text-sm text-slate-600 mt-3">
//               No hidden subscriptions. Select the specific industry you are targeting, or unlock everything in one step.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8 items-stretch mb-8">
//             {/* IT Jobs Card */}
//             <div className="bg-white rounded-2xl p-5 lg:p-6 flex flex-col justify-between shadow-[0_8px_30px_-10px_rgba(37,99,235,0.25)] ring-1 ring-blue-100 hover:shadow-[0_12px_36px_-8px_rgba(37,99,235,0.35)] transition-shadow">
//               <div>
//                 <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
//                   <Code className="w-6 h-6" />
//                 </div>
//                 <h3 className="text-lg lg:text-xl font-bold text-blue-950">IT & Software Jobs</h3>
//                 <p className="text-xs text-slate-500 mt-1">
//                   Software Engineering, DevOps, Cloud, AI/ML, Full Stack, and Data openings.
//                 </p>
//                 <div className="mt-5 mb-4">
//                   <span className="text-3xl font-extrabold text-blue-950">
//                     {formatPrice(itPkg.price)}
//                   </span>
//                   <span className="text-xs text-slate-400 font-medium ml-1">one-time access</span>
//                 </div>
//                 <ul className="space-y-2 text-xs text-slate-600 border-t border-blue-100 pt-4">
//                   <li className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
//                     <span>Curated tech startups & MNCs</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
//                     <span>Direct official application links</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
//                     <span>Experience & salary breakdowns</span>
//                   </li>
//                 </ul>
//               </div>
//               <div className="pt-6">
//                 {access?.has_it ? (
//                   <button
//                     onClick={() => navigate('/jobs/it')}
//                     className="w-full min-h-[44px] px-3 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold rounded-xl text-sm border border-emerald-200 transition-colors flex items-center justify-center gap-1.5"
//                   >
//                     <span>✓ Access Active • Browse Jobs</span>
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => onOpenCheckout('it')}
//                     className="w-full min-h-[44px] px-3 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-1.5"
//                   >
//                     <span>Unlock IT Jobs ({formatPrice(itPkg.price)})</span>
//                     <ArrowRight className="w-4 h-4 shrink-0" />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Non-IT Jobs Card */}
//             <div className="bg-white rounded-2xl p-5 lg:p-6 flex flex-col justify-between shadow-[0_8px_30px_-10px_rgba(37,99,235,0.25)] ring-1 ring-blue-100 hover:shadow-[0_12px_36px_-8px_rgba(37,99,235,0.35)] transition-shadow">
//               <div>
//                 <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-4">
//                   <Briefcase className="w-6 h-6" />
//                 </div>
//                 <h3 className="text-lg lg:text-xl font-bold text-blue-950">Non-IT Jobs</h3>
//                 <p className="text-xs text-slate-500 mt-1">
//                   Human Resources, Supply Chain, Operations, Marketing, and Administrative careers.
//                 </p>
//                 <div className="mt-5 mb-4">
//                   <span className="text-3xl font-extrabold text-blue-950">
//                     {formatPrice(nonItPkg.price)}
//                   </span>
//                   <span className="text-xs text-slate-400 font-medium ml-1">one-time access</span>
//                 </div>
//                 <ul className="space-y-2 text-xs text-slate-600 border-t border-blue-100 pt-4">
//                   <li className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
//                     <span>Corporate & logistics management</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
//                     <span>Verified employer recruitment portals</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
//                     <span>Instant access without manual review</span>
//                   </li>
//                 </ul>
//               </div>
//               <div className="pt-6">
//                 {access?.has_non_it ? (
//                   <button
//                     onClick={() => navigate('/jobs/non-it')}
//                     className="w-full min-h-[44px] px-3 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold rounded-xl text-sm border border-emerald-200 transition-colors flex items-center justify-center gap-1.5"
//                   >
//                     <span>✓ Access Active • Browse Jobs</span>
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => onOpenCheckout('non-it')}
//                     className="w-full min-h-[44px] px-3 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-1.5"
//                   >
//                     <span>Unlock Non-IT Jobs ({formatPrice(nonItPkg.price)})</span>
//                     <ArrowRight className="w-4 h-4 shrink-0" />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Banking Jobs Card */}
//             <div className="bg-white rounded-2xl p-5 lg:p-6 flex flex-col justify-between shadow-[0_8px_30px_-10px_rgba(37,99,235,0.25)] ring-1 ring-blue-100 hover:shadow-[0_12px_36px_-8px_rgba(37,99,235,0.35)] transition-shadow">
//               <div>
//                 <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
//                   <Landmark className="w-6 h-6" />
//                 </div>
//                 <h3 className="text-lg lg:text-xl font-bold text-blue-950">Banking Jobs</h3>
//                 <p className="text-xs text-slate-500 mt-1">
//                   Commercial Banking, Risk Underwriting, Wealth Management, FinTech & NBFCs.
//                 </p>
//                 <div className="mt-5 mb-4">
//                   <span className="text-3xl font-extrabold text-blue-950">
//                     {formatPrice(bankingPkg.price)}
//                   </span>
//                   <span className="text-xs text-slate-400 font-medium ml-1">one-time access</span>
//                 </div>
//                 <ul className="space-y-2 text-xs text-slate-600 border-t border-blue-100 pt-4">
//                   <li className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
//                     <span>Private & PSU banking openings</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
//                     <span>Direct careers portal links</span>
//                   </li>
//                   <li className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
//                     <span>Detailed eligibility criteria</span>
//                   </li>
//                 </ul>
//               </div>
//               <div className="pt-6">
//                 {access?.has_banking ? (
//                   <button
//                     onClick={() => navigate('/jobs/banking')}
//                     className="w-full min-h-[44px] px-3 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold rounded-xl text-sm border border-emerald-200 transition-colors flex items-center justify-center gap-1.5"
//                   >
//                     <span>✓ Access Active • Browse Jobs</span>
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => onOpenCheckout('banking')}
//                     className="w-full min-h-[44px] px-3 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-1.5"
//                   >
//                     <span>Unlock Banking Jobs ({formatPrice(bankingPkg.price)})</span>
//                     <ArrowRight className="w-4 h-4 shrink-0" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Highlighted ALL ACCESS Card (Section 6: Best-value styling) */}
//           <div className="relative max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 p-1 shadow-xl shadow-blue-600/20">
//             <div className="bg-blue-950/95 rounded-[22px] p-5 sm:p-8 lg:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
//               <div className="space-y-3 max-w-lg w-full">
//                 <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-sky-200 bg-sky-400/20 border border-sky-300/30 px-3 py-1 rounded-full uppercase tracking-wider">
//                   <Sparkles className="w-3.5 h-3.5" /> Best Value Bundle
//                 </div>
//                 <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
//                   All Access Pass — {formatPrice(allPkg.price)}
//                 </h3>
//                 <p className="text-blue-100 text-sm leading-relaxed">
//                   Unlock complete access to all three industries (IT + Non-IT + Banking) in one single payment. Save over 30% compared to purchasing separately.
//                 </p>
//                 <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2 pt-2 text-xs text-blue-100">
//                   <div className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0" />
//                     <span>All IT & Software roles</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0" />
//                     <span>All Non-IT & Operations</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0" />
//                     <span>All Banking & Finance</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0" />
//                     <span>Instant lifetime unlock</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="w-full md:w-auto text-center md:text-right shrink-0 border-t border-white/10 pt-5 md:border-0 md:pt-0">
//                 <div className="mb-4">
//                   <span className="text-4xl sm:text-5xl font-extrabold text-white">
//                     {formatPrice(allPkg.price)}
//                   </span>
//                   <div className="text-xs text-blue-200 mt-1">One-time payment • No charges ever</div>
//                 </div>

//                 {access?.has_all ? (
//                   <button
//                     onClick={() => navigate('/jobs/all')}
//                     className="w-full md:w-auto min-h-[44px] px-6 sm:px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm transition-colors shadow-md flex items-center justify-center gap-2"
//                   >
//                     <span>✓ All Access Active • View All Jobs</span>
//                   </button>
//                 ) : (
//                   <button
//                     id="landing-buy-all-access-btn"
//                     onClick={() => onOpenCheckout('all')}
//                     className="w-full md:w-auto min-h-[44px] px-6 sm:px-8 py-3.5 bg-white hover:bg-blue-50 text-blue-900 font-bold rounded-xl text-sm transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
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
//       <section className="bg-white py-6 sm:py-8 border-t border-blue-100">
//         <div className="max-w-4xl mx-auto px-4 text-center text-xs text-slate-500 space-y-1">
//           <p className="font-semibold text-blue-900">
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




































import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { usePackages } from '../context/PackagesContext.tsx';
import {
  Code,
  Briefcase,
  Landmark,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Lock,
  Zap,
  Users,
  Search,
  Heart,
  TrendingUp,
  MapPin,
  ChevronDown,
  Mail,
  Laptop,
  Clock,
  BadgeCheck,
  CreditCard,
  XCircle,
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

/* ---------- Scroll reveal, count-up, timeline progress (from About page) ---------- */

function useInView<T extends HTMLElement>(threshold = 0.08) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -5% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  from?: 'up' | 'left' | 'right' | 'scale';
  className?: string;
}> = ({ children, delay = 0, from = 'up', className = '' }) => {
  const { ref, inView } = useInView<HTMLDivElement>(0.08);
  const hidden =
    from === 'left'
      ? 'opacity-0 -translate-x-5 md:-translate-x-10'
      : from === 'right'
      ? 'opacity-0 translate-x-5 md:translate-x-10'
      : from === 'scale'
      ? 'opacity-0 scale-95'
      : 'opacity-0 translate-y-8 md:translate-y-10';
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        inView ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : hidden
      } ${className}`}
    >
      {children}
    </div>
  );
};

const CountUp: React.FC<{ to: number; prefix?: string; suffix?: string }> = ({
  to,
  prefix = '',
  suffix = '',
}) => {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(to * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
};

// 0 → 1 as the section scrolls through the viewport (used for the timeline line)
function useSectionProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh * 0.6 - rect.top) / rect.height;
      setProgress(Math.min(Math.max(raw, 0), 1));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return { ref, progress };
}

// Dashed curved arrow (like the reference design)
const CurvedArrow: React.FC<{ className?: string; flip?: boolean }> = ({
  className = '',
  flip = false,
}) => (
  <svg
    width="64"
    height="32"
    viewBox="0 0 64 32"
    fill="none"
    aria-hidden="true"
    className={`${className} ${flip ? '-scale-x-100' : ''}`}
  >
    <path
      d="M2 27 C 16 2, 42 2, 58 15"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeDasharray="4 5"
      className="fmj-dash"
    />
    <path
      d="M51 8 L58 15 L49 19"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ---------- Static content (from About page) ---------- */

const SAMPLE_JOBS = [
  { title: 'Software Developer', org: 'IT Company', city: 'Bengaluru', tag: 'IT', tone: 'bg-indigo-100 text-indigo-700' },
  { title: 'Probationary Officer', org: 'Bank', city: 'Pan India', tag: 'Banking', tone: 'bg-emerald-100 text-emerald-700' },
  { title: 'Sales Executive', org: 'Retail Group', city: 'Mumbai', tag: 'Non-IT', tone: 'bg-amber-100 text-amber-700' },
];

// Used for the mobile/tablet feature strip under the hero card
const HERO_FEATURES = [
  { icon: Search, label: 'Find jobs that fit you', color: 'text-blue-600' },
  { icon: Heart, label: 'Roles you’ll love', color: 'text-rose-500' },
  { icon: Zap, label: 'Apply in one tap', color: 'text-orange-500' },
  { icon: TrendingUp, label: 'Grow your career', color: 'text-teal-500' },
];

const STEPS = [
  {
    icon: Search,
    title: 'Pick your category',
    text: 'Choose IT, Non-IT or Banking. Not sure yet? The All Access pass covers everything.',
  },
  {
    icon: CreditCard,
    title: 'Pay once, unlock instantly',
    text: 'One small payment through Razorpay. No subscription and no hidden renewals.',
  },
  {
    icon: Briefcase,
    title: 'Browse verified openings',
    text: 'See clean listings with the role, location, deadline and how to apply.',
  },
  {
    icon: ExternalLink,
    title: 'Apply on the official page',
    text: 'Tap Apply Now and go straight to the employer’s own application page.',
  },
];

const FAQS = [
  {
    q: 'Do I apply inside FindMyJobs?',
    a: 'No. We only list the jobs. When you tap Apply Now you are taken to the original employer’s application page, and everything after that happens there.',
  },
  {
    q: 'Is the payment monthly?',
    a: 'No. It is a one-time payment for the category you choose. There is no subscription and nothing renews automatically.',
  },
  {
    q: 'Will I definitely get a job?',
    a: 'We cannot promise interviews or employment. We save you time by gathering genuine openings in one place. Selection is always decided by the employer.',
  },
  {
    q: 'What happens to expired jobs?',
    a: 'Listings are removed once their deadline passes, so you are not spending time on closed vacancies.',
  },
  {
    q: 'How do I reach you if something is wrong?',
    a: 'Use the Queries page or email support@findmyjobs.in and we will get back to you.',
  },
];

/* ---------- Page ---------- */

export const LandingPage: React.FC<LandingPageProps> = ({ navigate, onOpenCheckout }) => {
  const { user, access } = useAuth();
  const { packages, formatPrice, getPackageBySlug, settings } = usePackages();

  const itPkg = getPackageBySlug('it') || { price: 79, name: 'IT Jobs' };
  const nonItPkg = getPackageBySlug('non-it') || { price: 69, name: 'Non-IT Jobs' };
  const bankingPkg = getPackageBySlug('banking') || { price: 59, name: 'Banking Jobs' };
  const allPkg = getPackageBySlug('all') || { price: 99, name: 'All Access' };

  const siteName = settings?.site_name || 'FindMyJobs';

  // Lowest of the three category prices for the "Starting price" stat (falls back to 59)
  const startingPrice =
    Math.min(Number(itPkg.price), Number(nonItPkg.price), Number(bankingPkg.price)) || 59;

  
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const timeline = useSectionProgress<HTMLDivElement>();

  

  // About page "Pick the path that fits you" cards (prices come from your packages)
  const CATEGORIES = [
    {
      icon: Laptop,
      title: 'IT & Software',
      text: 'Developer, testing, data, support and other technology roles.',
      path: '/jobs/it',
      price: formatPrice(itPkg.price),
      accent: 'from-indigo-500 to-violet-500',
    },
    {
      icon: Users,
      title: 'Non-IT & Operations',
      text: 'Sales, HR, operations, marketing and other non-technical roles.',
      path: '/jobs/non-it',
      price: formatPrice(nonItPkg.price),
      accent: 'from-amber-500 to-orange-500',
    },
    {
      icon: Landmark,
      title: 'Banking & Finance',
      text: 'Bank, finance and insurance openings across public and private sectors.',
      path: '/jobs/banking',
      price: formatPrice(bankingPkg.price),
      accent: 'from-emerald-500 to-teal-500',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-white text-slate-600">
      <style>{`
        @keyframes fmj-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes fmj-dash { to { stroke-dashoffset: -18; } }
        @keyframes fmj-pulse-ring { 0% { transform: scale(0.9); opacity: .6; } 100% { transform: scale(1.6); opacity: 0; } }
        .fmj-float { animation: fmj-float 4.5s ease-in-out infinite; }
        .fmj-float-slow { animation: fmj-float 6s ease-in-out infinite; }
        .fmj-dash { animation: fmj-dash 1.6s linear infinite; }
        .fmj-ring { animation: fmj-pulse-ring 2s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .fmj-float, .fmj-float-slow, .fmj-dash, .fmj-ring { animation: none; }
        }
      `}</style>

      

      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-violet-50 pt-10 pb-12 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
        {/* Background blobs */}
        <Blob className="-left-32 -top-20 w-[280px] sm:-left-40 sm:-top-24 sm:w-[420px] lg:w-[520px] text-indigo-100/70" />
        <Blob className="-right-36 top-24 w-[300px] sm:-right-48 sm:top-10 sm:w-[460px] lg:w-[560px] text-violet-100/80" />
        <Blob className="left-1/4 -bottom-40 w-[300px] sm:left-1/3 sm:-bottom-56 sm:w-[420px] lg:w-[480px] text-sky-100/70" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left: landing hero content (logic unchanged) */}
          <div className="text-center lg:text-left space-y-5 sm:space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs sm:text-sm font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Explore. Apply. Grow.</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mt-5 sm:mt-6 text-3xl min-[400px]:text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15] sm:leading-[1.1]">
              We help you reach{' '}
              <span className="relative inline-block text-indigo-600">
                real jobs
                <svg
                  className="absolute left-0 -bottom-1.5 sm:-bottom-2 w-full"
                  height="10"
                  viewBox="0 0 200 10"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M2 7 C 50 1, 150 1, 198 6" stroke="#f59e0b" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              , faster.
            </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-5 sm:mt-6 text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl mx-auto">
              {siteName} collects verified openings for IT, Non-IT and Banking careers in one
              clean place, then sends you straight to the official application page. No
              middlemen, no clutter.
            </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  id="hero-get-started-btn"
                  onClick={() => {
                    if (user) {
                      navigate('/dashboard');
                    } else {
                      navigate('/register');
                    }
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-base shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  id="hero-view-plans-btn"
                  onClick={() => navigate('/pricing')}
                  className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-base border border-slate-300 transition-colors flex items-center justify-center gap-2"
                >
                  <span>View Plans</span>
                </button>
              </div>
            </Reveal>

            {/* Micro guarantees */}
            <Reveal delay={400}>
              <div className="pt-4 sm:pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-left">
                {[
                  'Zero recurring charges',
                  'Instant server-side unlock',
                  'External employer links',
                ].map((text, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 rounded-2xl bg-white/80 border border-slate-200 px-4 py-3 sm:py-3.5 text-sm text-slate-800 font-semibold shadow-sm backdrop-blur"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: sample card stack + floating tiles (desktop) / feature strip (mobile) */}
          <Reveal from="scale" delay={200}>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="rounded-3xl bg-white/80 backdrop-blur border border-slate-200 shadow-xl p-3 sm:p-5">
                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-400">
                  <span>Software Developer</span>
                  <Search className="w-4 h-4 text-indigo-500" />
                </div>
                <div className="mt-3 space-y-3">
                  {SAMPLE_JOBS.map((j) => (
                    <div
                      key={j.title}
                      className="rounded-xl border border-slate-100 bg-white p-3.5 sm:p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center font-bold ${j.tone}`}>
                            {j.title.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-slate-900 text-sm truncate">{j.title}</div>
                            <div className="text-xs text-slate-400 truncate">{j.org}</div>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 shrink-0 pt-1">
                          Apply <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                        <span className="flex items-center gap-1 rounded-full bg-violet-50 text-violet-600 px-2 py-0.5">
                          <MapPin className="w-3 h-3" /> {j.city}
                        </span>
                        <span className={`rounded-full px-2 py-0.5 ${j.tone}`}>{j.tag}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-center text-[11px] text-slate-400">Sample listings for illustration</p>
              </div>

              {/* Mobile + tablet: the 4 feature tiles sit under the card so nothing is lost */}
              <div className="lg:hidden mt-5 grid grid-cols-2 gap-3">
                {HERO_FEATURES.map(({ icon: Icon, label, color }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-2xl bg-white border border-slate-100 shadow-sm px-3 py-3"
                  >
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-slate-50 flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-700 leading-snug text-left">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Desktop only: floating tiles around the card */}
              <div className="hidden lg:flex absolute -left-8 top-10 flex-col items-center fmj-float">
                <div className="w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center">
                  <Search className="w-5 h-5 text-blue-600" />
                </div>
                <span className="mt-2 text-xs font-medium text-slate-600 bg-white/80 rounded px-1.5">Find jobs that fit you</span>
              </div>
              <div className="hidden lg:flex absolute -right-6 -top-6 flex-col items-center fmj-float-slow">
                <div className="w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-rose-500" />
                </div>
                <span className="mt-2 text-xs font-medium text-slate-600 bg-white/80 rounded px-1.5">Roles you’ll love</span>
              </div>
              <div className="hidden lg:flex absolute -left-6 bottom-8 flex-col items-center fmj-float-slow">
                <div className="w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-orange-500" />
                </div>
                <span className="mt-2 text-xs font-medium text-slate-600 bg-white/80 rounded px-1.5">Apply in one tap</span>
              </div>
              <div className="hidden lg:flex absolute -right-8 bottom-16 flex-col items-center fmj-float">
                <div className="w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-teal-500" />
                </div>
                <span className="mt-2 text-xs font-medium text-slate-600 bg-white/80 rounded px-1.5">Grow your career</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ STATS ============================ */}
      <section className="border-y border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 sm:gap-8 text-center">
          {[
            { node: <CountUp to={3} />, label: 'Job categories' },
            { node: <CountUp to={100} suffix="%" />, label: 'Direct apply links' },
            { node: <CountUp to={startingPrice} prefix="₹" />, label: 'Starting price' },
            { node: <CountUp to={1} suffix="×" />, label: 'One-time payment' },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div className="text-3xl sm:text-4xl font-bold text-indigo-600">{s.node}</div>
              <div className="mt-1 text-xs sm:text-sm text-slate-500">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================ PROBLEM → SOLUTION ============================ */}
      <section className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Why we exist</p>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Job hunting shouldn’t feel like a maze
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-500">
              We built {siteName} after seeing how much time job seekers lose on the same problems.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 sm:mt-12 grid md:grid-cols-2 gap-4 sm:gap-6">
          <Reveal from="left" className="h-full">
            <div className="h-full rounded-3xl border border-rose-100 bg-rose-50/60 p-6 sm:p-8">
              <h3 className="font-semibold text-slate-900 text-lg">Without us</h3>
              <ul className="mt-4 sm:mt-5 space-y-3 text-sm">
                {[
                  'Scrolling through outdated and expired posts',
                  'Fake listings and unclear sources',
                  'Pages packed with ads and redirects',
                  'Not knowing where the real apply link is',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal from="right" className="h-full">
            <div className="h-full rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6 sm:p-8">
              <h3 className="font-semibold text-slate-900 text-lg">With {siteName}</h3>
              <ul className="mt-4 sm:mt-5 space-y-3 text-sm">
                {[
                  'Fresh openings collected in one clean place',
                  'Every listing checked before it goes live',
                  'Clear role, location, deadline and apply method',
                  'One tap to the official employer page',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <BadgeCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ HOW IT WORKS (About timeline, 4 steps) ============================ */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">How it works</p>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                Four simple steps
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-500">Scroll down and follow the line.</p>
            </div>
          </Reveal>

          <div ref={timeline.ref} className="relative mt-10 sm:mt-14">
            {/* base line + progress line (centred on the number circles) */}
            <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-0.5 bg-slate-200" />
            <div
              className="absolute left-5 sm:left-6 top-0 w-0.5 bg-gradient-to-b from-indigo-500 to-violet-500"
              style={{ height: `${timeline.progress * 100}%` }}
            />

            <div className="space-y-6 sm:space-y-10">
              {STEPS.map(({ icon: Icon, title, text }, i) => (
                <Reveal key={title} delay={i * 80} from="right">
                  <div className="relative pl-14 sm:pl-20">
                    <div className="absolute left-0 top-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-indigo-500 flex items-center justify-center text-indigo-600 font-bold text-sm sm:text-base shadow-sm">
                      {i + 1}
                    </div>
                    <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-slate-900 text-base sm:text-lg">{title}</h3>
                      </div>
                      <p className="mt-3 text-sm text-slate-500 leading-relaxed">{text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visual Category Cards & All Access Best Value (Section 6) */}
      <section className="relative overflow-hidden py-12 sm:py-20 lg:py-24 bg-slate-50">
        <Blob className="-left-40 top-20 w-[300px] sm:-left-48 sm:w-[420px] lg:w-[480px] text-indigo-100/70" />
        <Blob className="-right-44 bottom-0 w-[320px] sm:-right-52 sm:w-[460px] lg:w-[520px] text-violet-100/70" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-12">
              <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Choose Your Category
              </h2>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mt-2 tracking-tight">
                Transparent, One-Time Access Pricing
              </p>
              <p className="text-sm sm:text-base text-slate-500 mt-3">
                No hidden subscriptions. Select the specific industry you are targeting, or unlock everything in one step.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8 items-stretch mb-8 sm:mb-10">
            {/* IT Jobs Card */}
            <Reveal delay={0} className="h-full">
              <div className="h-full bg-white rounded-3xl overflow-hidden flex flex-col justify-between border border-slate-200 transition-all hover:-translate-y-1.5 hover:shadow-xl">
                <div>
                  <div className="h-20 sm:h-24 bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center px-5 lg:px-6">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-white">
                      <Code className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="p-5 lg:p-6">
                    <h3 className="text-lg lg:text-xl font-semibold text-slate-900">IT & Software Jobs</h3>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                      Software Engineering, DevOps, Cloud, AI/ML, Full Stack, and Data openings.
                    </p>
                    <div className="mt-5 mb-4">
                      <span className="text-3xl font-bold text-indigo-600">
                        {formatPrice(itPkg.price)}
                      </span>
                      <span className="text-xs text-slate-400 font-medium ml-1">one-time access</span>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-600 border-t border-slate-100 pt-4">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Curated tech startups & MNCs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Direct official application links</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Experience & salary breakdowns</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="px-5 lg:px-6 pb-5 lg:pb-6">
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
                      className="w-full min-h-[44px] px-3 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-indigo-200 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Unlock IT Jobs ({formatPrice(itPkg.price)})</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  )}
                </div>
              </div>
            </Reveal>

            {/* Non-IT Jobs Card */}
            <Reveal delay={120} className="h-full">
              <div className="h-full bg-white rounded-3xl overflow-hidden flex flex-col justify-between border border-slate-200 transition-all hover:-translate-y-1.5 hover:shadow-xl">
                <div>
                  <div className="h-20 sm:h-24 bg-gradient-to-br from-amber-500 to-orange-500 flex items-center px-5 lg:px-6">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-white">
                      <Briefcase className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="p-5 lg:p-6">
                    <h3 className="text-lg lg:text-xl font-semibold text-slate-900">Non-IT Jobs</h3>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                      Human Resources, Supply Chain, Operations, Marketing, and Administrative careers.
                    </p>
                    <div className="mt-5 mb-4">
                      <span className="text-3xl font-bold text-indigo-600">
                        {formatPrice(nonItPkg.price)}
                      </span>
                      <span className="text-xs text-slate-400 font-medium ml-1">one-time access</span>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-600 border-t border-slate-100 pt-4">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Corporate & logistics management</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Verified employer recruitment portals</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Instant access without manual review</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="px-5 lg:px-6 pb-5 lg:pb-6">
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
                      className="w-full min-h-[44px] px-3 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-indigo-200 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Unlock Non-IT Jobs ({formatPrice(nonItPkg.price)})</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  )}
                </div>
              </div>
            </Reveal>

            {/* Banking Jobs Card */}
            <Reveal delay={240} className="h-full">
              <div className="h-full bg-white rounded-3xl overflow-hidden flex flex-col justify-between border border-slate-200 transition-all hover:-translate-y-1.5 hover:shadow-xl">
                <div>
                  <div className="h-20 sm:h-24 bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center px-5 lg:px-6">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-white">
                      <Landmark className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="p-5 lg:p-6">
                    <h3 className="text-lg lg:text-xl font-semibold text-slate-900">Banking Jobs</h3>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                      Commercial Banking, Risk Underwriting, Wealth Management, FinTech & NBFCs.
                    </p>
                    <div className="mt-5 mb-4">
                      <span className="text-3xl font-bold text-indigo-600">
                        {formatPrice(bankingPkg.price)}
                      </span>
                      <span className="text-xs text-slate-400 font-medium ml-1">one-time access</span>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-600 border-t border-slate-100 pt-4">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Private & PSU banking openings</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Direct careers portal links</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Detailed eligibility criteria</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="px-5 lg:px-6 pb-5 lg:pb-6">
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
                      className="w-full min-h-[44px] px-3 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-indigo-200 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Unlock Banking Jobs ({formatPrice(bankingPkg.price)})</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  )}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Highlighted ALL ACCESS Card (Section 6: Best-value styling) */}
          <Reveal from="scale">
            <div className="relative max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 p-1 shadow-xl shadow-indigo-300/30">
              <div className="relative overflow-hidden bg-slate-900/95 rounded-[22px] p-5 sm:p-8 lg:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
                <div className="absolute -top-10 -left-10 w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-white/5" />
                <div className="absolute -bottom-12 -right-12 w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-white/5" />

                <div className="relative space-y-3 max-w-lg w-full">
                  <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-amber-200 bg-amber-400/20 border border-amber-300/30 px-3 py-1 rounded-full uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> Best Value Bundle
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                    All Access Pass — {formatPrice(allPkg.price)}
                  </h3>
                  <p className="text-indigo-100 text-sm leading-relaxed">
                    Unlock complete access to all three industries (IT + Non-IT + Banking) in one single payment. Save over 30% compared to purchasing separately.
                  </p>
                  <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2 pt-2 text-xs sm:text-sm text-indigo-100">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                      <span>All IT & Software roles</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                      <span>All Non-IT & Operations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                      <span>All Banking & Finance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                      <span>Instant lifetime unlock</span>
                    </div>
                  </div>
                </div>

                <div className="relative w-full md:w-auto text-center md:text-right shrink-0 border-t border-white/10 pt-5 md:border-0 md:pt-0">
                  <div className="mb-4">
                    <span className="text-4xl sm:text-5xl font-bold text-white">
                      {formatPrice(allPkg.price)}
                    </span>
                    <div className="text-xs text-indigo-200 mt-1">One-time payment • No charges ever</div>
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
                      className="w-full md:w-auto min-h-[44px] px-6 sm:px-8 py-3.5 bg-white hover:bg-indigo-50 text-indigo-700 font-bold rounded-xl text-sm transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Get All Access Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Scope Disclaimer Banner (Section 1) */}
      <section className="bg-white py-8 sm:py-10 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-6 flex gap-3 sm:gap-4 text-left">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-600 space-y-1 leading-relaxed">
                <p className="font-semibold text-slate-900">
                  Important Notice on Application Links:
                </p>
                <p>
                  {settings?.site_name || 'FindMyJobs'} is a curated job listing and link provider. Users never apply inside this application. Clicking &quot;Apply Now&quot; sends you to original employer application URLs. We do not participate in candidate selection or employment decisions.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ "SEE IT IN ACTION" BANNER ============================ */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <Reveal from="scale">
          <div className="relative max-w-7xl mx-auto overflow-hidden rounded-3xl sm:rounded-[2rem] bg-gradient-to-br from-orange-50 via-indigo-50 to-violet-100 border border-white shadow-sm">
            <div className="absolute -bottom-24 -left-16 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-indigo-200/50 blur-2xl" />
            <div className="absolute -bottom-20 right-0 sm:right-10 w-72 sm:w-[28rem] h-56 sm:h-72 rounded-full bg-violet-200/60 blur-2xl" />

            <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-10 items-center p-6 sm:p-12 lg:p-16">
              <div className="text-center lg:text-left">
                <span className="inline-block rounded-full bg-amber-100 text-amber-900 text-xs sm:text-sm font-semibold px-3.5 sm:px-4 py-1.5">
                  Explore. Apply. Grow.
                </span>
                <h2 className="mt-4 sm:mt-5 text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                  Ready to see <span className="text-indigo-600">{siteName}</span> in action?
                </h2>
                <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                  Discover openings that match your skills, apply on the official page, and take
                  the next step in your career.
                </p>
                <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center lg:justify-start gap-4">
                  <button
                    onClick={() => navigate('/jobs/all')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-semibold shadow-lg shadow-teal-200 transition-all hover:-translate-y-0.5"
                  >
                    Explore Jobs Now <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="flex items-end justify-center gap-1 text-violet-700">
                    <CurvedArrow className="hidden sm:block text-orange-400 -scale-y-100 rotate-[-12deg]" flip />
                    <span
                      className="text-sm sm:text-base sm:-rotate-6"
                      style={{ fontFamily: '"Comic Sans MS", "Segoe Script", "Brush Script MT", cursive' }}
                    >
                      It only takes a minute!
                    </span>
                  </div>
                </div>
              </div>

              {/* feature tiles with arrows */}
              <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-10">
                {[
                  { icon: Search, label: 'Find jobs that fit you', color: 'text-blue-600', float: 'fmj-float' },
                  { icon: Heart, label: 'Opportunities you’ll love', color: 'text-rose-500', float: 'fmj-float-slow' },
                  { icon: Zap, label: 'Apply in just one tap', color: 'text-orange-500', float: 'fmj-float-slow' },
                  { icon: TrendingUp, label: 'Grow your career', color: 'text-teal-500', float: 'fmj-float' },
                ].map(({ icon: Icon, label, color, float }) => (
                  <div key={label} className={`flex flex-col items-center text-center ${float}`}>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center">
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${color}`} />
                    </div>
                    <span className="mt-3 text-xs sm:text-sm font-medium text-slate-700 max-w-[9rem]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============================ NOTICE + FINAL CTA ============================ */}
      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-16 sm:pb-24">
        <Reveal>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-6 flex gap-3 sm:gap-4">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-900">Good to know: </span>
              {siteName} is a curated job listing and link provider. We do not take part in
              candidate selection or hiring decisions, and we cannot guarantee interviews or
              employment.{' '}
              <button
                onClick={() => navigate('/disclaimer')}
                className="font-semibold text-amber-800 hover:underline text-left"
              >
                Read the full disclaimer
              </button>
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="relative mt-8 sm:mt-10 overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 sm:px-6 py-10 sm:py-14 text-center shadow-xl">
            <div className="absolute -top-10 -left-10 w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-white/10" />
            <div className="absolute -bottom-12 -right-12 w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-white/10" />
            <div className="relative">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Your next opportunity is a few taps away
              </h3>
              <p className="mt-3 text-sm sm:text-base text-indigo-100 max-w-xl mx-auto">
                Unlock verified listings today and apply directly with employers.
              </p>
              <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                <button
                  onClick={() => navigate('/pricing')}
                  className="px-6 py-3 rounded-xl bg-white text-indigo-700 font-semibold hover:bg-indigo-50 transition-colors"
                >
                  View Pricing
                </button>
                <a
                  href="mailto:support@findmyjobs.in"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-indigo-300 text-white font-semibold hover:bg-white/10 transition-colors break-all sm:break-normal"
                >
                  <Mail className="w-4 h-4 shrink-0" /> support@findmyjobs.in
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};