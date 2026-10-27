// import React from 'react';
// import { Briefcase, Shield, CheckCircle2, Lock } from 'lucide-react';
// import { usePackages } from '../context/PackagesContext.tsx';

// interface FooterProps {
//   navigate: (path: string) => void;
// }

// export const Footer: React.FC<FooterProps> = ({ navigate }) => {
//   const { settings } = usePackages();
//   const siteName = settings?.site_name || 'FindMyJobs';

//   return (
//     <footer className="border-t border-slate-200 bg-white text-slate-600 mt-auto">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//           {/* Brand Info */}
//           <div className="md:col-span-2 space-y-3">
//             <div
//               onClick={() => navigate('/')}
//               className="flex items-center gap-2.5 cursor-pointer"
//             >
//               <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
//                 <Briefcase className="w-4 h-4" />
//               </div>
//               <span className="font-bold text-lg text-slate-900 tracking-tight">
//                 {siteName}
//               </span>
//             </div>
//             <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
//               Curated direct-access job board for IT, Non-IT, and Banking careers.
//               Pay once for your chosen category to browse verified listings and apply
//               directly via external hiring portals.
//             </p>
//             <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
//               <span className="flex items-center gap-1">
//                 <Shield className="w-3.5 h-3.5 text-emerald-600" /> Verified Listings
//               </span>
//               <span className="flex items-center gap-1">
//                 <Lock className="w-3.5 h-3.5 text-indigo-600" /> Razorpay Secured
//               </span>
//               <span className="flex items-center gap-1">
//                 <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Instant Access
//               </span>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
//               Categories
//             </h4>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <button
//                   onClick={() => navigate('/jobs/it')}
//                   className="hover:text-indigo-600 transition-colors"
//                 >
//                   IT & Software Jobs
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/jobs/non-it')}
//                   className="hover:text-indigo-600 transition-colors"
//                 >
//                   Non-IT & Operations
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/jobs/banking')}
//                   className="hover:text-indigo-600 transition-colors"
//                 >
//                   Banking & Finance
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/pricing')}
//                   className="hover:text-indigo-600 transition-colors"
//                 >
//                   All Access Pass (₹99)
//                 </button>
//               </li>
//             </ul>
//           </div>

//           {/* Legal Pages */}
//           <div>
//             <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
//               Legal & Policies
//             </h4>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <button
//                   onClick={() => navigate('/terms')}
//                   className="hover:text-indigo-600 transition-colors"
//                 >
//                   Terms & Conditions
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/privacy')}
//                   className="hover:text-indigo-600 transition-colors"
//                 >
//                   Privacy Policy
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/refund')}
//                   className="hover:text-indigo-600 transition-colors"
//                 >
//                   Refund Policy
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/disclaimer')}
//                   className="hover:text-indigo-600 transition-colors font-medium text-amber-700"
//                 >
//                   Disclaimer & Hiring Notice
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
//           <p>
//             © {new Date().getFullYear()} {siteName}. All rights reserved. Platform provides curated job links only; does not guarantee interviews or employment.
//           </p>
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => navigate('/admin/login')}
//               className="text-slate-400 hover:text-slate-600 underline"
//             >
//               Admin Access
//             </button>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };



















// import React from 'react';
// import { Shield, CheckCircle2, Lock } from 'lucide-react';
// import { usePackages } from '../context/PackagesContext.tsx';

// interface FooterProps {
//   navigate: (path: string) => void;
// }

// export const Footer: React.FC<FooterProps> = ({ navigate }) => {
//   const { settings } = usePackages();
//   const siteName = settings?.site_name || 'FindMyJobs';

