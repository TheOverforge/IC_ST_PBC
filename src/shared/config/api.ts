export const PUBLIC_API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Origin of the server (no trailing slash). Empty string in production — Nginx serves everything from the same domain.
export const SERVER_URL =
  import.meta.env.VITE_SERVER_URL ?? 'http://localhost:3001';

export const SITE_URL =
  import.meta.env.VITE_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '');
