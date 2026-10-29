import React from 'react';

interface AboutPageProps {
  navigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Heading */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About Us
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          We help job seekers find genuine job openings in one place, with direct
          application links and no middlemen.
        </p>
      </div>

      {/* Mission / What we do / Why us */}
      <div className="grid sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
          <h3 className="font-bold text-slate-900">Our Mission</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Make job hunting simple, fast and trustworthy for everyone.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
          <h3 className="font-bold text-slate-900">What We Do</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            We list verified IT, Non-IT and Banking jobs, with full details and the
            official apply link or contact number.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2">
          <h3 className="font-bold text-slate-900">Why Choose Us</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            One-time payment, instant access, and regularly updated listings.
          </p>
        </div>
      </div>

      {/* Call to action */}
      <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-slate-900 text-sm">Ready to find your next job?</h4>
          <p className="text-xs text-slate-600">Browse jobs or check our plans.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/jobs/all')}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs transition-colors"
          >
            Browse Jobs
          </button>
          <button
            onClick={() => navigate('/pricing')}
            className="px-5 py-2.5 border border-slate-300 text-slate-700 hover:bg-white font-semibold rounded-xl text-xs transition-colors"
          >
            View Pricing
          </button>
        </div>
      </div>

      {/* Contact */}
      <p className="text-center text-sm text-slate-500">
        Questions? Reach us on the{' '}
        <button
          onClick={() => navigate('/queries')}
          className="text-indigo-600 font-semibold hover:underline"
        >
          Queries page
        </button>
        .
      </p>
    </div>
  );
};