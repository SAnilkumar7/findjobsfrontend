const API_URL = ((import.meta.env.VITE_BACKEND_URL as string) || '').replace(/\/$/, '');

// In production, send relative "/api/..." calls to the Render backend.
// Locally (no VITE_BACKEND_URL), calls stay relative and the Vite proxy handles them.
if (API_URL) {
  const originalFetch = window.fetch.bind(window);

  window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
    if (typeof input === 'string' && input.startsWith('/api')) {
      input = API_URL + input;
    }
    return originalFetch(input, init);
  };
}

export {};