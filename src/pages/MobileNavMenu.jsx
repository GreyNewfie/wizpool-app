import PropTypes from 'prop-types';
import classes from './MobileNavMenu.module.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export default function MobileNavMenu() {
  return (
    <div className={classes['mobile-nav-menu']}>
      <div className={classes['nav-btn-container']}>
        <button className={classes['mobile-nav-btn']}>
          {<HomeOutlinedIcon />}
        </button>
        <p>Home</p>
      </div>
      <div className={classes['nav-btn-container']}>
        <button className={classes['mobile-nav-btn']}>
          {<PeopleAltOutlinedIcon />}
        </button>
        <p>Players</p>
      </div>
      <div className={classes['nav-btn-container']}>
        <button className={classes['mobile-nav-btn']}>
          {<CheckCircleOutlinedIcon />}
        </button>
        <p>Picks</p>
      </div>
      <div className={classes['nav-btn-container']}>
        <button className={classes['mobile-nav-btn']}>
          {<SettingsOutlinedIcon />}
        </button>
        <p>Settings</p>
      </div>
    </div>
  );
}
