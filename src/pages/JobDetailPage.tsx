import React, { useEffect, useState } from 'react';
import type { Job } from '../types/index.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { usePackages } from '../context/PackagesContext.tsx';
import {
  Building2,
  MapPin,
  Clock,
  Calendar,
  GraduationCap,
  ExternalLink,
  ChevronLeft,
  Lock,
  Share2,
  CheckCircle2,
  ShieldAlert,
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
  const [categorySlug, setCategorySlug] = useState<string>('it');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchJobDetail = async () => {
      setLoading(true);
      setIsLocked(false);

      if (!token) {
        setIsLocked(true);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/jobs/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 403) {
          const errData = await res.json().catch(() => ({}));
          setCategorySlug(errData.category || 'it');
          setIsLocked(true);
          setLoading(false);
          return;
        }

        if (!res.ok) {
          throw new Error('Failed to load job details');
        }

        const data = await res.json();
        setJob(data);
        setCategorySlug(data.category_id);
      } catch (err: any) {
        console.error('Job details error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetail();
  }, [jobId, token]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <h2 className="text-2xl font-bold text-slate-900">
              Job Details are Locked
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Viewing full job details, contact requirements, and the official external application link requires an active category pass.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <div className="text-2xl font-bold text-slate-900">
              {formatPrice(pkg.price)}
            </div>
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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back button */}
      <button
        onClick={() => navigate(`/jobs/${job.category_id}`)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors mb-6 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" /> Back to {job.category_id.toUpperCase()} Jobs
      </button>

      {/* Main Job Card Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Poster Image / Banner (Section 7) */}
        {job.poster_image && (
          <div className="w-full h-64 sm:h-80 bg-slate-900 overflow-hidden relative">
            <img
              src={job.poster_image}
              alt={job.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-200">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wider">
                  {job.category_id.toUpperCase()}
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

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={handleShare}
                className="px-3.5 py-3 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>

              {/* Primary External Application CTA (Section 1 & 7) */}
              <a
                id="btn-apply-external"
                href={job.application_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
              >
                <span>Apply Now (External Portal)</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block mb-1">Salary / Compensation</span>
              <strong className="text-slate-900 text-sm font-bold">{job.salary}</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Experience Required</span>
              <strong className="text-slate-900 text-sm font-bold">{job.experience}</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Work Mode</span>
              <strong className="text-slate-900 text-sm font-bold">{job.work_mode}</strong>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Education</span>
              <strong className="text-slate-900 text-sm font-bold">{job.education || 'Not specified'}</strong>
            </div>
          </div>

          {/* Skills Required */}
          {job.skills && job.skills.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                Key Skills & Competencies
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-3 py-1 rounded-lg border border-indigo-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Job Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Job Description
            </h3>
            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
              {job.description}
            </div>
          </div>

          {/* Eligibility Criteria */}
          {job.eligibility && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Eligibility Criteria
              </h3>
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                {job.eligibility}
              </div>
            </div>
          )}

          {/* Detailed Requirements */}
          {job.requirements && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Requirements & Qualifications
              </h3>
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                {job.requirements}
              </div>
            </div>
          )}

          {/* Additional Information */}
          {job.additional_information && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Additional Information & Selection Process
              </h3>
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                {job.additional_information}
              </div>
            </div>
          )}

          {/* Footer Call to Action Box */}
          <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">
                Ready to submit your application?
              </h4>
              <p className="text-xs text-slate-600">
                You will be redirected directly to {job.company_name}&apos;s verified career portal.
              </p>
            </div>
            <a
              href={job.application_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Open Application Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
