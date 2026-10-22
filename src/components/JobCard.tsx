

// import React, { useMemo, useState } from 'react';
// import type { Job } from '../types/index.ts';
// import {
//   Building2,
//   MapPin,
//   Calendar,
//   Clock,
//   ChevronRight,
// } from 'lucide-react';

// /* ---------- Shared helpers (also imported by the two pages) ---------- */

// const MAX_SKILLS = 50;
// const MAX_SKILL_LENGTH = 60;

// /** Accepts an array, a comma string, or JSON text and always returns string[] */
// export const normalizeSkills = (skills: unknown): string[] => {
//   const clean = (arr: unknown[]) =>
//     arr
//       .map((s) => String(s ?? '').trim().slice(0, MAX_SKILL_LENGTH))
//       .filter(Boolean)
//       .slice(0, MAX_SKILLS);

//   if (Array.isArray(skills)) return clean(skills);

//   if (typeof skills === 'string') {
//     const t = skills.trim();
//     if (!t) return [];
//     if (t.startsWith('[')) {
//       try {
//         const parsed = JSON.parse(t);
//         if (Array.isArray(parsed)) return clean(parsed);
//       } catch {
//         /* fall through to comma split */
//       }
//     }
//     return clean(t.split(','));
//   }

//   return [];
// };

// /** Only allows http/https links. Blocks javascript:, data:, etc. */
// export const safeUrl = (url: unknown): string | null => {
//   if (typeof url !== 'string') return null;
//   try {
//     const u = new URL(url.trim());
//     return u.protocol === 'https:' || u.protocol === 'http:' ? u.toString() : null;
//   } catch {
//     return null;
//   }
// };

// const str = (v: unknown): string =>
//   typeof v === 'string' ? v : v == null ? '' : String(v);

// /** Turns any server object into a job that is safe to render */
// export const sanitizeJob = (raw: any): Job => {
//   return {
//     ...raw,
//     id: raw?.id,
//     title: str(raw?.title),
//     company_name: str(raw?.company_name),
//     location: str(raw?.location),
//     salary: str(raw?.salary),
//     experience: str(raw?.experience),
//     job_type: str(raw?.job_type),
//     work_mode: str(raw?.work_mode),
//     deadline: str(raw?.deadline),
//     category_id: str(raw?.category_id),
//     created_at: str(raw?.created_at),
//     description: str(raw?.description),
//     eligibility: str(raw?.eligibility),
//     requirements: str(raw?.requirements),
//     additional_information: str(raw?.additional_information),
//     education: str(raw?.education),
//     application_url: str(raw?.application_url),
//     poster_image: str(raw?.poster_image),
//     skills: normalizeSkills(raw?.skills),
//   } as Job;
// };

// export const toTime = (d: string): number => {
//   const t = new Date(d).getTime();
//   return Number.isNaN(t) ? 0 : t;
// };

// /* ---------- Error boundary: one bad card never blanks the page ---------- */

// export class CardBoundary extends React.Component<
//   { children: React.ReactNode },
//   { failed: boolean }
// > {
//   state = { failed: false };

//   static getDerivedStateFromError() {
//     return { failed: true };
//   }

//   componentDidCatch(error: unknown) {
//     console.error('Job card failed to render:', error);
//   }

//   render() {
//     if (this.state.failed) {
//       return (
//         <div className="p-5 text-xs text-slate-400 border border-slate-200 rounded-2xl bg-white">
//           This job couldn&apos;t be displayed.
//         </div>
//       );
//     }
//     return this.props.children;
//   }
// }

// /* ---------- JobCard ---------- */

// interface JobCardProps {
//   job: Job;
//   onClick: () => void;
// }

// const getCategoryBadge = (cat: string) => {
//   switch (cat) {
//     case 'it':
//       return 'bg-blue-50 text-blue-700 border-blue-200';
//     case 'non-it':
//       return 'bg-amber-50 text-amber-700 border-amber-200';
//     case 'banking':
//       return 'bg-emerald-50 text-emerald-700 border-emerald-200';
//     default:
//       return 'bg-slate-50 text-slate-700 border-slate-200';
//   }
// };

// export const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
//   const [imgFailed, setImgFailed] = useState(false);

//   const skills = useMemo(() => normalizeSkills(job?.skills), [job?.skills]);
//   const image = useMemo(() => safeUrl(job?.poster_image), [job?.poster_image]);
//   const category = String(job?.category_id ?? '');

