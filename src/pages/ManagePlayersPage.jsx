import classes from './ManagePlayersPage.module.css';
import PageHeader from '../components/PageHeader';
import MobileNavMenu from './MobileNavMenu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ManageTeamsPage() {
  return (
    <div className={classes['manage-teams']}>
      <PageHeader
        headerText="Manage Players"
        leftBtnText=<ArrowBackIcon />
        path="/pool-settings"
      />
      <div className={classes['players-container']}></div>
      <MobileNavMenu className={classes['bottom-menu']} />
    </div>
  );
}
