import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import type { Job } from '../../types/index.ts';
import {
  PlusCircle,
  Search,
  Building2,
  Calendar,
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  Archive,
  FileText,
  ChevronLeft,
  Loader2,
  AlertCircle,
  Briefcase,
} from 'lucide-react';

interface AdminJobsPageProps {
  navigate: (path: string) => void;
}

export const AdminJobsPage: React.FC<AdminJobsPageProps> = ({ navigate }) => {
  const { adminToken } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchJobs = async () => {
    if (!adminToken) return;
    try {
      setLoading(true);
      const res = await fetch('/api/admin/jobs', {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setJobs(data);
      }
    } catch (err) {
      console.error('Failed to load admin jobs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [adminToken]);

  const handleToggleStatus = async (job: Job, newStatus: 'Published' | 'Draft' | 'Archived') => {
    if (!adminToken) return;
    setActionLoading(job.id);
    try {
      const res = await fetch(`/api/admin/jobs/${job.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          title: job.title,
          company_name: job.company_name,
          category_id: job.category_id,
          location: job.location,
          job_type: job.job_type,
          work_mode: job.work_mode,
          salary: job.salary,
          experience: job.experience,
          education: job.education,
          skills: job.skills,
          description: job.description,
          eligibility: job.eligibility,
          requirements: job.requirements,
          additional_information: job.additional_information,
          application_url: job.application_url,
          deadline: job.deadline,
          status: newStatus,
          poster_image: job.poster_image,
        }),
      });

      if (res.ok) {
        await fetchJobs();
      }
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (jobId: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this job?')) return;
    if (!adminToken) return;
    setActionLoading(jobId);
    try {
      const res = await fetch(`/api/admin/jobs/${jobId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        setJobs(jobs.filter((j) => j.id !== jobId));
      }
    } catch (err) {
      console.error('Failed to delete job', err);
    } finally {
      setActionLoading(null);
    }
  };

  const filteredJobs = jobs.filter((j) => {
    const matchesCat = filterCategory === 'all' || j.category_id === filterCategory;
    const matchesSearch =
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company_name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
        <div>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-2"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Job Listings Management
          </h1>
          <p className="text-xs text-slate-500">
            Publish, edit, unpublish, or archive job postings across all categories
          </p>
        </div>

        <button
          id="btn-admin-add-job"
          onClick={() => navigate('/admin/jobs/add')}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
        >
          <PlusCircle className="w-4 h-4" /> Add New Job
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by title or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700"
          >
            <option value="all">All Categories</option>
            <option value="it">IT Jobs</option>
            <option value="non-it">Non-IT Jobs</option>
            <option value="banking">Banking Jobs</option>
          </select>
          <span className="text-xs text-slate-400 whitespace-nowrap">
            {filteredJobs.length} Jobs
          </span>
        </div>
      </div>

      {/* Jobs Table (Section 8: Image, title, company, category, status, date, actions) */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        {loading ? (
          <div className="py-16 text-center text-slate-400">
            <Loader2 className="w-7 h-7 animate-spin mx-auto text-indigo-600 mb-2" />
            <p className="text-xs">Loading jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="py-16 text-center text-slate-400 space-y-2">
            <Briefcase className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-sm font-semibold text-slate-600">No jobs found</p>
            <p className="text-xs">Click &quot;Add New Job&quot; to create your first listing.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Poster / Image</th>
                  <th className="py-3 px-4">Job Title & Company</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Deadline</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 flex items-center justify-center">
                        {job.poster_image ? (
                          <img
                            src={job.poster_image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Building2 className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <div className="font-bold text-slate-900 truncate">{job.title}</div>
                      <div className="text-[11px] text-slate-500">{job.company_name} • {job.location}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {job.category_id}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          job.status === 'Published'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : job.status === 'Draft'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {job.deadline}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Publish / Unpublish Toggle */}
                        {job.status === 'Published' ? (
                          <button
                            onClick={() => handleToggleStatus(job, 'Draft')}
                            title="Unpublish (switch to Draft)"
                            className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleToggleStatus(job, 'Published')}
                            title="Publish job (make visible to users)"
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}

                        {/* Edit Button */}
                        <button
                          onClick={() => navigate(`/admin/jobs/${job.id}/edit`)}
                          title="Edit Job"
                          className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(job.id)}
                          title="Delete Job"
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
