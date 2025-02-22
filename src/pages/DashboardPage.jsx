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
  const { user } = useUser();
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userPoolsLoading = useSelector((state) => state.userPools.loading);
  const poolLoading = useSelector((state) => state.pool.loading);

  useEffect(() => {
    const initializeUser = async () => {
      if (user) {
        try {
          // Step 1: Fetch user pools
          const token = await getToken();
          const result = await dispatch(
            fetchUserPoolsAsync({ userId: user.id, token }),
          ).unwrap();

          // Step 2: Initialize pool if we have pools
          if (result && result.length > 0) {
            const mostRecentPool = result[0];

            if (!mostRecentPool?.id) {
              console.error('Invalid pool data:', mostRecentPool);
              return;
            }

            try {
              // Fetch complete pool data with team stats
              await dispatch(
                fetchPoolAsync({ poolId: mostRecentPool.id, token }),
              ).unwrap();
              localStorage.setItem('activePoolId', mostRecentPool.id);
              localStorage.setItem('userId', user.id);
              navigate('/pool-home');
            } catch (error) {
              console.error('Error initializing pool:', error);
            }
          } else {
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
    <div className={classes['page-wrapper']}>
      <div className={classes[`welcome-container`]}>
        <div className={classes['auth-container']}>
          <SignIn />
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
        src="./wizpool-wordmark-230x70.png"
        alt="WizPool logo"
      />
    </div>
  );
}
