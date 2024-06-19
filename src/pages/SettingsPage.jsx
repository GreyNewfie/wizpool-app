import classes from './SettingsPage.module.css';
import PageHeader from '../components/PageHeader';
import MobileNavMenu from './MobileNavMenu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import usePool from '../utils/usePool';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Switch } from '@mui/material';

export default function SettingsPage() {
  const { pool } = usePool();
  const [currentMode, setCurrentMode] = useState('dark');

  const handleChange = (event) => {
    event.target.checked ? setCurrentMode('light') : setCurrentMode('dark');
  };

  return (
    <div className={classes['pool-settings']}>
      <PageHeader
        headerText="Settings"
        leftBtnText=<ArrowBackIcon />
        path="/pool-home"
      />
      <div className={classes['settings-content']}>
        <div className={classes['league-setting']}>
          <h4>League</h4>
          <div className={classes['league-info']}>
            <p>League Name</p>
            <p>{pool.poolName}</p>
          </div>
        </div>
        <div className={classes['manage-players']}>
          <h4>Manage Players</h4>
          <div className={classes['modify-setting']}>
            <Link to="/manage-players">
              <p>Add, remove or modify players</p>
              <KeyboardArrowRightIcon />
            </Link>
          </div>
        </div>
        <div className={classes['team-names']}>
          <h4>Team Names</h4>
          <div className={classes['modify-setting']}>
            <Link to="/pool-home">
              <p>Change players team names</p>
              <KeyboardArrowRightIcon />
            </Link>
          </div>
        </div>
        <div className={classes['reassign-teams']}>
          <h4>Reassign Teams</h4>
          <div className={classes['modify-setting']}>
            <Link to="/pool-home">
              <p>Rassign teams to players</p>
              <KeyboardArrowRightIcon />
            </Link>
          </div>
        </div>
        <div className={classes['app-settings']}>
          <h4>App Settings</h4>
          <div className={classes['modify-setting']}>
            <div className={classes['switch-container']}>
              <p>
                {currentMode === 'dark'
                  ? 'Switch to Light Mode'
                  : 'Switch to Dark Mode'}
              </p>
              <Switch
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
