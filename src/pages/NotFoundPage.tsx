import React from 'react';

interface NotFoundPageProps {
  navigate: (path: string) => void;
}

export function NotFoundPage({ navigate }: NotFoundPageProps) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <h1 className="text-7xl font-extrabold text-indigo-600 mb-2">404</h1>
      <p className="text-2xl font-semibold text-slate-900 mb-3">Page not found</p>
      <p className="text-slate-500 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
        >
          Go to Home
        </button>
        <button
          onClick={() => navigate('/jobs/all')}
          className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition"
        >
          Browse Jobs
        </button>
      </div>
    </div>
  );
}