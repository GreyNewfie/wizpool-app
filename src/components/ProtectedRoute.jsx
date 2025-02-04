import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingOverlay from './LoadingOverlay';

export default function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth();
  
 // Don't redirect until Clerk has finished loading
 if (!isLoaded) {
  console.log("Auth is still loading...");
  return <LoadingOverlay />;
}

  if (!isSignedIn) {
    console.log("User is not signed in, redirecting to home.");
    return <Navigate to="/" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
