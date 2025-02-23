import classes from './DashboardPage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserPoolsAsync } from '../state/userPoolsSlice';
import { fetchPoolAsync } from '../state/poolSlice';
import { useEffect } from 'react';
import CircularIndeterminate from '../components/Loading';
import { SignIn, SignedIn, useUser, useAuth } from '@clerk/clerk-react';
import FeaturesList from '../components/FeaturesList';

export default function Dashboard() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userPoolsLoading = useSelector((state) => state.userPools.loading);
  const poolLoading = useSelector((state) => state.pool.loading);
  const baseURL = import.meta.env.BASE_URL || '/';

  useEffect(() => {
    const initializeUser = async () => {
      // Wait for user data to be loaded
      if (!isUserLoaded || !user) return;

      try {
        const token = await getToken();
        const result = await dispatch(
          fetchUserPoolsAsync({ userId: user.id, token }),
        ).unwrap();

        if (!result?.length) {
          navigate('/choose-league');
          return;
        }

        const mostRecentPool = result[0];
        if (!mostRecentPool?.id) {
          console.error('Invalid pool data:', mostRecentPool);
          navigate('/choose-league');
          return;
        }

        try {
          await dispatch(
            fetchPoolAsync({ poolId: mostRecentPool.id, token }),
          ).unwrap();
          localStorage.setItem('activePoolId', mostRecentPool.id);
          localStorage.setItem('userId', user.id);
        } catch (error) {
          console.error('Error initializing pool:', error);
          navigate('/choose-league');
        }
      } catch (error) {
        console.error('Error in user initialization:', error);
        navigate('/choose-league');
      }
    };

    initializeUser();
  }, [isUserLoaded, user, dispatch, navigate, getToken]);

  return (
    <div className={classes['page-wrapper']}>
      <div className={classes[`welcome-container`]}>
        <div className={classes['auth-container']}>
          <SignIn forceRedirectUrl={`${baseURL}pool-home`} withSignUp={true} />
        </div>
        <div className={classes['features-container']}>
          <HeaderLogo />
          <FeaturesList />
        </div>
        <SignedIn>
          {(poolLoading || userPoolsLoading) && <CircularIndeterminate />}
        </SignedIn>
      </div>
    </div>
  );
}

function HeaderLogo() {
  return (
    <div className="header-logo-container">
      <img
        className="header-logo"
        src="./wizpool-wordmark-690x210.png"
        alt="WizPool logo"
      />
    </div>
  );
}
