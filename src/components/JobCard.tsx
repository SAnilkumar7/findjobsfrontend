// import React from 'react';
// import type { Job } from '../types/index.ts';
// import {
//   Building2,
//   MapPin,
//   Calendar,
//   Clock,
//   ExternalLink,
//   ChevronRight,
//   Sparkles,
// } from 'lucide-react';

// interface JobCardProps {
//   job: Job; 
//   onClick: () => void;
// }

// export const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
//   const getCategoryBadge = (cat: string) => {
//     switch (cat) {
//       case 'it':
//         return 'bg-blue-50 text-blue-700 border-blue-200';
//       case 'non-it':
//         return 'bg-amber-50 text-amber-700 border-amber-200';
//       case 'banking':
//         return 'bg-emerald-50 text-emerald-700 border-emerald-200';
//       default:
//         return 'bg-slate-50 text-slate-700 border-slate-200';
//     }
//   };

//   const formattedDate = new Date(job.created_at).toLocaleDateString('en-IN', {
//     month: 'short',
//     day: 'numeric',
//   });

//   return (
//     <div
//       id={`job-card-${job.id}`}
//       onClick={onClick}
//       className="group bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden flex flex-col p-5"
//     >
//       <div className="flex items-start gap-4">
//         {/* Thumbnail Image */}
//         <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
//           {job.poster_image ? (
//             <img
//               src={job.poster_image}
//               alt={job.title}
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
//                 job.category_id
//               )}`}
//             >
//               {job.category_id.toUpperCase()}
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

//       {/* Details Row: Salary, Experience, Skills */}
//       <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
//         <div className="font-semibold text-slate-900">
//           {job.salary}
//         </div>
//         <div className="text-slate-500 flex items-center gap-1">
//           <Clock className="w-3.5 h-3.5 text-slate-400" />
//           <span>Exp: {job.experience}</span>
//         </div>
//       </div>

//       {/* Skills snippet & Footer */}
//       {job.skills && job.skills.length > 0 && (
//         <div className="mt-3 flex flex-wrap gap-1.5">
//           {job.skills.slice(0, 3).map((skill, idx) => (
//             <span
//               key={idx}
//               className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
//             >
//               {skill}
//             </span>
//           ))}
//           {job.skills.length > 3 && (
//             <span className="text-[10px] text-slate-400 self-center">
//               +{job.skills.length - 3} more
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
      className="group bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden flex flex-col p-5"
    >
      <div className="flex items-start gap-4">
        {/* Thumbnail */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
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
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
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

          <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
            {job.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-0.5">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-700 truncate">{job.company_name}</span>
            <span className="text-slate-300">•</span>
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">{job.location}</span>
          </div>
        </div>
      </div>

      {/* Salary & Experience */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
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
              className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
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

      <div className="mt-4 pt-2 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-slate-300" /> Deadline: {job.deadline}
        </span>
        <span className="text-indigo-600 font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
          View Details <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};