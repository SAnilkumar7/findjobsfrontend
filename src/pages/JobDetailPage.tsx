

// import React, { useEffect, useState } from 'react';
// import type { Job } from '../types/index.ts';
// import { useAuth } from '../context/AuthContext.tsx';
// import { usePackages } from '../context/PackagesContext.tsx';
// import { sanitizeJob, safeUrl } from '../components/JobCard.tsx';
// import {
//   Building2,
//   MapPin,
//   Calendar,
//   ExternalLink,
//   ChevronLeft,
//   Lock,
//   Share2,
//   Loader2,
//   AlertCircle,
// } from 'lucide-react';

// interface JobDetailPageProps {
//   jobId: string;
//   navigate: (path: string) => void;
//   onOpenCheckout: (slug: string) => void;
// }

// export const JobDetailPage: React.FC<JobDetailPageProps> = ({
//   jobId,
//   navigate,
//   onOpenCheckout,
// }) => {
//   const { token } = useAuth();
//   const { formatPrice, getPackageBySlug } = usePackages();

//   const [job, setJob] = useState<Job | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isLocked, setIsLocked] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [categorySlug, setCategorySlug] = useState<string>('it');
//   const [copied, setCopied] = useState(false);
//   const [imgFailed, setImgFailed] = useState(false);

//   useEffect(() => {
//     const controller = new AbortController();

//     const fetchJobDetail = async () => {
//       setLoading(true);
//       setIsLocked(false);
//       setError(null);
//       setImgFailed(false);

