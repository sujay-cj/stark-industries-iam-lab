import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Spinner from './Spinner';

export function ProtectedRoute({ requiredGroup = 'soc-portal-users' }) {
  const { isAuthenticated, isInitialized, hasGroup } = useAuth();

  const isAuthorized = hasGroup(requiredGroup);

  if (!isInitialized) {
    return (
      <div className="h-screen w-screen bg-soc-bg flex items-center justify-center">
        <Spinner size={36} />
      </div>
    );
  }

  if (!isAuthenticated || !isAuthorized) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
