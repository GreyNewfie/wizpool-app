import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classes from './MobileNavMenu.module.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export default function MobileNavMenu() {
  return (
    <div className={classes['mobile-nav-menu']}>
      <div className={classes['nav-btn-container']}>
        <Link to="/pool-home">
          <button className={classes['mobile-nav-btn']}>
            <HomeOutlinedIcon />
          </button>
          <p>Home</p>
        </Link>
      </div>
      <div className={classes['nav-btn-container']}>
        <Link>
          <button className={classes['mobile-nav-btn']}>
            <PeopleAltOutlinedIcon />
          </button>
          <p>Players</p>
        </Link>
      </div>
      <div className={classes['nav-btn-container']}>
        <Link>
          <button className={classes['mobile-nav-btn']}>
            <CheckCircleOutlinedIcon />
          </button>
          <p>Picks</p>
        </Link>
      </div>
      <div className={classes['nav-btn-container']}>
        <Link>
          <button className={classes['mobile-nav-btn']}>
            <SettingsOutlinedIcon />
          </button>
          <p>Settings</p>
        </Link>
      </div>
    </div>
  );
}
