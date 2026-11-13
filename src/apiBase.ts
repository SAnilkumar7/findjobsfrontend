// const API_URL = ((import.meta.env.VITE_BACKEND_URL as string) || '').replace(/\/$/, '');

// // In production, send relative "/api/..." calls to the Render backend.
// // Locally (no VITE_BACKEND_URL), calls stay relative and the Vite proxy handles them.
// if (API_URL) {
//   const originalFetch = window.fetch.bind(window);

//   window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
//     if (typeof input === 'string' && input.startsWith('/api')) {
//       input = API_URL + input;
//     }
//     return originalFetch(input, init);
//   };
// }

// export {};









import { notify } from './components/Notifications.tsx';

const API_URL = ((import.meta.env.VITE_BACKEND_URL as string) || '').replace(/\/$/, '');

// In production, send relative "/api/..." calls to the Render backend.
// Locally (no VITE_BACKEND_URL), calls stay relative and the Vite proxy handles them.
// Also shows global toasts for server-wide failures (offline, rate limit, server waking up).
// Guard so hot-reload in dev never wraps fetch twice.
const w = window as any;
if (!w.__apiFetchPatched) {
  w.__apiFetchPatched = true;

  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const isApiCall = typeof input === 'string' && input.startsWith('/api');

    if (API_URL && isApiCall) {
      input = API_URL + (input as string);
    }

    try {
      const res = await originalFetch(input, init);

      if (isApiCall) {
        if (res.status === 429) {
          notify.warn('Too many requests. Please slow down and try again.', 'rate-limit');
        } else if ([502, 503, 504].includes(res.status)) {
          notify.error('Server is starting up. Please try again in a few seconds.', 'server-down');
        }
      }

      return res;
    } catch (err: any) {
      // Ignore cancelled requests; toast only real network failures
      if (isApiCall && err?.name !== 'AbortError') {
        notify.error('Cannot reach the server. Check your connection and try again.', 'network');
        try { err.__toasted = true; } catch { /* ignore */ }
      }
      throw err;
    }
  };
}

export {};