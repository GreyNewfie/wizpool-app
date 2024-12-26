import classes from './WelcomePage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserPoolsAsync } from '../state/userPoolsSlice';
import { fetchPoolAsync } from '../state/poolSlice';
import { useEffect } from 'react';
import CircularIndeterminate from '../components/Loading';
import {
  SignedOut,
  SignInButton,
  SignedIn,
  useUser,
  useAuth,
} from '@clerk/clerk-react';

export default function Welcome() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userPools = useSelector((state) => state.userPools.pools);
  const userPoolsLoading = useSelector((state) => state.userPools.loading);
  const poolLoading = useSelector((state) => state.pool.loading);

  useEffect(() => {
    const initializeUser = async () => {
      if (user) {
        console.log('Starting user initialization');
        try {
          // Step 1: Fetch user pools
          console.log('Before fetching pools:', { userPoolsLoading, userPools });
          const token = await getToken();
          const result = await dispatch(fetchUserPoolsAsync({userId: user.id, token})).unwrap();
          console.log('Pools fetched successfully:', result);

          // Step 2: Initialize pool if we have pools
          if (result && result.length > 0) {
            console.log('User has pools, initializing most recent pool');
            const mostRecentPool = result[0];
            
            if (!mostRecentPool?.id) {
              console.error('Invalid pool data:', mostRecentPool);
              return;
            }

            try {
              // Fetch complete pool data with team stats
              await dispatch(fetchPoolAsync({poolId: mostRecentPool.id, token})).unwrap();
              localStorage.setItem('activePoolId', mostRecentPool.id);
              localStorage.setItem('userId', user.id);
              navigate('/pool-home');
            } catch (error) {
              console.error('Error initializing pool:', error);
            }
          } else {
            console.log('No pools found, navigating to choose-league');
            navigate('/choose-league');
          }
        } catch (error) {
          console.error('Error in user initialization:', error);
        }
      }
    };

    initializeUser();
  }, [user, dispatch, navigate, getToken]);

  return (
    <div className={classes[`welcome-container`]}>
      <HeaderLogo />
      <TextCarrousel />
      <SignedOut>
        <SignInButton mode="modal">
          <button className={classes['sign-in-btn']}>Get Started</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        {(poolLoading || userPoolsLoading) && <CircularIndeterminate />}
      </SignedIn>
    </div>
  );
}

function HeaderLogo() {
  return (
    <div className="header-logo-container">
      <img
        className="header-logo"
        src={'./wizpool-stacked-no-bg-750x650.png'}
        alt="a trophy with a wizard hat on top"
      />
    </div>
  );
}

function TextCarrousel() {
  const { user } = useUser();
  return (
    <div className="text-carrousel-container">
      <SignedOut>
        <h1>Welcome to WizPool</h1>
        <p>The app that will make you a wins pool tracking wizard.</p>
      </SignedOut>
      <SignedIn>
        <h1>Welcome Back, {user?.firstName || 'Wizard'}!</h1>
        <p>The app that will make you a wins pool tracking wizard.</p>
      </SignedIn>
    </div>
  );
}
