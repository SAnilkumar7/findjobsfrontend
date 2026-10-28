

// import React, {
//   useDeferredValue,
//   useEffect,
//   useMemo,
//   useState,
// } from 'react';
// import type { Job } from '../types/index.ts';
// import { useAuth } from '../context/AuthContext.tsx';
// import { usePackages } from '../context/PackagesContext.tsx';
// import {
//   JobCard,
//   CardBoundary,
//   sanitizeJob,
//   toTime,
// } from '../components/JobCard.tsx';
// import {
//   Lock,
//   Search,
//   SlidersHorizontal,
//   Briefcase,
//   Code,
//   Landmark,
//   Sparkles,
//   ArrowRight,
//   Loader2,
//   AlertCircle,
// } from 'lucide-react';

// interface JobsCategoryPageProps {
//   categorySlug: string; // 'it' | 'non-it' | 'banking' | 'all'
//   navigate: (path: string) => void;
//   onOpenCheckout: (slug: string) => void;
// }

// const PAGE_SIZE = 18;

// /* In-memory cache: coming back to a category shows jobs instantly,
//    while a fresh copy is fetched quietly in the background. */
// const jobsCache = new Map<string, Job[]>();

// /* MOBILE: on phones, un-truncate card text (company name, city, etc.)
//    so full names are visible and wrap onto the next line. */
// const MOBILE_CARD_FIX =
//   'max-sm:[&_.truncate]:whitespace-normal max-sm:[&_.truncate]:overflow-visible max-sm:[&_.truncate]:text-clip max-sm:[&_.truncate]:break-words';

// /* Placeholder card shown while jobs load (instead of a blank spinner screen) */
// const JobCardSkeleton: React.FC = () => (
//   <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 animate-pulse">
//     <div className="h-28 bg-slate-100 rounded-xl" />
//     <div className="h-4 bg-slate-200 rounded w-3/4" />
//     <div className="h-3 bg-slate-100 rounded w-1/2" />
//     <div className="flex gap-2 pt-1">
//       <div className="h-5 w-16 bg-slate-100 rounded-full" />
//       <div className="h-5 w-20 bg-slate-100 rounded-full" />
//     </div>
//   </div>
// );

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
//   const [reloadKey, setReloadKey] = useState(0);

//   const [searchQuery, setSearchQuery] = useState('');
//   const deferredQuery = useDeferredValue(searchQuery);
//   const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'deadline'>('latest');
//   const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

//   const pkg = getPackageBySlug(categorySlug) || {
//     id: `pkg_${categorySlug}`,
//     slug: categorySlug,
//     name: `${categorySlug.toUpperCase()} Jobs`,
//     price: categorySlug === 'non-it' ? 69 : 79,
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
//     const controller = new AbortController();

//     const fetchJobs = async () => {
//       setError(null);
//       setIsLocked(false);

//       if (!token) {
//         setLoading(false);
//         setIsLocked(true);
//         return;
//       }

//       // Show the cached list right away (if we have one), then refresh quietly
//       const cacheKey = `${token}|${categorySlug}`;
//       const cached = jobsCache.get(cacheKey);
//       if (cached) {
//         setJobs(cached);
//         setLoading(false);
//       } else {
//         setLoading(true);
//       }

//       try {
//         const res = await fetch(
//           `/api/jobs/category/${encodeURIComponent(categorySlug)}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//             signal: controller.signal,
//           }
//         );

//         if (res.status === 403) {
//           jobsCache.delete(cacheKey);
//           setIsLocked(true);
//           return;
//         }
//         if (res.status === 429) {
//           throw new Error('Too many requests. Please wait a moment and try again.');
//         }
//         if (!res.ok) {
//           throw new Error('Failed to retrieve job listings');
//         }

//         const data = await res.json();
//         const list: any[] = Array.isArray(data)
//           ? data
//           : Array.isArray(data?.jobs)
//             ? data.jobs
//             : [];

//         const mapped = list.filter((j) => j && j.id != null).map(sanitizeJob);
//         jobsCache.set(cacheKey, mapped);
//         setJobs(mapped);
//       } catch (err: any) {
//         if (err?.name === 'AbortError') return;
//         // Keep showing the cached list instead of an error screen if we have one
//         if (!cached) setError(err?.message || 'Error fetching jobs');
//       } finally {
//         if (!controller.signal.aborted) setLoading(false);
//       }
//     };

//     fetchJobs();
//     return () => controller.abort();
//   }, [categorySlug, token, access, reloadKey]);

//   useEffect(() => {
//     setVisibleCount(PAGE_SIZE);
//   }, [categorySlug, deferredQuery, sortBy]);

//   const filteredJobs = useMemo(() => {
//     let result = [...jobs];

