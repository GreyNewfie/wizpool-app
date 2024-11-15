import PrimaryLinkButton from '../components/PrimaryLinkButton';
import classes from './WelcomePage.module.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAuth, SignedOut, SignInButton, SignedIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const pool = useSelector((state) => state.pool);
  const isExistingPool = pool.name !== '' ? true : null;

  // Handle authentication redirects
  useEffect(() => {
    if (isSignedIn) {
      if (isExistingPool) {
        navigate('/pool-home');
      } else {
        navigate('/choose-league');
      }
    }
  }, [isSignedIn, isExistingPool, navigate]);

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
        {isExistingPool ? (
          <PrimaryLinkButton text="Go To Pool" path="/pool-home" />
        ) : (
          <PrimaryLinkButton text="Get Started" path="/choose-league" />
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
  return (
    <div className="text-carrousel-container">
      <h1>Welcome to WizPool</h1>
      <p>The app that will make you a wins pool tracking wizard.</p>
    </div>
  );
}
