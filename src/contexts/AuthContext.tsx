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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay token guardado y obtener usuario
    // Support multiple token keys for compatibility: prefer 'ilumina_token', fall back to 'token'
    const token = localStorage.getItem('ilumina_token') ?? localStorage.getItem('token');
    if (token) {
      setAccessToken(token);
      api.get('/auth/me')
        .then(data => {
          setUser({
            id: data.id || data.user?.id || '',
            name: data.name || data.user?.name || '',
            email: data.email || data.user?.email || '',
            role: data.role || data.user?.role || 'patient',
            avatar: data.avatar || data.user?.avatar,
            phone: data.phone || data.user?.phone,
            specialization: data.specialization || data.user?.specialization,
            department: data.department || data.user?.department
          });
        })
        .catch(() => {
          setUser(null);
          clearAccessToken();
          localStorage.removeItem('ilumina_token');
          localStorage.removeItem('token');
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      // backend may return token under different property names (Token, token, accessToken)
      const token = res?.accessToken ?? res?.Token ?? res?.token;
      if (!token) throw new Error('Login response missing token');
      setAccessToken(token);
      localStorage.setItem('ilumina_token', token);
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
      clearAccessToken();
      localStorage.removeItem('ilumina_token');
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    clearAccessToken();
    localStorage.removeItem('ilumina_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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