//     const q = deferredQuery.trim().toLowerCase();
//     if (q) {
//       result = result.filter(
//         (j) =>
//           j.title.toLowerCase().includes(q) ||
//           j.company_name.toLowerCase().includes(q) ||
//           j.location.toLowerCase().includes(q) ||
//           j.skills.some((s) => s.toLowerCase().includes(q))
//       );
//     }

//     result.sort((a, b) => {
//       if (sortBy === 'latest') return toTime(b.created_at) - toTime(a.created_at);
//       if (sortBy === 'oldest') return toTime(a.created_at) - toTime(b.created_at);
//       return a.deadline.localeCompare(b.deadline);
//     });

//     return result;
//   }, [jobs, deferredQuery, sortBy]);

//   const visibleJobs = useMemo(
//     () => filteredJobs.slice(0, visibleCount),
//     [filteredJobs, visibleCount]
//   );

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 overflow-x-hidden">
//       {/* Category Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
//         <div className="flex items-center gap-3 min-w-0">
//           <div className="w-12 h-12 shrink-0 rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200 shadow-xs">
//             {getCategoryIcon()}
//           </div>
//           <div className="min-w-0">
//             {/* MOBILE: flex-wrap so the badge drops below the title on small screens */}
//             <div className="flex flex-wrap items-center gap-2">
//               <h1 className="text-xl sm:text-3xl font-bold text-slate-900 leading-tight">
//                 {getCategoryTitle()}
//               </h1>
//               {!isLocked && !loading && !error && (
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

//       {isLocked ? (
//         <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-8 text-center space-y-5 my-8">
//           <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
//             <Lock className="w-8 h-8" />
//           </div>

//           <div>
//             <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
//               Protected Access
//             </span>
//             <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
//               {getCategoryTitle()} are Locked
//             </h2>
//             <p className="text-sm text-slate-600 mt-2 leading-relaxed">
//               This category requires an active access pass. Pay once to unlock all current and future listings in this industry forever.
//             </p>
//           </div>

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
//                 <span>
//                   Unlock {pkg.name} ({formatPrice(pkg.price)})
//                 </span>
//               </button>
//             )}

//             <button
//               onClick={() => onOpenCheckout('all')}
//               className="w-full py-2.5 px-3 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
//             >
//               <Sparkles className="w-3.5 h-3.5 shrink-0" />
//               <span>Or Get All Access Bundle (IT + Non-IT + Banking) for ₹99</span>
//             </button>
//           </div>
//         </div>
//       ) : loading ? (
//         <div className="space-y-6" aria-busy="true">
//           {/* Placeholder controls bar */}
//           <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs animate-pulse">
//             <div className="h-9 w-full sm:w-80 bg-slate-100 rounded-xl" />
//           </div>
//           {/* Placeholder cards */}
//           {/* MOBILE: 1 column on phones, 2 from sm, 3 from lg */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
//             {[0, 1, 2, 3, 4, 5].map((i) => (
//               <JobCardSkeleton key={i} />
//             ))}
//           </div>
//         </div>
//       ) : error ? (
//         <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3 my-8">
//           <AlertCircle className="w-10 h-10 mx-auto text-red-400" />
//           <h3 className="font-bold text-slate-800">Couldn&apos;t load jobs</h3>
//           <p className="text-xs text-slate-500">{error}</p>
//           <button
//             onClick={() => setReloadKey((k) => k + 1)}
//             className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl"
//           >
//             Retry
//           </button>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {/* Controls Bar */}
//           <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
//             <div className="relative w-full sm:w-80">
//               {/* MOBILE: icon vertically centered */}
//               <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
//               <input
//                 type="text"
//                 value={searchQuery}
//                 maxLength={100}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search title, company, city, skill..."
//                 className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
//               />
//             </div>

//             <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
//               <span className="text-xs text-slate-500 flex items-center gap-1 shrink-0">
//                 <SlidersHorizontal className="w-3.5 h-3.5" /> Sort:
//               </span>
//               <select
//                 value={sortBy}
//                 onChange={(e) =>
//                   setSortBy(e.target.value as 'latest' | 'oldest' | 'deadline')
//                 }
//                 className="flex-1 sm:flex-none min-w-0 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
//               >
//                 <option value="latest">Latest Posted</option>
//                 <option value="oldest">Oldest First</option>
//                 <option value="deadline">Application Deadline</option>
//               </select>
//               <div className="text-xs font-semibold text-slate-400 px-1 whitespace-nowrap shrink-0">
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
//             <>
//               {/* MOBILE: 1 column on phones, 2 from sm, 3 from lg */}
//               <div
//                 className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 ${MOBILE_CARD_FIX}`}
//               >
//                 {visibleJobs.map((job) => (
//                   <div key={job.id} className="min-w-0">
//                     <CardBoundary>
//                       <JobCard
//                         job={job}
//                         onClick={() => navigate(`/jobs/view/${job.id}`)}
//                       />
//                     </CardBoundary>
//                   </div>
//                 ))}
//               </div>

