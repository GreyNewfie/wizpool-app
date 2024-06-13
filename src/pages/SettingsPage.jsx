import classes from './SettingsPage.module.css';
import PageHeader from '../components/PageHeader';
import MobileNavMenu from './MobileNavMenu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function SettingsPage() {
  return (
    <div className={classes['pool-settings']}>
      <PageHeader
        headerText="Settings"
        leftBtnText=<ArrowBackIcon />
        path="/pool-home"
      />
      <MobileNavMenu className={classes['bottom-menu']} />
    </div>
  );
}
