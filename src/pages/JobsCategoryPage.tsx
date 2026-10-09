// import React, { useEffect, useState, useMemo } from 'react';
// import type { Job } from '../types/index.ts';
// import { useAuth } from '../context/AuthContext.tsx';
// import { usePackages } from '../context/PackagesContext.tsx';
// import { JobCard } from '../components/JobCard.tsx';
// import {
//   Lock,
//   Search,
//   SlidersHorizontal,
//   Briefcase,
//   Code,
//   Landmark,
//   Sparkles,
//   ArrowRight,
//   ShieldAlert,
//   Loader2,
//   AlertCircle,
// } from 'lucide-react';

// interface JobsCategoryPageProps {
//   categorySlug: string; // 'it' | 'non-it' | 'banking' | 'all'
//   navigate: (path: string) => void;
//   onOpenCheckout: (slug: string) => void;
// }

// export const JobsCategoryPage: React.FC<JobsCategoryPageProps> = ({
//   categorySlug,
//   navigate,
//   onOpenCheckout,
// }) => {
//   const { user, token, access } = useAuth();
//   const { getPackageBySlug, formatPrice } = usePackages();

//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isLocked, setIsLocked] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Search and Sort controls
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'deadline'>('latest');

//   const pkg = getPackageBySlug(categorySlug) || {
//     id: `pkg_${categorySlug}`,
//     slug: categorySlug,
//     name: `${categorySlug.toUpperCase()} Jobs`,
//     price: categorySlug === 'non-it' ? 39 : 49,
//     description: 'Instant access to curated jobs and external application links.',
//   };

//   const getCategoryTitle = () => {
//     switch (categorySlug) {
//       case 'it':
//         return 'IT & Software Engineering Jobs';
//       case 'non-it':
//         return 'Non-IT & Operations Jobs';
//       case 'banking':
//         return 'Banking & Financial Services Jobs';
//       case 'all':
//         return 'All Job Categories';
//       default:
//         return 'Job Listings';
//     }
//   };

//   const getCategoryIcon = () => {
//     switch (categorySlug) {
//       case 'it':
//         return <Code className="w-5 h-5 text-blue-600" />;
//       case 'non-it':
//         return <Briefcase className="w-5 h-5 text-amber-600" />;
//       case 'banking':
//         return <Landmark className="w-5 h-5 text-emerald-600" />;
//       default:
//         return <Sparkles className="w-5 h-5 text-indigo-600" />;
//     }
//   };

//   useEffect(() => {
//     const fetchJobs = async () => {
//       setLoading(true);
//       setError(null);
//       setIsLocked(false);

//       if (!token) {
//         setIsLocked(true);
//         setLoading(false);
//         return;
//       }

//       try {
//         const url = `/api/jobs/category/${categorySlug}`;
//         const res = await fetch(url, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (res.status === 403) {
//           setIsLocked(true);
//           setLoading(false);
//           return;
//         }

//         if (!res.ok) {
//           throw new Error('Failed to retrieve job listings');
//         }

//         const data = await res.json();
//         setJobs(data);
//       } catch (err: any) {
//         setError(err.message || 'Error fetching jobs');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, [categorySlug, token, access]);

//   // Client-side search and sort (Section 7)
//   const filteredJobs = useMemo(() => {
//     let result = [...jobs];

//     if (searchQuery.trim()) {
//       const q = searchQuery.toLowerCase();
//       result = result.filter(
//         (j) =>
//           j.title.toLowerCase().includes(q) ||
//           j.company_name.toLowerCase().includes(q) ||
//           j.location.toLowerCase().includes(q) ||
//           j.skills.some((s) => s.toLowerCase().includes(q))
//       );
//     }

//     result.sort((a, b) => {
//       if (sortBy === 'latest') {
//         return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
//       }
//       if (sortBy === 'oldest') {
//         return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
//       }
//       if (sortBy === 'deadline') {
//         return a.deadline.localeCompare(b.deadline);
//       }
//       return 0;
//     });

