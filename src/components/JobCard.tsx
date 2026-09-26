import React from 'react';
import type { Job } from '../types/index.ts';
import {
  Building2,
  MapPin,
  Calendar,
  Clock,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface JobCardProps {
  job: Job;
  onClick: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
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

  const formattedDate = new Date(job.created_at).toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      id={`job-card-${job.id}`}
      onClick={onClick}
      className="group bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden flex flex-col p-5"
    >
      <div className="flex items-start gap-4">
        {/* Thumbnail Image */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
          {job.poster_image ? (
            <img
              src={job.poster_image}
              alt={job.title}
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
                job.category_id
              )}`}
            >
              {job.category_id.toUpperCase()}
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

      {/* Details Row: Salary, Experience, Skills */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="font-semibold text-slate-900">
          {job.salary}
        </div>
        <div className="text-slate-500 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Exp: {job.experience}</span>
        </div>
      </div>

      {/* Skills snippet & Footer */}
      {job.skills && job.skills.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {job.skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 3 && (
            <span className="text-[10px] text-slate-400 self-center">
              +{job.skills.length - 3} more
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
