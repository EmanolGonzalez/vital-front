import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { setAccessToken, clearAccessToken } from '../lib/apiClient';

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
  setTokenFromExternal?: (token: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null); // keep token in memory only

  // Keep authentication token in memory only. Do not persist sensitive tokens to localStorage.
  useEffect(() => {
    // No persistent token on load; remain logged out until explicit login.
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      const returnedToken = res?.accessToken ?? res?.Token ?? res?.token;
      if (!returnedToken) throw new Error('Login response missing token');
      setToken(returnedToken);
      setAccessToken(returnedToken);
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
  const setTokenFromExternal = async (externalToken: string): Promise<boolean> => {
    try {
      setToken(externalToken);
      setAccessToken(externalToken);
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

  const logout = () => {
    setUser(null);
    setToken(null);
    clearAccessToken();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, setTokenFromExternal }}>
      {children}
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