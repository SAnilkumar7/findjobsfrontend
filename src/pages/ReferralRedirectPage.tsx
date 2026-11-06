import React, { useEffect, useRef, useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { saveReferral, getVisitorId, setReturnTo } from '../referral.ts';

interface ReferralRedirectPageProps {
  code: string;
  navigate: (path: string) => void;
}

// Opened from a creator link: /r/AbC1234
// 1) remembers the code  2) records the click  3) sends the visitor to the job page
export const ReferralRedirectPage: React.FC<ReferralRedirectPageProps> = ({ code, navigate }) => {
  const started = useRef(false); // stops the double-run in React StrictMode
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const clean = (code || '').trim();
    if (!/^[A-Za-z0-9]{7}$/.test(clean)) {
      setFailed(true);
      return;
    }

    // Saved first so attribution survives even if the click call is slow (cold start)
    saveReferral(clean);

    (async () => {
      try {
        const res = await fetch(`/api/referrals/${clean}/click`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ visitor_id: getVisitorId() }),
        });
        if (!res.ok) throw new Error('bad link');
        const data = await res.json();

        const target = `/jobs/view/${encodeURIComponent(String(data.job_id))}`;
        setReturnTo(target); // lets login/register bring the visitor back to this job

        // Replace /r/CODE in history so the Back button does not loop into this page again
        window.history.replaceState({}, '', '/');
        navigate(target);
      } catch {
        setFailed(true);
      }
    })();
  }, [code, navigate]);

  if (failed) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center bg-white border border-slate-200 rounded-2xl p-8">
          <AlertCircle className="w-8 h-8 text-rose-500 mx-auto mb-3" />
          <h1 className="text-lg font-bold text-slate-900">This link is no longer available</h1>
          <p className="text-xs text-slate-500 mt-1">
            The job may have expired or the link is incorrect.
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center text-slate-500 text-sm gap-2">
      <Loader2 className="w-4 h-4 animate-spin" />
      Opening job...
    </div>
  );
};