//   return (
//     <footer className="border-t border-slate-200 bg-white text-slate-600 mt-auto">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//           {/* Brand Info */}
//           <div className="md:col-span-2 space-y-3">
//             <div
//               onClick={() => navigate('/')}
//               className="flex items-center gap-2.5 cursor-pointer"
//             >
//               <svg
//                 viewBox="0 0 128 128"
//                 className="w-10 h-10 shrink-0"
//                 role="img"
//                 aria-hidden="true"
//               >
//                 <rect width="128" height="128" rx="34" fill="#4F35D2" />
//                 <g transform="translate(-4 -4.5)">
//                   <circle cx="50" cy="42" r="17" fill="#FFFFFF" />
//                   <path d="M16 100 Q16 66 50 66 Q84 66 84 100 Z" fill="#FFFFFF" />
//                   <path
//                     d="M82 76 V65 H106 V76"
//                     fill="none"
//                     stroke="#F2A20C"
//                     strokeWidth="6.5"
//                     strokeLinejoin="round"
//                   />
//                   <rect
//                     x="68"
//                     y="74"
//                     width="54"
//                     height="40"
//                     rx="10"
//                     fill="#F2A20C"
//                     stroke="#4F35D2"
//                     strokeWidth="4"
//                     paintOrder="stroke"
//                   />
//                   <text
//                     x="95"
//                     y="100"
//                     textAnchor="middle"
//                     fontFamily="Inter, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
//                     fontSize="18"
//                     fontWeight="700"
//                     fill="#FFFFFF"
//                   >
//                     Jobs
//                   </text>
//                 </g>
//               </svg>
//               <span className="font-bold text-lg text-slate-900 tracking-tight">
//                 {siteName}
//               </span>
//             </div>
//             <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
//               Curated direct-access job board for IT, Non-IT, and Banking careers.
//               Pay once for your chosen category to browse verified listings and apply
//               directly via external hiring portals.
//             </p>
//             <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
//               <span className="flex items-center gap-1">
//                 <Shield className="w-3.5 h-3.5 text-emerald-600" /> Verified Listings
//               </span>
//               <span className="flex items-center gap-1">
//                 <Lock className="w-3.5 h-3.5 text-indigo-600" /> Razorpay Secured
//               </span>
//               <span className="flex items-center gap-1">
//                 <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Instant Access
//               </span>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
//               Categories
//             </h4>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <button
//                   onClick={() => navigate('/jobs/it')}
//                   className="hover:text-indigo-600 transition-colors"
//                 >
//                   IT & Software Jobs
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/jobs/non-it')}
//                   className="hover:text-indigo-600 transition-colors"
//                 >
//                   Non-IT & Operations
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/jobs/banking')}
//                   className="hover:text-indigo-600 transition-colors"
//                 >
//                   Banking & Finance
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/pricing')}
//                   className="hover:text-indigo-600 transition-colors"
//                 >
//                   All Access Pass (₹99)
//                 </button>
//               </li>
//             </ul>
//           </div>

//           {/* Legal Pages */}
//           <div>
//             <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
//               Legal & Policies
//             </h4>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <button
//                   onClick={() => navigate('/terms')}
//                   className="hover:text-indigo-600 transition-colors"
//                 >
//                   Terms & Conditions
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/privacy')}
//                   className="hover:text-indigo-600 transition-colors"
//                 >
//                   Privacy Policy
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/refund')}
//                   className="hover:text-indigo-600 transition-colors"
//                 >
//                   Refund Policy
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/disclaimer')}
//                   className="hover:text-indigo-600 transition-colors font-medium text-amber-700"
//                 >
//                   Disclaimer & Hiring Notice
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
//           <p>
//             © {new Date().getFullYear()} {siteName}. All rights reserved. Platform provides curated job links only; does not guarantee interviews or employment.
//           </p>
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => navigate('/admin/login')}
//               className="text-slate-400 hover:text-slate-600 underline"
//             >
//               Admin Access
//             </button>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };












// import React from 'react';
// import { Shield, CheckCircle2, Lock } from 'lucide-react';
// import { usePackages } from '../context/PackagesContext.tsx';

// interface FooterProps {
//   navigate: (path: string) => void;
// }

// export const Footer: React.FC<FooterProps> = ({ navigate }) => {
//   const { settings } = usePackages();
//   const siteName = settings?.site_name || 'FindMyJobs';

//   return (
//     <footer className="border-t border-slate-200 bg-white text-slate-600 mt-auto">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//           {/* Brand Info */}
//           <div className="md:col-span-2 space-y-3">
//             <div
//               onClick={() => navigate('/')}
//               className="flex items-center gap-2.5 cursor-pointer"
//             >
//               <img
//                 src="/logo.svg"
//                 alt=""
//                 aria-hidden="true"
//                 className="w-10 h-10 shrink-0"
//               />
//               <span className="font-bold text-lg text-slate-900 tracking-tight">
//                 {siteName}
//               </span>
//             </div>
//             <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
//               Curated direct-access job board for IT, Non-IT, and Banking careers.
//               Pay once for your chosen category to browse verified listings and apply
//               directly via external hiring portals.
//             </p>
//             <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
//               <span className="flex items-center gap-1">
//                 <Shield className="w-3.5 h-3.5 text-emerald-600" /> Verified Listings
//               </span>
//               <span className="flex items-center gap-1">
//                 <Lock className="w-3.5 h-3.5 text-indigo-600" /> Razorpay Secured
//               </span>
//               <span className="flex items-center gap-1">
//                 <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Instant Access
//               </span>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
//               Categories
//             </h4>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <button
//                   onClick={() => navigate('/jobs/it')}
//                   className="hover:text-indigo-600 transition-colors"
//                 >
//                   IT & Software Jobs
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/jobs/non-it')}
//                   className="hover:text-indigo-600 transition-colors"
//                 >
//                   Non-IT & Operations
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/jobs/banking')}
//                   className="hover:text-indigo-600 transition-colors"
//                 >
//                   Banking & Finance
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/pricing')}
//                   className="hover:text-indigo-600 transition-colors"
//                 >
//                   All Access Pass (₹99)
//                 </button>
//               </li>
//             </ul>
//           </div>

