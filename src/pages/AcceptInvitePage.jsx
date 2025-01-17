import { SignUp, useUser, useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPool } from '../state/poolSlice';
import { getApiBaseUrl } from '../config/config';
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

  useEffect(() => {
    const processInvitation = async () => {
      if (!isLoaded || !isSignedIn) return;

      const invitationId = user?.publicMetadata?.invitationId;
      if (!invitationId) return;

      // Prevent duplicate processing
      if (isProcessing) return;

      setIsProcessing(true);
      try {
        const token = await getToken();

        // Step 1: Accept the invitation
        const { poolId } = await acceptInvitation(invitationId, token)

        // Set as active pool
        localStorage.setItem('activePoolId', poolId);

        // Step 2: Fetch the pool data
        try {
          const poolData = await fetchCompletePool(poolId, token);
          dispatch(setPool(poolData));
        } catch (error) {
          // Clear invitation metadata on failure
          await user.update({
            publicMetadata: {
              ...user.publicMetadata,
              invitationId: null,
              poolId: null,
            },
          });
          throw new Error('Failed to fetch pool data');
        }

        // Clear invitation metadata on success
        await user.update({
          publicMetadata: {
            ...user.publicMetadata,
            invitationId: null,
            poolId: null,
          },
        });

        // Navigate to pool home
        navigate('/pool-home');
      } catch (error) {
        console.error('Error processing invitation:', error);
        setError(error.message);
      } finally {
        setIsProcessing(false);
      }
    };

    processInvitation();
  }, [isLoaded, isSignedIn, user, getToken, navigate, dispatch, isProcessing]);

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
