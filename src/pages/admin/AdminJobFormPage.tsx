import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import type { Job } from '../../types/index.ts';
import {
  Upload,
  X,
  ChevronLeft,
  Loader2,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
  Building2,
  Globe,
} from 'lucide-react';

interface AdminJobFormPageProps {
  jobId?: string; // If present, edit mode; otherwise add mode
  navigate: (path: string) => void;
}

export const AdminJobFormPage: React.FC<AdminJobFormPageProps> = ({ jobId, navigate }) => {
  const { adminToken } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(Boolean(jobId));
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [categoryId, setCategoryId] = useState<'it' | 'non-it' | 'banking'>('it');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('Full-time');
  const [workMode, setWorkMode] = useState('Hybrid');
  const [salary, setSalary] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [skillsStr, setSkillsStr] = useState('');
  const [description, setDescription] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [requirements, setRequirements] = useState('');
  const [additionalInformation, setAdditionalInformation] = useState('');
  const [applicationUrl, setApplicationUrl] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState<'Published' | 'Draft' | 'Archived'>('Published');

  // Drag-and-drop image upload state
  const [posterImage, setPosterImage] = useState<string>('');
  const [imageDragging, setImageDragging] = useState(false);

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }

    if (jobId) {
      const fetchJob = async () => {
        try {
          const res = await fetch(`/api/admin/jobs/${jobId}`, {
            headers: { Authorization: `Bearer ${adminToken}` },
          });
          if (!res.ok) throw new Error('Failed to load job details');
          const data: Job = await res.json();
          setTitle(data.title);
          setCompanyName(data.company_name);
          setCategoryId(data.category_id as any);
          setLocation(data.location);
          setJobType(data.job_type);
          setWorkMode(data.work_mode);
          setSalary(data.salary);
          setExperience(data.experience);
          setEducation(data.education || '');
          // setSkillsStr(data.skills.join(', '));
          setSkillsStr(Array.isArray(data.skills) ? data.skills.join(', ') : (data.skills || ''));
          setDescription(data.description);
          setEligibility(data.eligibility || '');
          setRequirements(data.requirements || '');
          setAdditionalInformation(data.additional_information || '');
          setApplicationUrl(data.application_url);
          setDeadline(data.deadline);
          setStatus(data.status);
          if (data.poster_image) setPosterImage(data.poster_image);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setFetching(false);
        }
      };
      fetchJob();
    }
  }, [jobId, adminToken, navigate]);

  // Handle File Upload (JPG/PNG/WEBP max 10MB)
  const processImageFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid JPG, PNG, or WEBP image.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image file size must be less than 10MB.');
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      setPosterImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setImageDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setImageDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setImageDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken) return;

    setLoading(true);
    setError(null);

    const skillsArray = skillsStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title,
      company_name: companyName,
      category_id: categoryId,
      location,
      job_type: jobType,
      work_mode: workMode,
      salary,
      experience,
      education,
      skills: skillsArray,
      description,
      eligibility,
      requirements,
      additional_information: additionalInformation,
      application_url: applicationUrl,
      deadline,
      status,
      poster_image: posterImage,
    };

    try {
      const url = jobId ? `/api/admin/jobs/${jobId}` : '/api/admin/jobs';
      const method = jobId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || 'Failed to save job posting');
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/jobs');
      }, 800);
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="py-24 text-center text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600 mb-2" />
        <p className="text-xs">Loading job data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button
        onClick={() => navigate('/admin/jobs')}
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-4"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Jobs Table
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              {jobId ? 'Edit Job Posting' : 'Add New Job Posting'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Fill all fields. Only &quot;Published&quot; jobs will be visible to users with active category access.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Status:</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
            >
              <option value="Published">Published (Live)</option>
              <option value="Draft">Draft (Hidden)</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Job saved successfully! Redirecting to jobs list...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Drag & Drop Poster Upload (Section 8: JPG/PNG/WEBP max 10MB, preview, replace/remove) */}
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Job Poster / Banner Image (Max 10MB, JPG/PNG/WEBP)
            </label>

            {posterImage ? (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 group bg-slate-900 h-52 sm:h-64 flex items-center justify-center">
                <img
                  src={posterImage}
                  alt="Poster Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-2 bg-white text-slate-900 text-xs font-semibold rounded-xl hover:bg-slate-100"
                  >
                    Replace Image
                  </button>
                  <button
                    type="button"
                    onClick={() => setPosterImage('')}
                    className="px-3.5 py-2 bg-rose-600 text-white text-xs font-semibold rounded-xl hover:bg-rose-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${
                  imageDragging
                    ? 'border-indigo-600 bg-indigo-50/50'
                    : 'border-slate-300 hover:border-slate-400 bg-slate-50/50'
                }`}
              >
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">
                  Drag and drop job poster here, or <span className="text-indigo-600 underline">browse files</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Supports JPG, PNG, WEBP up to 10MB
                </p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Basic Job Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Backend Engineer"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Acme Technologies"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Category, Job Type, Work Mode, Location */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category *
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
              >
                <option value="it">IT Jobs</option>
                <option value="non-it">Non-IT Jobs</option>
                <option value="banking">Banking Jobs</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Job Type
              </label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
              >
                <option value="Full-time">Full-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Work Mode
              </label>
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
              >
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bengaluru, India"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Salary, Experience, Education, Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Salary / CTC *
              </label>
              <input
                type="text"
                required
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="e.g. ₹18 - 25 LPA"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Experience *
              </label>
              <input
                type="text"
                required
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="e.g. 3 - 6 Years"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Education
              </label>
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="e.g. B.Tech / MCA"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Deadline *
              </label>
              <input
                type="date"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Skills (Comma-separated) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Required Skills (Comma-separated)
            </label>
            <input
              type="text"
              value={skillsStr}
              onChange={(e) => setSkillsStr(e.target.value)}
              placeholder="e.g. Python, FastAPI, PostgreSQL, Docker, AWS"
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* External Application URL (Crucial: Section 1 & 8) */}
          <div>
            <label className="block text-xs font-bold text-indigo-700 mb-1 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" /> External Official Application URL *
            </label>
            <input
              type="url"
              required
              value={applicationUrl}
              onChange={(e) => setApplicationUrl(e.target.value)}
              placeholder="https://company.com/careers/apply/1234"
              className="w-full px-3.5 py-2.5 bg-indigo-50/50 border border-indigo-300 rounded-xl text-xs font-mono text-indigo-900 focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Users who unlock this category will click &quot;Apply Now&quot; to open this URL directly.
            </p>
          </div>

          {/* Long Text Fields: Description, Eligibility, Requirements, Additional Info */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Job Description *
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the company, the team, day-to-day responsibilities..."
              className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-xs leading-relaxed focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Eligibility Criteria
            </label>
            <textarea
              rows={3}
              value={eligibility}
              onChange={(e) => setEligibility(e.target.value)}
              placeholder="Academic qualifications, marks percentage, background check criteria..."
              className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-xs leading-relaxed focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Requirements & Qualifications
            </label>
            <textarea
              rows={3}
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Mandatory technologies, minimum years in specific stack, language skills..."
              className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-xs leading-relaxed focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Additional Information & Selection Process
            </label>
            <textarea
              rows={3}
              value={additionalInformation}
              onChange={(e) => setAdditionalInformation(e.target.value)}
              placeholder="Rounds of interview, joining notice period, shift timings, perks..."
              className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-xs leading-relaxed focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => navigate('/admin/jobs')}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-colors shadow-xs flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving Job...
                </>
              ) : (
                <span>{jobId ? 'Save Changes' : 'Publish Job Listing'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
