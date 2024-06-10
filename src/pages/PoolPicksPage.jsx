import classes from './PoolPicksPage.module.css';
import PageHeader from '../components/PageHeader';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function PoolPicksPage() {
  return (
    <div className={classes['pool-picks']}>
      <PageHeader
        headerText="Picked Teams"
        leftBtnText=<ArrowBackIcon />
        path="/pool-home"
      />
    </div>
  );
}
