

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
  Mail,
  Copy,
  MoreHorizontal,
  X as CloseIcon,
} from 'lucide-react';

interface JobDetailPageProps {
  jobId: string;
  navigate: (path: string) => void;
  onOpenCheckout: (slug: string) => void;
}

/* ---------- Brand icons for the share popup ---------- */

const BRAND_PATHS: Record<string, string> = {
  whatsapp:
    'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z',
  telegram:
    'M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
  facebook:
    'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  x: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
  instagram:
    'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
};

const BrandIcon: React.FC<{ id: string }> = ({ id }) => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" aria-hidden="true">
    <path d={BRAND_PATHS[id]} />
  </svg>
);

const SHARE_BG: Record<string, string> = {
  whatsapp: 'bg-[#25D366]',
  telegram: 'bg-[#229ED9]',
  facebook: 'bg-[#1877F2]',
  x: 'bg-black',
  instagram: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600',
  email: 'bg-slate-600',
  copy: 'bg-slate-500',
  more: 'bg-indigo-600',
};

const ShareTile: React.FC<{ label: string; bg: string; children: React.ReactNode }> = ({
  label,
  bg,
  children,
}) => (
  <div className="flex flex-col items-center gap-1.5">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bg}`}>
      {children}
    </div>
    <span className="text-[11px] font-semibold text-slate-700 text-center leading-tight">
      {label}
    </span>
  </div>
);

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
      { id: 'whatsapp', name: 'WhatsApp', href: `https://wa.me/?text=${text}%20${url}` },
      { id: 'telegram', name: 'Telegram', href: `https://t.me/share/url?url=${url}&text=${text}` },
      { id: 'facebook', name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
      { id: 'x', name: 'X', href: `https://twitter.com/intent/tweet?url=${url}&text=${text}` },
      { id: 'email', name: 'Email', href: `mailto:?subject=${text}&body=${url}` },
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
                      <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900">Share this job</h4>
                        <button
                          onClick={() => setShowShareMenu(false)}
                          aria-label="Close"
                          className="p-1 rounded-full text-slate-500 hover:bg-slate-100"
                        >
                          <CloseIcon className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="p-5 grid grid-cols-4 gap-y-5 gap-x-2">
                        {getShareLinks().map((l) => (
                          <a
                            key={l.id}
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setShowShareMenu(false)}
                          >
                            <ShareTile label={l.name} bg={SHARE_BG[l.id]}>
                              {l.id === 'email' ? (
                                <Mail className="w-6 h-6 text-white" />
                              ) : (
                                <BrandIcon id={l.id} />
                              )}
                            </ShareTile>
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
                        >
                          <ShareTile label="Instagram" bg={SHARE_BG.instagram}>
                            <BrandIcon id="instagram" />
                          </ShareTile>
                        </a>

                        <button
                          onClick={() => {
                            void copyLink();
                            setShowShareMenu(false);
                          }}
                        >
                          <ShareTile label="Copy link" bg={SHARE_BG.copy}>
                            <Copy className="w-5 h-5 text-white" />
                          </ShareTile>
                        </button>

                        {canNativeShare && (
                          <button onClick={nativeShare}>
                            <ShareTile label="More" bg={SHARE_BG.more}>
                              <MoreHorizontal className="w-6 h-6 text-white" />
                            </ShareTile>
                          </button>
                        )}
                      </div>

                      <p className="px-5 pb-4 text-[11px] text-slate-400 text-center">
                        Link is already copied. For Instagram, paste it in a chat.
                      </p>
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