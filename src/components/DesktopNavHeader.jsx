import { NavLink } from 'react-router-dom';
import classes from './DesktopNavHeader.module.css';
import useIsDesktop from '../utils/useIsDesktop';
import AvatarAndMenu from './AvatarAndMenu';
import PropTypes from 'prop-types';

export default function DesktopNavHeader(props) {
  const isDesktop = useIsDesktop();
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
        {isDesktop && (
          <AvatarAndMenu
            poolName={props.poolName}
            createNewPool={props.createNewPool}
            changePool={props.changePool}
            nonActivePools={props.nonActivePools}
          />
        )}
      </div>
    </div>
  );
}

DesktopNavHeader.propTypes = {
  poolName: PropTypes.string,
  createNewPool: PropTypes.func,
  changePool: PropTypes.func,
  nonActivePools: PropTypes.array,
};
