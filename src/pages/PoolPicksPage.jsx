import classes from './PoolPicksPage.module.css';
import PageHeader from '../components/PageHeader';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MobileNavMenu from './MobileNavMenu';

export default function PoolPicksPage() {
  return (
    <div className={classes['pool-picks']}>
      <PageHeader
        headerText="Picked Teams"
        leftBtnText=<ArrowBackIcon />
        path="/pool-home"
      />
      <div className={classes['picks-container']}></div>
      <MobileNavMenu className={classes['bottom-menu']} />
    </div>
  );
}
