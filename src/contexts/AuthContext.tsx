import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { setAccessToken, clearAccessToken } from '../lib/apiClient';
import SessionExpiredModal from '@/components/ui/SessionExpiredModal';

export type UserRole = 'patient' | 'doctor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  specialization?: string; // For doctors
  department?: string; // For admins
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  setTokenFromExternal?: (token: string, expiresAt?: string) => Promise<boolean>;

}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null); // keep token in memory only
  const refreshTimerRef = React.useRef<number | null>(null);

  // Normalize expiresAt input (ISO string, epoch seconds, epoch ms, or Date)
  const parseExpiresAtToMs = (val: string | number | Date): number | null => {
    try {
      if (!val && val !== 0) return null;
      if (val instanceof Date) return val.getTime();
      if (typeof val === 'number') {
        // if seconds (<= 1e12 roughly), convert to ms
        return val > 1e12 ? val : val * 1000;
      }
      const asNumber = Number(val);
      if (!Number.isNaN(asNumber)) {
        return asNumber > 1e12 ? asNumber : asNumber * 1000;
      }
      const parsed = Date.parse(val);
      return Number.isNaN(parsed) ? null : parsed;
    } catch {
      return null;
    }
  };

  // Normalize and map role values returned by backend into our frontend UserRole
  const normalizeRole = (val: any): UserRole => {
    try {
      if (val === null || val === undefined) return 'patient';
      if (typeof val === 'number') {
        // common enum mapping: 0=patient,1=doctor,2=admin (best-effort)
        if (val === 2) return 'admin';
        if (val === 1) return 'doctor';
        return 'patient';
      }
      const s = String(val).toLowerCase().trim();
      if (s === 'admin' || s === 'administrator' || s === 'administrador') return 'admin';
      if (s === 'doctor' || s === 'medico' || s === 'médico') return 'doctor';
      if (s === 'patient' || s === 'paciente') return 'patient';
      // numeric strings
      if (s === '2') return 'admin';
      if (s === '1') return 'doctor';
      if (s === '0') return 'patient';
      return 'patient';
    } catch {
      return 'patient';
    }
  };

  const buildUserFromApi = (apiData: any): User => {
    // Some backends return the user directly, others wrap under `user`.
    const payload = apiData?.user ?? apiData ?? {};
    const roleRaw = payload.role ?? payload.userType ?? payload.type ?? payload.userTypeId ?? payload.user_type ?? payload.user?.role;
    const role = normalizeRole(roleRaw);

    return {
      id: String(payload.id ?? payload.user?.id ?? ''),
      name: payload.name ?? payload.user?.name ?? '',
      email: payload.email ?? payload.user?.email ?? '',
      role,
      avatar: payload.avatar,
      phone: payload.phone,
      specialization: payload.specialization,
      department: payload.department
    };
  };

  // Keep authentication token in memory only. Do not persist sensitive tokens to localStorage.
  useEffect(() => {
    // Try to rehydrate session from sessionStorage (not localStorage) to survive reloads
    const doRehydrate = async () => {
      setIsLoading(true);
      try {
        const raw = sessionStorage.getItem('auth');
        if (raw) {
          const parsed = JSON.parse(raw);
          const storedToken = parsed?.token;
          const storedExpires = parsed?.expiresAt ? new Date(parsed.expiresAt) : null;
          if (storedToken && storedExpires) {
            // Set token into memory so apiClient attaches it for /auth/refresh
            setToken(storedToken);
            setAccessToken(storedToken);

            const now = new Date();
            if (storedExpires.getTime() <= now.getTime()) {
              // Token expired — call /auth/refresh without body (server uses sid claim)
              try {
                const r = await api.post('/auth/refresh', {});
                const newToken = r?.token ?? r?.Token ?? r?.accessToken ?? r?.tokenValue;
                const newExpires = r?.expiresAt ?? r?.ExpiresAt ?? r?.expiresAt;
                if (newToken) {
                  setToken(newToken);
                  setAccessToken(newToken);
                  try { sessionStorage.setItem('auth', JSON.stringify({ token: newToken, expiresAt: newExpires })); } catch (e) { /* ignore */ }
                  if (newExpires) scheduleRefresh(new Date(newExpires));
                  const userData = await api.get('/auth/me');
                  setUser(buildUserFromApi(userData));
                } else {
                  try { window.dispatchEvent(new CustomEvent('session:expired')); } catch (e) { /* ignore */ }
                  sessionStorage.removeItem('auth');
                }
              } catch {
                try { window.dispatchEvent(new CustomEvent('session:expired')); } catch (e) { /* ignore */ }
                sessionStorage.removeItem('auth');
              }
            } else {
              // token still valid — hydrate user and schedule refresh
              try {
                const userData = await api.get('/auth/me');
                setUser(buildUserFromApi(userData));
                if (storedExpires) scheduleRefresh(storedExpires);
              } catch {
                sessionStorage.removeItem('auth');
                setToken(null);
                clearAccessToken();
                try { window.dispatchEvent(new CustomEvent('session:expired')); } catch (e) { /* ignore */ }
              }
            }
          }
        }
      } catch {
        // ignore
      } finally {
        setIsLoading(false);
      }
    };

    doRehydrate();
  }, []);

  // Listen for global unauthorized events (emitted by apiClient on 401)
  useEffect(() => {
    const handleUnauthorized = () => {
      // Clear session and show session-expired UI handled by provider
      setUser(null);
      setToken(null);
      clearAccessToken();
      // set flag in sessionStorage to indicate expired, so rehydration doesn't bring back invalid token
      try { sessionStorage.removeItem('auth'); } catch (e) { /* ignore */ }
      // show modal by dispatching a custom event the provider listens (or set local state using event)
      try { window.dispatchEvent(new CustomEvent('session:expired')); } catch (e) { /* ignore */ }
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized as EventListener);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized as EventListener);
  }, []);

  // Session expired UI state
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const onExpired = () => setSessionExpired(true);
    window.addEventListener('session:expired', onExpired as EventListener);
    return () => window.removeEventListener('session:expired', onExpired as EventListener);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      const returnedToken = res?.accessToken ?? res?.Token ?? res?.token;
      const returnedExpires = res?.expiresAt ?? res?.ExpiresAt ?? res?.expiresAt;
      if (!returnedToken) throw new Error('Login response missing token');
      setToken(returnedToken);
      setAccessToken(returnedToken);
      // persist session for page reloads (sessionStorage)
      if (returnedExpires) {
        try { sessionStorage.setItem('auth', JSON.stringify({ token: returnedToken, expiresAt: returnedExpires })); } catch (e) { /* ignore */ }
        scheduleRefresh(new Date(returnedExpires));
      }

      const userData = await api.get('/auth/me');
      setUser(buildUserFromApi(userData));
      setIsLoading(false);
      return true;
    } catch (err) {
      setUser(null);
      setToken(null);
      clearAccessToken();
      setIsLoading(false);
      return false;
    }
  };

  // Allow setting a token obtained from other endpoints (e.g. center-specific login)
  const setTokenFromExternal = async (externalToken: string, externalExpires?: string): Promise<boolean> => {
    try {
      setToken(externalToken);
      setAccessToken(externalToken);
      if (externalExpires) {
        try { sessionStorage.setItem('auth', JSON.stringify({ token: externalToken, expiresAt: externalExpires })); } catch (e) { /* ignore */ }
        scheduleRefresh(externalExpires);
      }
      const userData = await api.get('/auth/me');
      setUser(buildUserFromApi(userData));
      return true;
    } catch {
      setToken(null);
      clearAccessToken();
      setUser(null);
      return false;
    }
  };

  const scheduleRefresh = (expiresAtRaw: string | number | Date) => {
    try {
      // clear existing
      if (refreshTimerRef.current) {
        window.clearTimeout(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }

      const expiresAtMs = parseExpiresAtToMs(expiresAtRaw);
      if (!expiresAtMs) return;

      const msUntil = expiresAtMs - Date.now();
      // refresh a bit earlier (60 seconds before expiry), but at least 5s from now
      const when = Math.max(5000, msUntil - 60000);

      if (when <= 0) {
        // already expired or very near — refresh immediately
        (async () => {
          try {
            const r = await api.post('/auth/refresh', {});
            const newToken = r?.token ?? r?.Token ?? r?.accessToken ?? r?.tokenValue;
            const newExpires = r?.expiresAt ?? r?.ExpiresAt ?? r?.expiresAt;
            if (newToken) {
              setToken(newToken);
              setAccessToken(newToken);
              if (newExpires) {
                try { sessionStorage.setItem('auth', JSON.stringify({ token: newToken, expiresAt: newExpires })); } catch (e) { /* ignore */ }
                scheduleRefresh(newExpires);
              }
              try {
                if (!user) {
                  const userData = await api.get('/auth/me');
                  setUser(buildUserFromApi(userData));
                }
              } catch {
                // ignore user hydration errors
              }
            }
          } catch {
            sessionStorage.removeItem('auth');
            setUser(null);
            setToken(null);
            clearAccessToken();
            try { window.dispatchEvent(new CustomEvent('session:expired')); } catch (e) { /* ignore */ }
          }
        })();
        return;
      }

      refreshTimerRef.current = window.setTimeout(async () => {
        try {
          const r = await api.post('/auth/refresh', {});
          const newToken = r?.token ?? r?.Token ?? r?.accessToken ?? r?.tokenValue;
          const newExpires = r?.expiresAt ?? r?.ExpiresAt ?? r?.expiresAt;
          if (newToken) {
            setToken(newToken);
            setAccessToken(newToken);
            if (newExpires) {
              try { sessionStorage.setItem('auth', JSON.stringify({ token: newToken, expiresAt: newExpires })); } catch (e) { /* ignore */ }
              scheduleRefresh(newExpires);
            }
            try {
              if (!user) {
                const userData = await api.get('/auth/me');
                setUser(buildUserFromApi(userData));
              }
            } catch {
              // ignore hydration errors
            }
          }
        } catch {
          // if refresh fails, clear session and show expired modal (no immediate hard redirect)
          sessionStorage.removeItem('auth');
          setUser(null);
          setToken(null);
          clearAccessToken();
          try { window.dispatchEvent(new CustomEvent('session:expired')); } catch (e) { /* ignore */ }
        }
      }, when) as unknown as number;
    } catch {
      // ignore scheduling errors
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    clearAccessToken();
    sessionStorage.removeItem('auth');
    if (refreshTimerRef.current) {
      window.clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, setTokenFromExternal }}>
      {children}
      <SessionExpiredModal open={sessionExpired} onClose={() => { setSessionExpired(false); try { window.location.href = '/login'; } catch (e) { /* ignore */ } }} />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};