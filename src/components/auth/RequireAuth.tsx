import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

interface RequireAuthProps {
  children: React.ReactElement;
  role?: 'admin' | 'doctor' | 'patient';
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children, role }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    // Not authenticated — redirect to login with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    // Forbidden — show basic 403 UI
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white dark:bg-slate-900 border rounded-md p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">403 — Acceso denegado</h1>
          <p className="text-muted-foreground mb-4">No tienes permisos para acceder a esta página.</p>
          <div className="flex justify-center">
            <a href="/" className="btn btn-primary">Volver al inicio</a>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default RequireAuth;
