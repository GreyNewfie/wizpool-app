import PropTypes from 'prop-types';
import classes from './MobileNavMenu.module.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export default function MobileNavMenu() {
  return (
    <div className={classes['mobile-nav-menu']}>
      <div className={classes['home-nav-container']}>
        <button>{<HomeOutlinedIcon />}</button>
        <p>Home</p>
      </div>
      <div className={classes['teams-nav-container']}>
        <button>{<PeopleAltOutlinedIcon />}</button>
        <p>Players</p>
      </div>
      <div className={classes['picks-nav-container']}>
        <button>{<CheckCircleOutlinedIcon />}</button>
        <p>Picks</p>
      </div>
      <div className={classes['settings-nav-container']}>
        <button>{<SettingsOutlinedIcon />}</button>
        <p>Settings</p>
      </div>
    </div>
  );
}