//           {/* Legal Pages */}
//           <div>
//             <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
//               Legal & Policies
//             </h4>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <button
//                   onClick={() => navigate('/terms')}
//                   className="hover:text-indigo-600 transition-colors"
//                 >
//                   Terms & Conditions
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/privacy')}
//                   className="hover:text-indigo-600 transition-colors"
//                 >
//                   Privacy Policy
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/refund')}
//                   className="hover:text-indigo-600 transition-colors"
//                 >
//                   Refund Policy
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={() => navigate('/disclaimer')}
//                   className="hover:text-indigo-600 transition-colors font-medium text-amber-700"
//                 >
//                   Disclaimer & Hiring Notice
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
//           <p>
//             © {new Date().getFullYear()} {siteName}. All rights reserved. Platform provides curated job links only; does not guarantee interviews or employment.
//           </p>
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => navigate('/admin/login')}
//               className="text-slate-400 hover:text-slate-600 underline"
//             >
//               Admin Access
//             </button>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

















import React from 'react';
import {
  Shield,
  CheckCircle2,
  Lock,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
} from 'lucide-react';
import { usePackages } from '../context/PackagesContext.tsx';

interface FooterProps {
  navigate: (path: string) => void;
}

// Official X (formerly Twitter) logo as an inline SVG (lucide-react has no X brand icon).
// It takes the same className as the lucide icons and inherits the text colour.
const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Social media links: replace each URL with your real page.
// Leave a URL empty ('') to hide that icon automatically.
const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/findmyjobs',
    icon: Instagram,
    hover: 'hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200',
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/findmyjobs',
    icon: Facebook,
    hover: 'hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200',
  },
  {
    name: 'X',
    href: 'https://x.com/findmyjobs',
    icon: XIcon,
    hover: 'hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/findmyjobs',
    icon: Linkedin,
    hover: 'hover:bg-sky-50 hover:text-sky-700 hover:border-sky-200',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@findmyjobs',
    icon: Youtube,
    hover: 'hover:bg-red-50 hover:text-red-600 hover:border-red-200',
  },
].filter((s) => s.href);

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { settings } = usePackages();
  const siteName = settings?.site_name || 'FindMyJobs';

  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <img
                src="/logo.svg"
                alt=""
                aria-hidden="true"
                className="w-10 h-10 shrink-0"
              />
              <span className="font-bold text-lg text-slate-900 tracking-tight">
                {siteName}
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              Curated direct-access job board for IT, Non-IT, and Banking careers.
              Pay once for your chosen category to browse verified listings and apply
              directly via external hiring portals.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-600" /> Verified Listings
              </span>
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-indigo-600" /> Razorpay Secured
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Instant Access
              </span>
            </div>

            {/* Social Media */}
            {SOCIAL_LINKS.length > 0 && (
              <div className="pt-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Follow Us
                </h4>
                <ul className="flex flex-wrap items-center gap-2.5">
                  {SOCIAL_LINKS.map(({ name, href, icon: Icon, hover }) => (
                    <li key={name}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${siteName} on ${name}`}
                        title={name}
                        className={`w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${hover}`}
                      >
                        <Icon className="w-[18px] h-[18px]" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate('/jobs/it')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  IT & Software Jobs
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/jobs/non-it')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Non-IT & Operations
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/jobs/banking')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Banking & Finance
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/pricing')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  All Access Pass (₹99)
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Pages */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Legal & Policies
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate('/terms')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/privacy')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/refund')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Refund Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/disclaimer')}
                  className="hover:text-indigo-600 transition-colors font-medium text-amber-700"
                >
                  Disclaimer & Hiring Notice
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {siteName}. All rights reserved. Platform provides curated job links only; does not guarantee interviews or employment.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/login')}
              className="text-slate-400 hover:text-slate-600 underline"
            >
              Admin Access
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};