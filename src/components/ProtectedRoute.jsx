import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingOverlay from './LoadingOverlay';

export default function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth();

  // Don't redirect until Clerk has finished loading
  if (!isLoaded) {
    return <LoadingOverlay />;
  }

  if (!isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
