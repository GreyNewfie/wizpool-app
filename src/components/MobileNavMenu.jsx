import { NavLink } from 'react-router-dom';
import classes from './MobileNavMenu.module.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export default function MobileNavMenu() {
  return (
    <div className={classes['mobile-nav-menu']}>
      <div className={classes['nav-btn-container']}>
        <NavLink
          to="/pool-home"
          className={({ isActive }) => (isActive ? classes.active : '')}
        >
          <button className={classes['mobile-nav-btn']}>
            <HomeOutlinedIcon />
          </button>
          <p>Home</p>
        </NavLink>
      </div>
      <div className={classes['nav-btn-container']}>
        <NavLink
          to="/pool-players"
          className={({ isActive }) => (isActive ? classes.active : '')}
        >
          <button className={classes['mobile-nav-btn']}>
            <PeopleAltOutlinedIcon />
          </button>
          <p>Players</p>
        </NavLink>
      </div>
      <div className={classes['nav-btn-container']}>
        <NavLink
          to="/pool-picks"
          className={({ isActive }) => (isActive ? classes.active : '')}
        >
          <button className={classes['mobile-nav-btn']}>
            <CheckCircleOutlinedIcon />
          </button>
          <p>Picks</p>
        </NavLink>
      </div>
      <div className={classes['nav-btn-container']}>
        <NavLink
          to="/pool-settings"
          className={({ isActive }) => (isActive ? classes.active : '')}
        >
          <button className={classes['mobile-nav-btn']}>
            <SettingsOutlinedIcon />
          </button>
          <p>Settings</p>
        </NavLink>
      </div>
    </div>
  );
}
