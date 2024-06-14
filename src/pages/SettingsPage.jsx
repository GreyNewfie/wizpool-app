import classes from './SettingsPage.module.css';
import PageHeader from '../components/PageHeader';
import MobileNavMenu from './MobileNavMenu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import usePool from '../utils/usePool';
import { Link } from 'react-router-dom';

export default function SettingsPage() {
  const { pool } = usePool();

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
            <Link to="/pool-home">
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
      </div>
      <MobileNavMenu className={classes['bottom-menu']} />
    </div>
  );
}
