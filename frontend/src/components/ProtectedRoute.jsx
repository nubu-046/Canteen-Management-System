import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, isAdmin } from '../utils/auth';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const authenticated = isAuthenticated();
  const userIsAdmin = isAdmin();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !userIsAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;