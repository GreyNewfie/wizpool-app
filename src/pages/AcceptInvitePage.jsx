import { SignUp, useUser, useAuth } from '@clerk/clerk-react';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPool } from '../state/poolSlice';
import { acceptInvitation, fetchCompletePool } from '../services/poolService';
import classes from './AcceptInvitePage.module.css';
import LoadingOverlay from '../components/LoadingOverlay';

export default function AcceptInvitePage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [hasAttempted, setHasAttempted] = useState(false);

  const processInvitation = useCallback(async () => {
    if (hasAttempted) {
      console.log('Already attempted to process invitation');
      return;
    }

    if (!isLoaded || !isSignedIn) return;

    const poolId = user?.publicMetadata?.poolId;
    if (!poolId) {
      console.log('No poolId in metadata');
      return;
    }

    console.log('Starting invitation process for poolId:', poolId);
    setIsProcessing(true);

    try {
      const token = await getToken();

      // Step 1: Accept the invitation using poolId
      await acceptInvitation(poolId, token);
      console.log('Invitation accepted successfully');

      // Set as active pool
      localStorage.setItem('activePoolId', poolId);

      // Step 2: Fetch the pool data
      const poolData = await fetchCompletePool(poolId, token);
      dispatch(setPool(poolData));
      console.log('Pool data fetched successfully');

      // Navigate to pool home
      navigate('/pool-home');
    } catch (error) {
      console.error('Error processing invitation:', error);
      setError(error.message);
    } finally {
      setIsProcessing(false);
      setHasAttempted(true);
    }
  }, [user, isLoaded, isSignedIn, getToken, navigate, dispatch, hasAttempted]);

  useEffect(() => {
    processInvitation();
  }, [processInvitation]);

  // Show loading state while processing
  if (isProcessing) {
    return <LoadingOverlay />;
  }

  // Show error if something went wrong
  if (error) {
    return (
      <div className={classes['accept-invite-container']}>
        <div className={classes['error-message']}>
          <h2>Failed to Accept Invitation</h2>
          <p>{error}</p>
          <p>Please contact support or try again later.</p>
          <button
            onClick={() => navigate('/pool-home')}
            className={classes['back-button']}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // If user is not signed in, show signup form that redirects back here
  if (!isSignedIn) {
    return (
      <div className={classes['accept-invite-container']}>
        <SignUp forceRedirectUrl={'/accept-invite'} />
      </div>
    );
  }

  // If we get here, we're probably still loading user data
  return <LoadingOverlay />;
}