//     return result;
//   }, [jobs, searchQuery, sortBy]);

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//       {/* Category Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
//         <div className="flex items-center gap-3">
//           <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200 shadow-xs">
//             {getCategoryIcon()}
//           </div>
//           <div>
//             <div className="flex items-center gap-2">
//               <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
//                 {getCategoryTitle()}
//               </h1>
//               {!isLocked && (
//                 <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
//                   Unlocked
//                 </span>
//               )}
//             </div>
//             <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
//               Curated openings with direct links to external employer application portals.
//             </p>
//           </div>
//         </div>

//         {/* Category Switcher Tabs */}
//         <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-medium self-start md:self-auto overflow-x-auto max-w-full">
//           {[
//             { slug: 'it', label: 'IT' },
//             { slug: 'non-it', label: 'Non-IT' },
//             { slug: 'banking', label: 'Banking' },
//             { slug: 'all', label: 'All Jobs' },
//           ].map((cat) => (
//             <button
//               key={cat.slug}
//               onClick={() => navigate(`/jobs/${cat.slug}`)}
//               className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
//                 categorySlug === cat.slug
//                   ? 'bg-white text-slate-900 font-bold shadow-xs'
//                   : 'text-slate-600 hover:text-slate-900'
//               }`}
//             >
//               {cat.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Locked State / 403 Handler (Section 3 & 7) */}
//       {isLocked ? (
//         <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-lg p-8 text-center space-y-5 my-8">
//           <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
//             <Lock className="w-8 h-8" />
//           </div>

//           <div>
//             <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
//               Protected Access
//             </span>
//             <h2 className="text-2xl font-bold text-slate-900 mt-1">
//               {getCategoryTitle()} are Locked
//             </h2>
//             <p className="text-sm text-slate-600 mt-2 leading-relaxed">
//               This category requires an active access pass. Pay once to unlock all current and future listings in this industry forever.
//             </p>
//           </div>

//           {/* Pricing Box */}
//           <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-center">
//             <div className="text-3xl font-extrabold text-slate-900">
//               {formatPrice(pkg.price)}
//             </div>
//             <span className="text-xs text-slate-500">
//               One-time payment • Instant Razorpay activation
//             </span>
//           </div>

//           <div className="space-y-2 pt-2">
//             {!user ? (
//               <button
//                 onClick={() => navigate('/login')}
//                 className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
//               >
//                 <span>Sign In to Unlock Access</span>
//                 <ArrowRight className="w-4 h-4" />
//               </button>
//             ) : (
//               <button
//                 id="btn-unlock-category"
//                 onClick={() => onOpenCheckout(categorySlug)}
//                 className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
//               >
//                 <Lock className="w-4 h-4" />
//                 <span>Unlock {pkg.name} ({formatPrice(pkg.price)})</span>
//               </button>
//             )}

//             <button
//               onClick={() => onOpenCheckout('all')}
//               className="w-full py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
//             >
//               <Sparkles className="w-3.5 h-3.5" />
//               <span>Or Get All Access Bundle (IT + Non-IT + Banking) for ₹99</span>
//             </button>
//           </div>
//         </div>
//       ) : loading ? (
//         /* Loading Skeleton */
//         <div className="py-16 text-center text-slate-400 space-y-3">
//           <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600" />
//           <p className="text-sm">Verifying server access & loading verified jobs...</p>
//         </div>
//       ) : (
//         /* Unlocked View: Search, Filter, and Job Cards */
//         <div className="space-y-6">
//           {/* Controls Bar: Search & Sort (Section 7) */}
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
//             <div className="relative w-full sm:w-80">
//               <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search title, company, city, skill..."
//                 className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
//               />
//             </div>

//             <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
//               <span className="text-xs text-slate-500 flex items-center gap-1">
//                 <SlidersHorizontal className="w-3.5 h-3.5" /> Sort:
//               </span>
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value as any)}
//                 className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
//               >
//                 <option value="latest">Latest Posted</option>
//                 <option value="oldest">Oldest First</option>
//                 <option value="deadline">Application Deadline</option>
//               </select>
//               <div className="text-xs font-semibold text-slate-400 px-1">
//                 {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'}
//               </div>
//             </div>
//           </div>