//   return (
//     <div
//       id={`job-card-${job.id}`}
//       role="button"
//       tabIndex={0}
//       onClick={onClick}
//       onKeyDown={(e) => {
//         if (e.key === 'Enter' || e.key === ' ') {
//           e.preventDefault();
//           onClick();
//         }
//       }}
//       className="group bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden flex flex-col p-5"
//     >
//       <div className="flex items-start gap-4">
//         {/* Thumbnail */}
//         <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
//           {image && !imgFailed ? (
//             <img
//               src={image}
//               alt={job.title || 'Job'}
//               loading="lazy"
//               decoding="async"
//               referrerPolicy="no-referrer"
//               onError={() => setImgFailed(true)}
//               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
//               <Building2 className="w-7 h-7" />
//             </div>
//           )}
//         </div>

//         {/* Content */}
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-2 mb-1 flex-wrap">
//             <span
//               className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getCategoryBadge(
//                 category
//               )}`}
//             >
//               {category.toUpperCase()}
//             </span>
//             <span className="text-[11px] text-slate-500 font-medium">
//               {job.job_type} • {job.work_mode}
//             </span>
//           </div>

//           <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
//             {job.title}
//           </h3>

//           <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-0.5">
//             <Building2 className="w-3.5 h-3.5 text-slate-400" />
//             <span className="font-medium text-slate-700 truncate">{job.company_name}</span>
//             <span className="text-slate-300">•</span>
//             <MapPin className="w-3.5 h-3.5 text-slate-400" />
//             <span className="truncate">{job.location}</span>
//           </div>
//         </div>
//       </div>

//       {/* Salary & Experience */}
//       <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
//         <div className="font-semibold text-slate-900">{job.salary}</div>
//         <div className="text-slate-500 flex items-center gap-1">
//           <Clock className="w-3.5 h-3.5 text-slate-400" />
//           <span>Exp: {job.experience}</span>
//         </div>
//       </div>

//       {/* Skills */}
//       {skills.length > 0 && (
//         <div className="mt-3 flex flex-wrap gap-1.5">
//           {skills.slice(0, 3).map((skill, idx) => (
//             <span
//               key={`${skill}-${idx}`}
//               className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
//             >
//               {skill}
//             </span>
//           ))}
//           {skills.length > 3 && (
//             <span className="text-[10px] text-slate-400 self-center">
//               +{skills.length - 3} more
//             </span>
//           )}
//         </div>
//       )}

//       <div className="mt-4 pt-2 flex items-center justify-between text-xs text-slate-400">
//         <span className="flex items-center gap-1">
//           <Calendar className="w-3.5 h-3.5 text-slate-300" /> Deadline: {job.deadline}
//         </span>
//         <span className="text-indigo-600 font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
//           View Details <ChevronRight className="w-3.5 h-3.5" />
//         </span>
//       </div>
//     </div>
//   );
// };











import React, { useMemo, useState } from 'react';
import type { Job } from '../types/index.ts';
import {
  Building2,
  MapPin,
  Calendar,
  Clock,
  ChevronRight,
  IndianRupee, // MOBILE: new icon for the salary box
} from 'lucide-react';

/* ---------- Shared helpers (also imported by the two pages) ---------- */

const MAX_SKILLS = 50;
const MAX_SKILL_LENGTH = 60;

/** Accepts an array, a comma string, or JSON text and always returns string[] */
export const normalizeSkills = (skills: unknown): string[] => {
  const clean = (arr: unknown[]) =>
    arr
      .map((s) => String(s ?? '').trim().slice(0, MAX_SKILL_LENGTH))
      .filter(Boolean)
      .slice(0, MAX_SKILLS);

  if (Array.isArray(skills)) return clean(skills);

  if (typeof skills === 'string') {
    const t = skills.trim();
    if (!t) return [];
    if (t.startsWith('[')) {
      try {
        const parsed = JSON.parse(t);
        if (Array.isArray(parsed)) return clean(parsed);
      } catch {
        /* fall through to comma split */
      }
    }
    return clean(t.split(','));
  }

  return [];
};

/** Only allows http/https links. Blocks javascript:, data:, etc. */
export const safeUrl = (url: unknown): string | null => {
  if (typeof url !== 'string') return null;
  try {
    const u = new URL(url.trim());
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.toString() : null;
  } catch {
    return null;
  }
};

const str = (v: unknown): string =>
  typeof v === 'string' ? v : v == null ? '' : String(v);

/** Turns any server object into a job that is safe to render */
export const sanitizeJob = (raw: any): Job => {
  return {
    ...raw,
    id: raw?.id,
    title: str(raw?.title),
    company_name: str(raw?.company_name),
    location: str(raw?.location),
    salary: str(raw?.salary),
    experience: str(raw?.experience),
    job_type: str(raw?.job_type),
    work_mode: str(raw?.work_mode),
    deadline: str(raw?.deadline),
    category_id: str(raw?.category_id),
    created_at: str(raw?.created_at),
    description: str(raw?.description),
    eligibility: str(raw?.eligibility),
    requirements: str(raw?.requirements),
    additional_information: str(raw?.additional_information),
    education: str(raw?.education),
    application_url: str(raw?.application_url),
    poster_image: str(raw?.poster_image),
    skills: normalizeSkills(raw?.skills),
  } as Job;
};

