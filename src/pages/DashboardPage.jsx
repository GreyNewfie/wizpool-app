import classes from './DashboardPage.module.css';
import { useSelector } from 'react-redux';
import CircularIndeterminate from '../components/Loading';
import { SignIn, SignedIn } from '@clerk/clerk-react';
import FeaturesList from '../components/FeaturesList';

export default function Dashboard() {
  const userPoolsLoading = useSelector((state) => state.userPools.loading);
  const poolLoading = useSelector((state) => state.pool.loading);
  const baseURL = import.meta.env.BASE_URL || '/';

  return (
    <div className={classes['page-wrapper']}>
      <div className={classes[`welcome-container`]}>
        <div className={classes['auth-container']}>
          <SignIn
            forceRedirectUrl={`${baseURL}pool-home`}
            signUpForceRedirectUrl={`${baseURL}pool-home`}
            withSignUp={true}
          />
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
