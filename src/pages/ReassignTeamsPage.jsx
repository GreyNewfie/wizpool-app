import classes from './ReassignTeamsPage.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PageHeader from '../components/PageHeader';
import MobileNavMenu from './MobileNavMenu';

export default function ReassignTeamsPage() {
  return (
    <div className={classes['reassign-teams']}>
      <PageHeader
        headerText="Rassign Teams"
        leftBtnText=<ArrowBackIcon />
        path="/pool-settings"
      />
      <div className={classes['players-container']}></div>
      <MobileNavMenu className={classes['bottom-menu']} />
    </div>
  );
}
