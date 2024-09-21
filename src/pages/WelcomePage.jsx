import PrimaryLinkButton from '../components/PrimaryLinkButton';
import usePool from '../utils/usePool';
import classes from './WelcomePage.module.css';
// import addBasePath from '../utils/addBasePath';

export default function Welcome() {
  const { pool } = usePool();
  const isExistingPool = pool.poolName || null;

  return (
    <div className={classes[`welcome-container`]}>
      <HeaderLogo />
      <TextCarrousel />
      {isExistingPool ? (
        <PrimaryLinkButton text="Go To Pool" path="/pool-home" />
      ) : (
        <PrimaryLinkButton text={'Get Started'} path={'/choose-league'} />
      )}
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
