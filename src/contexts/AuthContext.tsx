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
  setTokenFromExternal?: (token: string, refreshToken?: string, expiresAt?: string) => Promise<boolean>;

}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null); // keep token in memory only
  const refreshTimerRef = React.useRef<number | null>(null);

  // Keep authentication token in memory only. Do not persist sensitive tokens to localStorage.
  useEffect(() => {
    // Try to rehydrate session from sessionStorage (not localStorage) to survive reloads
    try {
      const raw = sessionStorage.getItem('auth');
      if (raw) {
        const parsed = JSON.parse(raw);
        const storedToken = parsed?.token;
        const storedRefresh = parsed?.refreshToken;
        const storedExpires = parsed?.expiresAt ? new Date(parsed.expiresAt) : null;
        if (storedToken && storedRefresh && storedExpires) {
          setToken(storedToken);
          setAccessToken(storedToken);
          // hydrate user
          api.get('/auth/me').then((userData) => {
            setUser({
              id: userData.id || userData.user?.id || '',
              name: userData.name || userData.user?.name || '',
              email: userData.email || userData.user?.email || '',
              role: userData.role || userData.user?.role || 'patient',
              avatar: userData.avatar,
              phone: userData.phone,
              specialization: userData.specialization,
              department: userData.department
            });
          }).catch(() => {
            // if /me fails, clear stored session
            sessionStorage.removeItem('auth');
            setToken(null);
            clearAccessToken();
          });

          // schedule refresh
          if (storedExpires) scheduleRefresh(storedRefresh, storedExpires);
        }
      }
    } catch {
      // ignore
    }

    setIsLoading(false);
  }, []);

  // Listen for global unauthorized events (emitted by apiClient on 401)
  useEffect(() => {
    const handleUnauthorized = () => {
      // Clear session and show session-expired UI handled by provider
      setUser(null);
      setToken(null);
      clearAccessToken();
      // set flag in sessionStorage to indicate expired, so rehydration doesn't bring back invalid token
      try { sessionStorage.removeItem('auth'); } catch {}
      // show modal by dispatching a custom event the provider listens (or set local state using event)
      try { window.dispatchEvent(new CustomEvent('session:expired')); } catch {}
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
      const returnedRefresh = res?.refreshToken ?? res?.RefreshToken ?? res?.refreshToken;
      const returnedExpires = res?.expiresAt ?? res?.ExpiresAt ?? res?.expiresAt;
      if (!returnedToken) throw new Error('Login response missing token');
      setToken(returnedToken);
      setAccessToken(returnedToken);
      // persist session for page reloads (sessionStorage)
        if (returnedRefresh && returnedExpires) {
        try { sessionStorage.setItem('auth', JSON.stringify({ token: returnedToken, refreshToken: returnedRefresh, expiresAt: returnedExpires })); } catch (e) { /* ignore */ }
        scheduleRefresh(returnedRefresh, new Date(returnedExpires));
      }

      // Obtener usuario actual
      const userData = await api.get('/auth/me');
      setUser({
        id: userData.id || userData.user?.id || '',
        name: userData.name || userData.user?.name || '',
        email: userData.email || userData.user?.email || '',
        role: userData.role || userData.user?.role || 'patient',
        avatar: userData.avatar,
        phone: userData.phone,
        specialization: userData.specialization,
        department: userData.department
      });
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
  const setTokenFromExternal = async (externalToken: string, externalRefresh?: string, externalExpires?: string): Promise<boolean> => {
    try {
      setToken(externalToken);
      setAccessToken(externalToken);
      if (externalRefresh && externalExpires) {
        try { sessionStorage.setItem('auth', JSON.stringify({ token: externalToken, refreshToken: externalRefresh, expiresAt: externalExpires })); } catch (e) { /* ignore */ }
        scheduleRefresh(externalRefresh, new Date(externalExpires));
      }
      const userData = await api.get('/auth/me');
      setUser({
        id: userData.id || userData.user?.id || '',
        name: userData.name || userData.user?.name || '',
        email: userData.email || userData.user?.email || '',
        role: userData.role || userData.user?.role || 'patient',
        avatar: userData.avatar,
        phone: userData.phone,
        specialization: userData.specialization,
        department: userData.department
      });
      return true;
    } catch {
      setToken(null);
      clearAccessToken();
      setUser(null);
      return false;
    }
  };

  const scheduleRefresh = (refreshToken: string, expiresAt: Date) => {
    try {
      // clear existing
      if (refreshTimerRef.current) {
        window.clearTimeout(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }
      const msUntil = expiresAt.getTime() - Date.now();
      // refresh a bit earlier (60 seconds before expiry) or at half-life if long
      const when = Math.max(5000, msUntil - 60000);
      refreshTimerRef.current = window.setTimeout(async () => {
        try {
          const r = await api.post('/auth/refresh', { refreshToken });
          const newToken = r?.token ?? r?.Token ?? r?.accessToken ?? r?.tokenValue;
          const newRefresh = r?.refreshToken ?? r?.RefreshToken ?? r?.refreshToken;
          const newExpires = r?.expiresAt ?? r?.ExpiresAt ?? r?.expiresAt;
          if (newToken) {
            setToken(newToken);
            setAccessToken(newToken);
            if (newRefresh && newExpires) {
              try { sessionStorage.setItem('auth', JSON.stringify({ token: newToken, refreshToken: newRefresh, expiresAt: newExpires })); } catch (e) { /* ignore */ }
              scheduleRefresh(newRefresh, new Date(newExpires));
            }
          }
        } catch {
          // if refresh fails, force logout via session clear
          sessionStorage.removeItem('auth');
          setUser(null);
          setToken(null);
          clearAccessToken();
          try { window.location.href = '/login'; } catch {}
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
      <SessionExpiredModal open={sessionExpired} onClose={() => { setSessionExpired(false); try { window.location.href = '/login'; } catch {} }} />
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