import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

// ---------- 1. The component (mounted once in App.tsx) ----------
export function AppToaster() {
  return (
    <Toaster
      position="top-center"
      gutter={10}
      containerStyle={{ top: 84, zIndex: 9999 }} // sits below the navbar
      toastOptions={{
        duration: 3500,
        style: {
          fontFamily: 'inherit',
          fontSize: '13px',
          fontWeight: 500,
          maxWidth: '420px',
          padding: '12px 16px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0', // slate-200
          background: '#ffffff',
          color: '#0f172a', // slate-900
          boxShadow: '0 8px 24px rgba(15, 23, 42, 0.10)',
        },
        success: {
          duration: 3000,
          iconTheme: { primary: '#10b981', secondary: '#ffffff' },
        },
        error: {
          duration: 6000,
          style: {
            border: '1px solid #fecdd3', // rose-200
            background: '#fff1f2', // rose-50
            color: '#be123c', // rose-700
          },
          iconTheme: { primary: '#e11d48', secondary: '#ffffff' },
        },
      }}
    />
  );
}

// ---------- 2. Helpers (import these anywhere) ----------
export const notify = {
  success: (msg: string, id?: string) => toast.success(msg, { id }),
  error: (msg: string, id?: string) => toast.error(msg, { id }),
  info: (msg: string, id?: string) => toast(msg, { id }),
  warn: (msg: string, id?: string) => toast(msg, { icon: '⚠️', id }),
  locked: (msg = 'Please buy a package to unlock this') =>
    toast(msg, { icon: '🔒', id: 'locked' }),
  loading: (msg: string) => toast.loading(msg),
  dismiss: (id?: string) => toast.dismiss(id),
  promise: toast.promise,
};

// Pull a readable message out of any error shape
export function getErrorMessage(err: any, fallback = 'Something went wrong') {
  return (
    err?.response?.data?.message ||
    err?.response?.data?.detail ||
    err?.response?.data?.error ||
    err?.message ||
    fallback
  );
}

// For fetch(): read the FastAPI error body from a failed Response
export async function readError(res: Response, fallback = 'Something went wrong') {
  try {
    const data = await res.json();
    if (typeof data?.detail === 'string') return data.detail;
    // FastAPI validation errors come as an array
    if (Array.isArray(data?.detail) && data.detail[0]?.msg) return data.detail[0].msg;
    return data?.message || data?.error || fallback;
  } catch {
    return fallback;
  }
}

// Use in pages when a fetch response is not ok.
// Skips 429 / 502 / 503 / 504 because apiBase.ts already showed a toast for those.
export async function notifyResponse(res: Response, fallback = 'Something went wrong') {
  if ([429, 502, 503, 504].includes(res.status)) return;
  notify.error(await readError(res, fallback));
}

// Use inside catch (err) blocks.
// Skips network failures because apiBase.ts already showed a toast for those.
export function notifyCatch(err: any, fallback = 'Something went wrong') {
  if (err?.__toasted) return;
  notify.error(getErrorMessage(err, fallback));
}