// components/ProtectedRoute/ProtectedRoute.tsx
import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import UseAuth from '../../../hooks/UseAuth/UseAuth';
import Loader from '../../sharedItems/Loader/Loader';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
  fallbackPath?: string;
}

const ProtectedRoute = ({ 
  children, 
  requiredRole, 
  fallbackPath = '/unauthorized' 
}: ProtectedRouteProps) => {
  const { user, loading, userRole } = UseAuth();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // If no specific role required, just require authentication
  if (!requiredRole) {
    return <>{children}</>;
  }

  // Check if user has the required role
  if (userRole !== requiredRole) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;