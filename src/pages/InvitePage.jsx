import classes from './InvitePage.module.css'
import DesktopNavHeader from '../components/DesktopNavHeader';
import useIsDesktop from '../utils/useIsDesktop';
import PageHeader from '../components/PageHeader';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TextField } from '@mui/material';
import { useSelector } from 'react-redux';

export default function InvitePage() {
  const pool = useSelector((state) => state.pool);
  const isDesktop = useIsDesktop();

  return (
    <div className={classes['page-container']}>
      {isDesktop && <DesktopNavHeader />}
      <div className={classes['invite-page']}>
        <PageHeader
          headerText="Invite Others to Your Pool"
          leftBtnText={<ArrowBackIcon />}
          path="/invite"
          poolName={pool.poolName}
        />
        <div className={classes['invite-contents']}>
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="john@noreply.com"
        />
        </div>
      </div>
    </div>
  );
}
