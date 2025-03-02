import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPoolByIdAsync } from '../state/poolSlice';
import { useUser, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { fetchUserPoolsAsync } from '../state/userPoolsSlice';
import LoadingOverlay from './LoadingOverlay';

export default function ProtectedPoolRoute({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
            await dispatch(
              fetchPoolByIdAsync({ poolId: activePoolId, token }),
            ).unwrap();
          }
        } else if (user?.id) {
          try {
            const userPools = await dispatch(
              fetchUserPoolsAsync({ userId: user.id, token }),
            ).unwrap();

            // When the user has pools, the API returns an array of pool objects
            // When the user has no pools, the API returns an object with a message and empty pools array
            const hasNoPools =
              !Array.isArray(userPools) || userPools.length === 0;

            // If user has no pools, redirect to choose league page to create one
            if (hasNoPools) {
              setIsInitializing(false);
              navigate('/choose-league');
              return;
            }

            // If no activePoolId, fetch user's pools and update state with most recent
            if (!hasNoPools) {
              const mostRecentPool = userPools[0];
              localStorage.setItem('activePoolId', mostRecentPool.id);
              await dispatch(
                fetchPoolByIdAsync({ poolId: mostRecentPool.id, token }),
              ).unwrap();
            }
          } catch (error) {
            console.error('Error fetching user pools:', error);
            setIsInitializing(false);
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
    console.log('⏳ Showing LoadingOverlay because:', {
      isInitializing,
      isSignedInUndefined: isSignedIn === undefined,
      poolNameMissing: !pool?.name,
      poolState: pool,
    });
    return <LoadingOverlay />;
  }

  // Check authentication after initialization
  if (!isSignedIn) {
    console.log(
      '🔒 User not signed in after initialization, navigating to home page',
      user,
    );
    navigate('/');
  }

  console.log('✅ ProtectedPoolRoute rendering children, pool:', pool);
  return children;
}

ProtectedPoolRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
