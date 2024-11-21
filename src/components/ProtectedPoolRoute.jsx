import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPoolByIdAsync } from '../state/poolSlice';
import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import CircularIndeterminate from './Loading';
import { fetchUserPoolsAsync } from '../state/userPoolsSlice';

export default function ProtectedPoolRoute({ children }) {
  const dispatch = useDispatch();
  const { isSignedIn, user } = useAuth();
  const [isInitializing, setIsInitializing] = useState(true);
  const pool = useSelector((state) => state.pool);
  const userPools = useSelector((state) => state.userPools.pools);
  const activePoolId = localStorage.getItem('activePoolId');

  // Initialize pool state
  useEffect(() => {
    const initializePool = async () => {
      try {
        // First try to get pool from activePoolId
        if (activePoolId) {
          // Only fetch if pool is not already in state
          if (!pool.id || pool.id !== activePoolId) {
            await dispatch(fetchPoolByIdAsync(activePoolId)).unwrap();
            setIsInitializing(false);
            return;
          }
          setIsInitializing(false);
          return;
        }

        // If no activePoolId, try to get user's pools
        if (user?.id) {
          const result = await dispatch(fetchUserPoolsAsync(user.id)).unwrap();

          // If user has pools, set most recent pool as active
          if (result && result.length > 0) {
            const mostRecentPool = result[0];
            await dispatch(fetchPoolByIdAsync(mostRecentPool.id)).unwrap();
            localStorage.setItem('activePoolId', mostRecentPool.id);
            localStorage.setItem('userId', user.id);
          }
        }
        setIsInitializing(false);
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
  }, [pool.id, dispatch, isSignedIn, activePoolId, user?.id]);

  // Show loading indicator while initializing
  if (isInitializing || isSignedIn === undefined || !pool?.name) {
    return <CircularIndeterminate />;
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
    return <CircularIndeterminate />;
  }

  return children;
}

ProtectedPoolRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
