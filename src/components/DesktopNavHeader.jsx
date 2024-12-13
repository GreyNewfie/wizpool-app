import { NavLink } from 'react-router-dom';
import classes from './DesktopNavHeader.module.css';
import useIsDesktop from '../utils/useIsDesktop';
import AvatarAndMenu from './AvatarAndMenu';
import {
  SignedOut,
  SignedIn,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';

export default function DesktopNavHeader() {
  const isDesktop = useIsDesktop();

  return (
    <header className={classes['desktop-nav-header']}>
      <img
        className={classes['logo']}
        src="./wizpool-wordmark-230x70.png"
        alt="WizPool logo"
      />
      <div className={classes['nav-items']}>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : '')}
          to="/pool-home"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : '')}
          to="/pool-players"
        >
          Players
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : '')}
          to="/pool-picks"
        >
          Picks
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : '')}
          to="/pool-settings"
        >
          Settings
        </NavLink>
        {isDesktop && (
          <AvatarAndMenu />
        )}
        <SignedOut>
          <SignInButton className={classes['sign-in-btn']} />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}