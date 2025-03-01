import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPoolByIdAsync } from '../state/poolSlice';
import { useUser, useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { fetchUserPoolsAsync } from '../state/userPoolsSlice';
import LoadingOverlay from './LoadingOverlay';

export default function ProtectedPoolRoute({ children }) {
  const dispatch = useDispatch();
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const [isInitializing, setIsInitializing] = useState(true);
  const pool = useSelector((state) => state.pool);
  const activePoolId = localStorage.getItem('activePoolId');

  // Initialize pool state
  useEffect(() => {
    const initializePool = async () => {
      if (!isSignedIn) {
        setIsInitializing(false);
        return;
      }

      try {
        const token = await getToken();
        // First try to get pool from activePoolId
        if (activePoolId) {
          // Only fetch if pool is not already in state
          if (!pool.id || pool.id !== activePoolId) {
            await dispatch(fetchPoolByIdAsync({poolId: activePoolId, token})).unwrap();
          }
        } else if (user?.id) {
          const userPools = await dispatch(
            fetchUserPoolsAsync({userId: user.id, token}),
          ).unwrap();
          // If no activePoolId, fetch user's pools and update state with most recent
          if (userPools.length > 0) {
            const mostRecentPool = userPools[0];
            localStorage.setItem('activePoolId', mostRecentPool.id);
            await dispatch(fetchPoolByIdAsync({poolId: mostRecentPool.id, token})).unwrap();
          }
        }
      } catch (error) {
        console.error('Error initializing pool: ', error);
      } finally {
        setIsInitializing(false);
      }
    };

    if (isSignedIn) {
      initializePool();
    } else {
      setIsInitializing(false);
    }
  }, [isSignedIn, user?.id, pool.id, dispatch, activePoolId]);

  // Show loading indicator while initializing
  if (isInitializing || isSignedIn === undefined || !pool?.name) {
    return <LoadingOverlay />;
  }

  // Check authentication after initialization
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  // After initializing verify pool is set
  if (!pool.id || !pool.players?.length) {
    // Only redirect if there's no activePoolId
    if (!activePoolId) {
      return <Navigate to="/" replace />;
    }
    return <LoadingOverlay />;
  }

  return children;
}

ProtectedPoolRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
