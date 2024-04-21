import { Link } from 'react-router-dom';
import PrimaryButton from '../components/primary-button';

export default function Welcome() {
  return (
    <div className="welcome-container">
      <HeaderLogo />
      <TextCarrousel />
      <PrimaryButton text={'Get Started'} path={'/create-pool'} />
    </div>
  );
}

function HeaderLogo() {
  return (
    <div className="header-logo-container">
      <img
        className="header-logo"
        src="/wizpool-stacked-no-bg-750x650.png"
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