//               {visibleCount < filteredJobs.length && (
//                 <div className="text-center pt-2">
//                   <button
//                     onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
//                     className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
//                   >
//                     Load more ({filteredJobs.length - visibleCount} remaining)
//                   </button>
//                 </div>
//               )}
//             </>
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

/* Fallback prices per category (used only if the package isn't found) */
const FALLBACK_PRICES: Record<string, number> = {
  it: 79,
  'non-it': 69,
  banking: 59,
  all: 99,
};

/* In-memory cache: coming back to a category shows jobs instantly,
   while a fresh copy is fetched quietly in the background. */
const jobsCache = new Map<string, Job[]>();

/* MOBILE: on phones, un-truncate card text (company name, city, etc.)
   so full names are visible and wrap onto the next line. */
const MOBILE_CARD_FIX =
  'max-sm:[&_.truncate]:whitespace-normal max-sm:[&_.truncate]:overflow-visible max-sm:[&_.truncate]:text-clip max-sm:[&_.truncate]:break-words';

/* Placeholder card shown while jobs load (instead of a blank spinner screen) */
const JobCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 animate-pulse">
    <div className="h-28 bg-slate-100 rounded-xl" />
    <div className="h-4 bg-slate-200 rounded w-3/4" />
    <div className="h-3 bg-slate-100 rounded w-1/2" />
    <div className="flex gap-2 pt-1">
      <div className="h-5 w-16 bg-slate-100 rounded-full" />
      <div className="h-5 w-20 bg-slate-100 rounded-full" />
    </div>
  </div>
);

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
    price: FALLBACK_PRICES[categorySlug] ?? 79,
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
      setError(null);
      setIsLocked(false);

      if (!token) {
        setLoading(false);
        setIsLocked(true);
        return;
      }

      // Show the cached list right away (if we have one), then refresh quietly
      const cacheKey = `${token}|${categorySlug}`;
      const cached = jobsCache.get(cacheKey);
      if (cached) {
        setJobs(cached);
        setLoading(false);
      } else {
        setLoading(true);
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
          jobsCache.delete(cacheKey);
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

        const mapped = list.filter((j) => j && j.id != null).map(sanitizeJob);
        jobsCache.set(cacheKey, mapped);
        setJobs(mapped);
      } catch (err: any) {
        if (err?.name === 'AbortError') return;
        // Keep showing the cached list instead of an error screen if we have one
        if (!cached) setError(err?.message || 'Error fetching jobs');
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 overflow-x-hidden">
      {/* Category Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 shrink-0 rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200 shadow-xs">
            {getCategoryIcon()}
          </div>
          <div className="min-w-0">
            {/* MOBILE: flex-wrap so the badge drops below the title on small screens */}
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-3xl font-bold text-slate-900 leading-tight">
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
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-lg p-6 sm:p-8 text-center space-y-5 my-8">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Protected Access
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
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
              className="w-full py-2.5 px-3 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Or Get All Access Bundle (IT + Non-IT + Banking) for ₹99</span>
            </button>
          </div>
        </div>
      ) : loading ? (
        <div className="space-y-6" aria-busy="true">
          {/* Placeholder controls bar */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs animate-pulse">
            <div className="h-9 w-full sm:w-80 bg-slate-100 rounded-xl" />
          </div>
          {/* Placeholder cards */}
          {/* MOBILE: 1 column on phones, 2 from sm, 3 from lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
            <div className="relative w-full sm:w-80">
              {/* MOBILE: icon vertically centered */}
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                maxLength={100}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title, company, city, skill..."
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-xs text-slate-500 flex items-center gap-1 shrink-0">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'latest' | 'oldest' | 'deadline')
                }
                className="flex-1 sm:flex-none min-w-0 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="latest">Latest Posted</option>
                <option value="oldest">Oldest First</option>
                <option value="deadline">Application Deadline</option>
              </select>
              <div className="text-xs font-semibold text-slate-400 px-1 whitespace-nowrap shrink-0">
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
              {/* MOBILE: 1 column on phones, 2 from sm, 3 from lg */}
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 ${MOBILE_CARD_FIX}`}
              >
                {visibleJobs.map((job) => (
                  <div key={job.id} className="min-w-0">
                    <CardBoundary>
                      <JobCard
                        job={job}
                        onClick={() => navigate(`/jobs/view/${job.id}`)}
                      />
                    </CardBoundary>
                  </div>
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