export const toTime = (d: string): number => {
  const t = new Date(d).getTime();
  return Number.isNaN(t) ? 0 : t;
};

/* ---------- Error boundary: one bad card never blanks the page ---------- */

export class CardBoundary extends React.Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error('Job card failed to render:', error);
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="p-5 text-xs text-slate-400 border border-slate-200 rounded-2xl bg-white">
          This job couldn&apos;t be displayed.
        </div>
      );
    }
    return this.props.children;
  }
}

/* ---------- JobCard ---------- */

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

const getCategoryBadge = (cat: string) => {
  switch (cat) {
    case 'it':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'non-it':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'banking':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200';
  }
};

export const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const [imgFailed, setImgFailed] = useState(false);

  const skills = useMemo(() => normalizeSkills(job?.skills), [job?.skills]);
  const image = useMemo(() => safeUrl(job?.poster_image), [job?.poster_image]);
  const category = String(job?.category_id ?? '');

  return (
    <div
      id={`job-card-${job.id}`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="group bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden flex flex-col p-4 sm:p-5"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Thumbnail */}
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
          {image && !imgFailed ? (
            <img
              src={image}
              alt={job.title || 'Job'}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
              <Building2 className="w-7 h-7" />
            </div>
          )}
        </div>

        {/* Content */}
        {/* MOBILE: flex-col + order so company shows first on phones, title first on desktop */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="order-1 flex items-center gap-2 mb-1.5 sm:mb-1 flex-wrap">
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getCategoryBadge(
                category
              )}`}
            >
              {category.toUpperCase()}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              {job.job_type} • {job.work_mode}
            </span>
          </div>

          {/* MOBILE: title wraps fully (truncate only from sm up) */}
          <h3 className="order-3 sm:order-2 mt-1.5 sm:mt-0 text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors break-words sm:truncate leading-snug">
            {job.title}
          </h3>

          {/* MOBILE: company is bold indigo and shown above the title; location wraps below it */}
          <div className="order-2 sm:order-3 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-slate-600 sm:mt-0.5">
            <span className="flex items-center gap-1.5 min-w-0">
              <Building2 className="w-3.5 h-3.5 text-indigo-500 sm:text-slate-400 shrink-0" />
              <span className="text-sm sm:text-xs font-extrabold sm:font-medium text-indigo-700 sm:text-slate-700 break-words sm:truncate">
                {job.company_name}
              </span>
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="flex items-center gap-1 min-w-0 w-full sm:w-auto">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="break-words sm:truncate">{job.location}</span>
            </span>
          </div>
        </div>
      </div>

      {/* MOBILE: labelled Salary and Experience boxes (phones only) */}
      <div className="sm:hidden mt-4 grid grid-cols-2 gap-2">
        <div className="bg-slate-50 rounded-xl p-2.5 min-w-0">
          <p className="text-[10px] uppercase tracking-wide text-slate-400 font-semibold flex items-center gap-1">
            <IndianRupee className="w-3 h-3" /> Salary
          </p>
          <p className="text-xs font-semibold text-slate-800 mt-0.5 break-words">
            {job.salary || 'Not disclosed'}
          </p>
        </div>
        <div className="bg-slate-50 rounded-xl p-2.5 min-w-0">
          <p className="text-[10px] uppercase tracking-wide text-slate-400 font-semibold flex items-center gap-1">
            <Clock className="w-3 h-3" /> Experience
          </p>
          <p className="text-xs font-semibold text-slate-800 mt-0.5 break-words">
            {job.experience || 'Not specified'}
          </p>
        </div>
      </div>

      {/* Salary & Experience (tablet and desktop: original layout) */}
      <div className="hidden sm:flex mt-4 pt-3 border-t border-slate-100 flex-wrap items-center justify-between gap-2 text-xs">
        <div className="font-semibold text-slate-900">{job.salary}</div>
        <div className="text-slate-500 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Exp: {job.experience}</span>
        </div>
      </div>

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {skills.slice(0, 3).map((skill, idx) => (
            <span
              key={`${skill}-${idx}`}
              className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium break-words max-w-full"
            >
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="text-[10px] text-slate-400 self-center">
              +{skills.length - 3} more
            </span>
          )}
        </div>
      )}

      <div className="mt-4 pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-slate-300" /> Deadline: {job.deadline}
        </span>
        {/* MOBILE: View Details looks like a real button on phones */}
        <span className="text-indigo-600 font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform max-sm:bg-indigo-600 max-sm:text-white max-sm:px-3 max-sm:py-2 max-sm:rounded-lg max-sm:group-hover:translate-x-0">
          View Details <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};