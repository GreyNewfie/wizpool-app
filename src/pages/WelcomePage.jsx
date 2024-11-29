import PrimaryLinkButton from '../components/PrimaryLinkButton';
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
  UserButton,
} from '@clerk/clerk-react';

export default function Welcome() {
  const { user } = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userPools = useSelector((state) => state.userPools.pools);
  const userPoolsLoading = useSelector((state) => state.userPools.loading);
  const poolLoading = useSelector((state) => state.pool.loading);

  useEffect(() => {
    // If user then fetch user pools
    if (user) {
      dispatch(fetchUserPoolsAsync(user.id));
      console.log('User is signed in: ', user);
      console.log('User pools: ', userPools);
    }
  }, [user, dispatch]);

  useEffect(() => {
    // If user has pools then set the most recent pool as the active pool
    const initializePool = async () => {
      if (userPools.length > 0 && !userPoolsLoading) {
        const mostRecentPool = userPools[0]; // TODO: sort pools by most recently updated

        try {
          // Fetch complete pool data with team stats
          await dispatch(fetchPoolAsync(mostRecentPool.id)).unwrap();

          // Store active pool ID in localStorage
          localStorage.setItem('activePoolId', mostRecentPool.id);
          localStorage.setItem('userId', user.id);
        } catch (error) {
          console.error('Error initializing pool: ', error);
        }
      }
    };

    initializePool();
  }, [userPools, userPoolsLoading, user, dispatch]);

  const handleGoToPool = () => {
    // If user has pools then navigate to pool home
    if (userPools.length > 0) {
      navigate('/pool-home');
    } else {
      navigate('/choose-league');
    }
  };

  return (
    <div className={classes[`welcome-container`]}>
      <header className={classes['welcome-header']}>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <HeaderLogo />
      <TextCarrousel />
      <SignedOut>
        <SignInButton mode="modal">
          <button className={classes['sign-in-btn']}>Get Started</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        {(poolLoading || userPoolsLoading) && <CircularIndeterminate />}
        {!poolLoading && !userPoolsLoading && (
          <PrimaryLinkButton
            text={userPools.length > 0 ? 'Go To Pool' : 'Create Pool'}
            handleClick={handleGoToPool}
          />
        )}
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
