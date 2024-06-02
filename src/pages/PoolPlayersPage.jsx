import PageHeader from '../components/PageHeader';
import classes from './PoolPlayersPage.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function PoolPlayersPage() {
  return (
    <div className={classes['players-teams-container']}>
      <PageHeader
        headerText="Player's Teams"
        path="/pool-home"
        leftBtnText=<ArrowBackIcon />
      />
    </div>
  );
}