//           {/* Jobs Grid */}
//           {filteredJobs.length === 0 ? (
//             <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 space-y-2">
//               <Briefcase className="w-10 h-10 mx-auto text-slate-300" />
//               <h3 className="font-bold text-slate-700 text-base">No Jobs Found</h3>
//               <p className="text-xs text-slate-400 max-w-sm mx-auto">
//                 No matching jobs in this category match your search criteria. Try clearing the search filter.
//               </p>
//               {searchQuery && (
//                 <button
//                   onClick={() => setSearchQuery('')}
//                   className="mt-2 text-xs text-indigo-600 font-semibold hover:underline"
//                 >
//                   Clear search filters
//                 </button>
//               )}
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//               {filteredJobs.map((job) => (
//                 <JobCard
//                   key={job.id}
//                   job={job}
//                   onClick={() => navigate(`/jobs/view/${job.id}`)}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };



















import React, {
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { Job } from '../types/index.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { usePackages } from '../context/PackagesContext.tsx';
import {
  JobCard,
  CardBoundary,
  sanitizeJob,
  toTime,
} from '../components/JobCard.tsx';
import {
  Lock,
  Search,
  SlidersHorizontal,
  Briefcase,
  Code,
  Landmark,
  Sparkles,
  ArrowRight,
  Loader2,
  AlertCircle,
} from 'lucide-react';

interface JobsCategoryPageProps {
  categorySlug: string; // 'it' | 'non-it' | 'banking' | 'all'
  navigate: (path: string) => void;
  onOpenCheckout: (slug: string) => void;
}

const PAGE_SIZE = 18;

export const JobsCategoryPage: React.FC<JobsCategoryPageProps> = ({
  categorySlug,
  navigate,
  onOpenCheckout,
}) => {
  const { user, token, access } = useAuth();
  const { getPackageBySlug, formatPrice } = usePackages();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const deferredQuery = useDeferredValue(searchQuery);
  const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'deadline'>('latest');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const pkg = getPackageBySlug(categorySlug) || {
    id: `pkg_${categorySlug}`,
    slug: categorySlug,
    name: `${categorySlug.toUpperCase()} Jobs`,
    price: categorySlug === 'non-it' ? 39 : 49,
    description: 'Instant access to curated jobs and external application links.',
  };

  const getCategoryTitle = () => {
    switch (categorySlug) {
      case 'it':
        return 'IT & Software Engineering Jobs';
      case 'non-it':
        return 'Non-IT & Operations Jobs';
      case 'banking':
        return 'Banking & Financial Services Jobs';
      case 'all':
        return 'All Job Categories';
      default:
        return 'Job Listings';
    }
  };

  const getCategoryIcon = () => {
    switch (categorySlug) {
      case 'it':
        return <Code className="w-5 h-5 text-blue-600" />;
      case 'non-it':
        return <Briefcase className="w-5 h-5 text-amber-600" />;
      case 'banking':
        return <Landmark className="w-5 h-5 text-emerald-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-indigo-600" />;
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      setIsLocked(false);

      if (!token) {
        setIsLocked(true);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `/api/jobs/category/${encodeURIComponent(categorySlug)}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            signal: controller.signal,
          }
        );

        if (res.status === 403) {
          setIsLocked(true);
          return;
        }
        if (res.status === 429) {
          throw new Error('Too many requests. Please wait a moment and try again.');
        }
        if (!res.ok) {
          throw new Error('Failed to retrieve job listings');
        }

        const data = await res.json();
        const list: any[] = Array.isArray(data)
          ? data
          : Array.isArray(data?.jobs)
            ? data.jobs
            : [];

        setJobs(list.filter((j) => j && j.id != null).map(sanitizeJob));
      } catch (err: any) {
        if (err?.name === 'AbortError') return;
        setError(err?.message || 'Error fetching jobs');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchJobs();
    return () => controller.abort();
  }, [categorySlug, token, access, reloadKey]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [categorySlug, deferredQuery, sortBy]);

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    const q = deferredQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company_name.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q) ||
          j.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'latest') return toTime(b.created_at) - toTime(a.created_at);
      if (sortBy === 'oldest') return toTime(a.created_at) - toTime(b.created_at);
      return a.deadline.localeCompare(b.deadline);
    });

    return result;
  }, [jobs, deferredQuery, sortBy]);

  const visibleJobs = useMemo(
    () => filteredJobs.slice(0, visibleCount),
    [filteredJobs, visibleCount]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Category Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200 shadow-xs">
            {getCategoryIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {getCategoryTitle()}
              </h1>
              {!isLocked && !loading && !error && (
                <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                  Unlocked
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Curated openings with direct links to external employer application portals.
            </p>
          </div>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-medium self-start md:self-auto overflow-x-auto max-w-full">
          {[
            { slug: 'it', label: 'IT' },
            { slug: 'non-it', label: 'Non-IT' },
            { slug: 'banking', label: 'Banking' },
            { slug: 'all', label: 'All Jobs' },
          ].map((cat) => (
            <button
              key={cat.slug}
              onClick={() => navigate(`/jobs/${cat.slug}`)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                categorySlug === cat.slug
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {isLocked ? (
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-lg p-8 text-center space-y-5 my-8">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Protected Access
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              {getCategoryTitle()} are Locked
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              This category requires an active access pass. Pay once to unlock all current and future listings in this industry forever.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-center">
            <div className="text-3xl font-extrabold text-slate-900">
              {formatPrice(pkg.price)}
            </div>
            <span className="text-xs text-slate-500">
              One-time payment • Instant Razorpay activation
            </span>
          </div>

          <div className="space-y-2 pt-2">
            {!user ? (
              <button
                onClick={() => navigate('/login')}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Sign In to Unlock Access</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                id="btn-unlock-category"
                onClick={() => onOpenCheckout(categorySlug)}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>
                  Unlock {pkg.name} ({formatPrice(pkg.price)})
                </span>
              </button>
            )}

            <button
              onClick={() => onOpenCheckout('all')}
              className="w-full py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Or Get All Access Bundle (IT + Non-IT + Banking) for ₹99</span>
            </button>
          </div>
        </div>
      ) : loading ? (
        <div className="py-16 text-center text-slate-400 space-y-3">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600" />
          <p className="text-sm">Verifying server access & loading verified jobs...</p>
        </div>
      ) : error ? (
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3 my-8">
          <AlertCircle className="w-10 h-10 mx-auto text-red-400" />
          <h3 className="font-bold text-slate-800">Couldn&apos;t load jobs</h3>
          <p className="text-xs text-slate-500">{error}</p>
          <button
            onClick={() => setReloadKey((k) => k + 1)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                maxLength={100}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title, company, city, skill..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'latest' | 'oldest' | 'deadline')
                }
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="latest">Latest Posted</option>
                <option value="oldest">Oldest First</option>
                <option value="deadline">Application Deadline</option>
              </select>
              <div className="text-xs font-semibold text-slate-400 px-1">
                {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'}
              </div>
            </div>
          </div>

          {/* Jobs Grid */}
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 space-y-2">
              <Briefcase className="w-10 h-10 mx-auto text-slate-300" />
              <h3 className="font-bold text-slate-700 text-base">No Jobs Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No matching jobs in this category match your search criteria. Try clearing the search filter.
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-xs text-indigo-600 font-semibold hover:underline"
                >
                  Clear search filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {visibleJobs.map((job) => (
                  <CardBoundary key={job.id}>
                    <JobCard
                      job={job}
                      onClick={() => navigate(`/jobs/view/${job.id}`)}
                    />
                  </CardBoundary>
                ))}
              </div>

              {visibleCount < filteredJobs.length && (
                <div className="text-center pt-2">
                  <button
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                  >
                    Load more ({filteredJobs.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};