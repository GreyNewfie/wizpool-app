import classes from './SettingsPage.module.css';
import PageHeader from '../components/PageHeader';
import MobileNavMenu from './MobileNavMenu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import usePool from '../utils/usePool';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Switch } from '@mui/material';
import useTheme from '../context/useTheme';

export default function SettingsPage() {
  const { pool } = usePool();
  const { theme, setTheme } = useTheme();
  const [currentMode, setCurrentMode] = useState(theme);

  const handleChange = (e) => {
    const newMode = e.target.checked ? 'light' : 'dark';
    setCurrentMode(newMode);
    setTheme(newMode);
  };

  return (
    <div className={classes['pool-settings']}>
      <PageHeader
        headerText="Settings"
        leftBtnText=<ArrowBackIcon />
        path="/pool-home"
      />
      <div className={classes['settings-content']}>
        <div className={classes['pool-info-container']}>
          <h5>Pool Info</h5>
          <div className={classes['pool-info']}>
            <div className={classes['pool-name']}>
              <p>Pool Name</p>
              <p>{pool.poolName}</p>
            </div>
            <div className={classes['pool-league']}>
              <p>Sports League</p>
              <p>{pool.league.toUpperCase()}</p>
            </div>
          </div>
        </div>
        <div className={classes['manage-players']}>
          <Link to="/manage-players">
            <h5>Manage Players</h5>
            <div className={classes['modify-setting']}>
              <p>Add, remove or modify players</p>
              <KeyboardArrowRightIcon />
            </div>
          </Link>
        </div>
        <div className={classes['reassign-teams']}>
          <Link to="/reassign-teams">
            <h5>Reassign Teams</h5>
            <div className={classes['modify-setting']}>
              <p>Rassign teams to players</p>
              <KeyboardArrowRightIcon />
            </div>
          </Link>
        </div>
        <div className={classes['app-settings']}>
          <h5>App Settings</h5>
          <div className={classes['modify-setting']}>
            <div className={classes['switch-container']}>
              <p>
                {currentMode === 'dark'
                  ? 'Switch to Light Mode'
                  : 'Switch to Dark Mode'}
              </p>
              <Switch
                checked={theme === 'light'}
                onChange={handleChange}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: 'var(--primary-color)',
                    '&:hover': {
                      opacity: '.8',
                    },
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: 'var(--primary-color)',
                  },
                  '& .MuiSwitch-switchBase': {
                    color: 'var(--secondary-text-color)',
                    '&:hover': {
                      opacity: '.8',
                    },
                  },
                  '& .MuiSwitch-track': {
                    backgroundColor: 'var(--secondary-text-color)',
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <MobileNavMenu className={classes['bottom-menu']} />
    </div>
  );
}
