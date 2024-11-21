import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPoolByIdAsync } from '../state/poolSlice';
import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import CircularIndeterminate from './Loading';
import { fetchUserPoolsAsync } from '../state/userPoolsSlice';

export default function ProtectedPoolRoute({ children }) {
  const dispatch = useDispatch();
  const { isSignedIn, user } = useUser();
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
        // First try to get pool from activePoolId
        if (activePoolId) {
          // Only fetch if pool is not already in state
          if (!pool.id || pool.id !== activePoolId) {
            await dispatch(fetchPoolByIdAsync(activePoolId)).unwrap();
          }
        } else if (user?.id) {
          const userPools = await dispatch(
            fetchUserPoolsAsync(user.id),
          ).unwrap();
          // If no activePoolId, fetch user's pools and update state with most recent
          if (userPools.length > 0) {
            const mostRecentPool = userPools[0];
            localStorage.setItem('activePoolId', mostRecentPool.id);
            await dispatch(fetchPoolByIdAsync(mostRecentPool.id)).unwrap();
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
