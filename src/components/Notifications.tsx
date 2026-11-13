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