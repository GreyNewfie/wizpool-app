import { NavLink } from 'react-router-dom';
import classes from './DesktopNavHeader.module.css';

export default function DesktopNavHeader() {
  return (
    <div className={classes['desktop-nav-header']}>
      <img
        className={classes['logo']}
        src="/public/wizpool-wordmark-230x70.png"
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
      </div>
    </div>
  );
}