//       if (!token) {
//         setIsLocked(true);
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await fetch(`/api/jobs/${encodeURIComponent(jobId)}`, {
//           headers: { Authorization: `Bearer ${token}` },
//           signal: controller.signal,
//         });

//         if (res.status === 403) {
//           const errData = await res.json().catch(() => ({}));
//           setCategorySlug(errData.category || 'it');
//           setIsLocked(true);
//           return;
//         }
//         if (res.status === 404) {
//           setJob(null);
//           return;
//         }
//         if (res.status === 429) {
//           throw new Error('Too many requests. Please wait a moment and try again.');
//         }
//         if (!res.ok) {
//           throw new Error('Failed to load job details');
//         }

//         const data = sanitizeJob(await res.json());
//         setJob(data);
//         setCategorySlug(data.category_id || 'it');
//       } catch (err: any) {
//         if (err?.name === 'AbortError') return;
//         console.error('Job details error:', err);
//         setError(err?.message || 'Failed to load job details');
//       } finally {
//         if (!controller.signal.aborted) setLoading(false);
//       }
//     };

//     fetchJobDetail();
//     return () => controller.abort();
//   }, [jobId, token]);

//   const handleShare = async () => {
//     try {
//       await navigator.clipboard?.writeText(window.location.href);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch {
//       /* clipboard blocked, ignore */
//     }
//   };

//   const pkg = getPackageBySlug(categorySlug) || { price: 49, name: 'Job Access' };

//   if (loading) {
//     return (
//       <div className="py-24 text-center text-slate-400 space-y-3">
//         <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600" />
//         <p className="text-sm">Loading job details from server...</p>
//       </div>
//     );
//   }

//   if (isLocked) {
//     return (
//       <div className="max-w-xl mx-auto px-4 py-16 text-center">
//         <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-lg space-y-5">
//           <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
//             <Lock className="w-8 h-8" />
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold text-slate-900">Job Details are Locked</h2>
//             <p className="text-sm text-slate-500 mt-2">
//               Viewing full job details, contact requirements, and the official external application link requires an active category pass.
//             </p>
//           </div>
//           <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
//             <div className="text-2xl font-bold text-slate-900">{formatPrice(pkg.price)}</div>
//             <span className="text-xs text-slate-500">One-time payment</span>
//           </div>
//           <button
//             onClick={() => onOpenCheckout(categorySlug)}
//             className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-xs flex items-center justify-center gap-2"
//           >
//             <Lock className="w-4 h-4" />
//             <span>Unlock Access Now</span>
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-xl mx-auto px-4 py-16 text-center text-slate-500 space-y-3">
//         <AlertCircle className="w-10 h-10 mx-auto text-red-400" />
//         <h2 className="text-xl font-bold text-slate-800">Couldn&apos;t load this job</h2>
//         <p className="text-xs">{error}</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   if (!job) {
//     return (
//       <div className="max-w-xl mx-auto px-4 py-16 text-center text-slate-500 space-y-3">
//         <AlertCircle className="w-10 h-10 mx-auto text-slate-400" />
//         <h2 className="text-xl font-bold text-slate-800">Job Not Found</h2>
//         <p className="text-xs">The job listing you are looking for may have been archived or removed.</p>
//         <button
//           onClick={() => navigate('/dashboard')}
//           className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl"
//         >
//           Back to Dashboard
//         </button>
//       </div>
//     );
//   }

//   const category = job.category_id || 'it';
//   const applyUrl = safeUrl(job.application_url);
//   const poster = safeUrl(job.poster_image);

//   return (
//     <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//       <button
//         onClick={() => navigate(`/jobs/${category}`)}
//         className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors mb-6 cursor-pointer"
//       >
//         <ChevronLeft className="w-4 h-4" /> Back to {category.toUpperCase()} Jobs
//       </button>

//       <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
//         {poster && !imgFailed && (
//           <div className="w-full h-64 sm:h-80 bg-slate-900 overflow-hidden relative">
//             <img
//               src={poster}
//               alt={job.title}
//               referrerPolicy="no-referrer"
//               onError={() => setImgFailed(true)}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
//           </div>
//         )}

//         <div className="p-6 sm:p-10 space-y-8">
//           {/* Header Row */}
//           <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-200">
//             <div className="space-y-2 max-w-2xl">
//               <div className="flex flex-wrap items-center gap-2">
//                 <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wider">
//                   {category.toUpperCase()}
//                 </span>
//                 <span className="text-xs text-slate-500 font-medium">
//                   {job.job_type} • {job.work_mode}
//                 </span>
//               </div>

//               <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
//                 {job.title}
//               </h1>

//               <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 pt-1">
//                 <div className="flex items-center gap-1.5 font-medium text-slate-800">
//                   <Building2 className="w-4 h-4 text-indigo-600" />
//                   <span>{job.company_name}</span>
//                 </div>
//                 <div className="flex items-center gap-1.5">
//                   <MapPin className="w-4 h-4 text-slate-400" />
//                   <span>{job.location}</span>
//                 </div>
//                 <div className="flex items-center gap-1.5 text-slate-500 text-xs">
//                   <Calendar className="w-3.5 h-3.5 text-slate-400" />
//                   <span>Deadline: {job.deadline}</span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
//               <button
//                 onClick={handleShare}
//                 className="px-3.5 py-3 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
//               >
//                 <Share2 className="w-4 h-4" />
//                 <span>{copied ? 'Link Copied!' : 'Share'}</span>
//               </button>

//               {applyUrl ? (
//                 <a
//                   id="btn-apply-external"
//                   href={applyUrl}
//                   target="_blank"
//                   rel="noopener noreferrer nofollow"
//                   className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
//                 >
//                   <span>Apply Now (External Portal)</span>
//                   <ExternalLink className="w-4 h-4" />
//                 </a>
//               ) : (
//                 <span className="px-6 py-3.5 bg-slate-200 text-slate-500 font-bold rounded-xl text-sm text-center">
//                   Application link unavailable
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Quick Metrics */}
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
//             <div>
//               <span className="text-slate-400 block mb-1">Salary / Compensation</span>
//               <strong className="text-slate-900 text-sm font-bold">{job.salary || 'Not disclosed'}</strong>
//             </div>
//             <div>
//               <span className="text-slate-400 block mb-1">Experience Required</span>
//               <strong className="text-slate-900 text-sm font-bold">{job.experience || 'Not specified'}</strong>
//             </div>
//             <div>
//               <span className="text-slate-400 block mb-1">Work Mode</span>
//               <strong className="text-slate-900 text-sm font-bold">{job.work_mode || 'Not specified'}</strong>
//             </div>
//             <div>
//               <span className="text-slate-400 block mb-1">Education</span>
//               <strong className="text-slate-900 text-sm font-bold">{job.education || 'Not specified'}</strong>
//             </div>
//           </div>

//           {/* Skills */}
//           {job.skills.length > 0 && (
//             <div>
//               <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
//                 Key Skills & Competencies
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {job.skills.map((skill, i) => (
//                   <span
//                     key={`${skill}-${i}`}
//                     className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-3 py-1 rounded-lg border border-indigo-100"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {job.description && (
//             <div className="space-y-2">
//               <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
//                 Job Description
//               </h3>
//               <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/50 p-5 rounded-2xl border border-slate-100 break-words">
//                 {job.description}
//               </div>
//             </div>
//           )}

//           {job.eligibility && (
//             <div className="space-y-2">
//               <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
//                 Eligibility Criteria
//               </h3>
//               <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/50 p-5 rounded-2xl border border-slate-100 break-words">
//                 {job.eligibility}
//               </div>
//             </div>
//           )}

//           {job.requirements && (
//             <div className="space-y-2">
//               <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
//                 Requirements & Qualifications
//               </h3>
//               <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/50 p-5 rounded-2xl border border-slate-100 break-words">
//                 {job.requirements}
//               </div>
//             </div>
//           )}

//           {job.additional_information && (
//             <div className="space-y-2">
//               <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
//                 Additional Information & Selection Process
//               </h3>
//               <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/50 p-5 rounded-2xl border border-slate-100 break-words">
//                 {job.additional_information}
//               </div>
//             </div>
//           )}

//           {applyUrl && (
//             <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
//               <div className="space-y-1">
//                 <h4 className="font-bold text-slate-900 text-sm">
//                   Ready to submit your application?
//                 </h4>
//                 <p className="text-xs text-slate-600">
//                   You will be redirected directly to {job.company_name}&apos;s career portal.
//                 </p>
//               </div>
//               <a
//                 href={applyUrl}
//                 target="_blank"
//                 rel="noopener noreferrer nofollow"
//                 className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
//               >
//                 <span>Open Application Portal</span>
//                 <ExternalLink className="w-3.5 h-3.5" />
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };












import React, { useEffect, useState } from 'react';
import type { Job } from '../types/index.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { usePackages } from '../context/PackagesContext.tsx';
import { sanitizeJob, safeUrl } from '../components/JobCard.tsx';
import {
  Building2,
  MapPin,
  Calendar,
  ExternalLink,
  ChevronLeft,
  Lock,
  Share2,
  Loader2,
  AlertCircle,
} from 'lucide-react';

interface JobDetailPageProps {
  jobId: string;
  navigate: (path: string) => void;
  onOpenCheckout: (slug: string) => void;
}

export const JobDetailPage: React.FC<JobDetailPageProps> = ({
  jobId,
  navigate,
  onOpenCheckout,
}) => {
  const { token } = useAuth();
  const { formatPrice, getPackageBySlug } = usePackages();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categorySlug, setCategorySlug] = useState<string>('it');
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false); // NEW
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchJobDetail = async () => {
      setLoading(true);
      setIsLocked(false);
      setError(null);
      setImgFailed(false);

      if (!token) {
        setIsLocked(true);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/jobs/${encodeURIComponent(jobId)}`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });

        if (res.status === 403) {
          const errData = await res.json().catch(() => ({}));
          setCategorySlug(errData.category || 'it');
          setIsLocked(true);
          return;
        }
        if (res.status === 404) {
          setJob(null);
          return;
        }
        if (res.status === 429) {
          throw new Error('Too many requests. Please wait a moment and try again.');
        }
        if (!res.ok) {
          throw new Error('Failed to load job details');
        }

        const data = sanitizeJob(await res.json());
        setJob(data);
        setCategorySlug(data.category_id || 'it');
      } catch (err: any) {
        if (err?.name === 'AbortError') return;
        console.error('Job details error:', err);
        setError(err?.message || 'Failed to load job details');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchJobDetail();
    return () => controller.abort();
  }, [jobId, token]);

  /* ---------- Share logic (NEW) ---------- */

  const copyLink = async () => {
    try {
      await navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked, ignore */
    }
  };

  // Tap on Share: copy the link AND always open our own share popup
  const handleShare = () => {
    void copyLink();
    setShowShareMenu(true);
  };

  const canNativeShare =
    typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  // "More apps" -> phone's own share sheet (includes Instagram, etc.)
  const nativeShare = async () => {
    const title = job ? `${job.title} at ${job.company_name}` : 'Job opening';
    try {
      await navigator.share({ title, text: title, url: window.location.href });
    } catch {
      /* user cancelled or not supported */
    }
    setShowShareMenu(false);
  };

  const getShareLinks = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(
      job ? `${job.title} at ${job.company_name}` : 'Job opening'
    );
    return [
      { name: 'WhatsApp', href: `https://wa.me/?text=${text}%20${url}` },
      { name: 'Telegram', href: `https://t.me/share/url?url=${url}&text=${text}` },
      { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
      { name: 'X (Twitter)', href: `https://twitter.com/intent/tweet?url=${url}&text=${text}` },
      { name: 'Email', href: `mailto:?subject=${text}&body=${url}` },
    ];
  };

  const pkg = getPackageBySlug(categorySlug) || { price: 49, name: 'Job Access' };

  if (loading) {
    return (
      <div className="py-24 text-center text-slate-400 space-y-3">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600" />
        <p className="text-sm">Loading job details from server...</p>
      </div>
    );
  }

  if (isLocked) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-lg space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Job Details are Locked</h2>
            <p className="text-sm text-slate-500 mt-2">
              Viewing full job details, contact requirements, and the official external application link requires an active category pass.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <div className="text-2xl font-bold text-slate-900">{formatPrice(pkg.price)}</div>
            <span className="text-xs text-slate-500">One-time payment</span>
          </div>
          <button
            onClick={() => onOpenCheckout(categorySlug)}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-xs flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>Unlock Access Now</span>
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center text-slate-500 space-y-3">
        <AlertCircle className="w-10 h-10 mx-auto text-red-400" />
        <h2 className="text-xl font-bold text-slate-800">Couldn&apos;t load this job</h2>
        <p className="text-xs">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center text-slate-500 space-y-3">
        <AlertCircle className="w-10 h-10 mx-auto text-slate-400" />
        <h2 className="text-xl font-bold text-slate-800">Job Not Found</h2>
        <p className="text-xs">The job listing you are looking for may have been archived or removed.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const category = job.category_id || 'it';
  const applyUrl = safeUrl(job.application_url);
  const poster = safeUrl(job.poster_image);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button
        onClick={() => navigate(`/jobs/${category}`)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors mb-6 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" /> Back to {category.toUpperCase()} Jobs
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {poster && !imgFailed && (
          <div className="w-full h-64 sm:h-80 bg-slate-900 overflow-hidden relative">
            <img
              src={poster}
              alt={job.title}
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
          </div>
        )}

        <div className="p-6 sm:p-10 space-y-8">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-200">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wider">
                  {category.toUpperCase()}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {job.job_type} • {job.work_mode}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 pt-1">
                <div className="flex items-center gap-1.5 font-medium text-slate-800">
                  <Building2 className="w-4 h-4 text-indigo-600" />
                  <span>{job.company_name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Deadline: {job.deadline}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              {/* Share button + fallback menu (UPDATED) */}
              <div className="relative">
                <button
                  onClick={handleShare}
                  className="w-full px-3.5 py-3 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copied ? 'Link Copied!' : 'Share'}</span>
                </button>

                {showShareMenu && (
                  <div
                    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-4"
                    onClick={() => setShowShareMenu(false)}
                  >
                    <div
                      className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900">Share this job</h4>
                        <button
                          onClick={() => setShowShareMenu(false)}
                          className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                        >
                          Close
                        </button>
                      </div>

                      <div className="p-2">
                        {getShareLinks().map((l) => (
                          <a
                            key={l.name}
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setShowShareMenu(false)}
                            className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            {l.name}
                          </a>
                        ))}

                        {/* Instagram has no web share URL: link is already copied, so open Instagram to paste */}
                        <a
                          href="https://www.instagram.com/direct/inbox/"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            void copyLink();
                            setShowShareMenu(false);
                          }}
                          className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          Instagram (link copied, paste in chat)
                        </a>

                        {canNativeShare && (
                          <button
                            onClick={nativeShare}
                            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            More apps...
                          </button>
                        )}

                        <button
                          onClick={() => {
                            void copyLink();
                            setShowShareMenu(false);
                          }}
                          className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 border-t border-slate-100 mt-1"
                        >
                          Copy link
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {applyUrl ? (
                <a
                  id="btn-apply-external"
                  href={applyUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  <span>Apply Now (External Portal)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="px-6 py-3.5 bg-slate-200 text-slate-500 font-bold rounded-xl text-sm text-center">
                  Application link unavailable
                </span>
              )}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block mb-1">Salary / Compensation</span>
              <strong className="text-slate-900 text-sm font-bold">{job.salary || 'Not disclosed'}</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Experience Required</span>
              <strong className="text-slate-900 text-sm font-bold">{job.experience || 'Not specified'}</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Work Mode</span>
              <strong className="text-slate-900 text-sm font-bold">{job.work_mode || 'Not specified'}</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Education</span>
              <strong className="text-slate-900 text-sm font-bold">{job.education || 'Not specified'}</strong>
            </div>
          </div>

          {/* Skills */}
          {job.skills.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                Key Skills & Competencies
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, i) => (
                  <span
                    key={`${skill}-${i}`}
                    className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-3 py-1 rounded-lg border border-indigo-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {job.description && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Job Description
              </h3>
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/50 p-5 rounded-2xl border border-slate-100 break-words">
                {job.description}
              </div>
            </div>
          )}

          {job.eligibility && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Eligibility Criteria
              </h3>
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/50 p-5 rounded-2xl border border-slate-100 break-words">
                {job.eligibility}
              </div>
            </div>
          )}

          {job.requirements && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Requirements & Qualifications
              </h3>
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/50 p-5 rounded-2xl border border-slate-100 break-words">
                {job.requirements}
              </div>
            </div>
          )}

          {job.additional_information && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Additional Information & Selection Process
              </h3>
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/50 p-5 rounded-2xl border border-slate-100 break-words">
                {job.additional_information}
              </div>
            </div>
          )}

          {applyUrl && (
            <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">
                  Ready to submit your application?
                </h4>
                <p className="text-xs text-slate-600">
                  You will be redirected directly to {job.company_name}&apos;s career portal.
                </p>
              </div>
              <a
                href={applyUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <span>Open Application Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};