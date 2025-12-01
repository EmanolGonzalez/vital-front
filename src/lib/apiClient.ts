const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5175';

let accessToken: string | null = null;

export function setAccessToken(token: string) {
  accessToken = token;
}

export function clearAccessToken() {
  accessToken = null;
}

async function request(path: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string> || {}
  };

  if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

  const res = await fetch(`${API_BASE}/api${path.startsWith('/') ? '' : '/'}${path}`, {
    ...options,
    headers
  });

  // If the server returns 401, emit a global event so the app can react (logout/redirect)
  if (res.status === 401) {
    try { window.dispatchEvent(new CustomEvent('auth:unauthorized')); } catch { /* ignore */ }
    const text401 = await res.text();
    const data401 = text401 ? JSON.parse(text401) : null;
    const message401 = data401?.error ?? data401?.message ?? res.statusText;
    throw new Error(message401);
  }

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    // normalize error
    const message = data?.error ?? data?.message ?? res.statusText;
    throw new Error(message);
  }

  return data;
}

export const api = {
  get: (path: string) => request(path, { method: 'GET' }),
  post: (path: string, body: any) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path: string, body: any) => request(path, { method: 'PUT', body: JSON.stringify(body) }),
  del: (path: string) => request(path, { method: 'DELETE' })
};

export default api;
