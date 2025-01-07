import classes from './InvitePage.module.css';
import DesktopNavHeader from '../components/DesktopNavHeader';
import useIsDesktop from '../utils/useIsDesktop';
import PageHeader from '../components/PageHeader';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoadingOverlay from '../components/LoadingOverlay';
import { Button, Snackbar, TextField, Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { inviteToPool } from '../services/poolService';
import { useAuth } from '@clerk/clerk-react';

export default function InvitePage() {
  const pool = useSelector((state) => state.pool);
  const isDesktop = useIsDesktop();
  const { getToken } = useAuth();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('A valid email is required');
      return;
    }

    setIsLoading(true);
    try {
      // Add invite logic here
      const token = await getToken();
      await inviteToPool(pool.id, email, token);
      console.log('Sending invite to:', email);
      setShowSuccess(true);
      setEmail('');
      setEmailError('');
    } catch (error) {
      if (error.message.includes('invitation for this email already exists')) {
        setEmailError('An invitation has already been sent to this email');
      } else if (error.message.includes('Failed to create invitation')) {
        setEmailError(
          'Unable to send invite at this time. Please try again later.',
        );
      } else {
        setEmailError('Something went wrong. Please try again.');
      }
      console.error('Failed to send invite:', error);
      console.error('Failed to send invite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes['page-container']}>
      {isLoading && <LoadingOverlay />}
      {isDesktop && <DesktopNavHeader />}
      <div className={classes['invite-page']}>
        <PageHeader
          headerText="Send Pool Invites"
          leftBtnText={<ArrowBackIcon />}
          path="/invite"
          poolName={pool.poolName}
        />
        <div className={classes['invite-contents']}>
          <p style={{ marginBottom: '1rem' }}>
            Invite others to view your pool. Simply send an email invite to send
            a link to sign up and be able to view your pool.
          </p>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              error={emailError}
              helperText={Boolean(emailError)}
              placeholder="Enter email address"
              sx={{ color: 'white' }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 2 }}
            >
              Send Invite
            </Button>
          </form>
        </div>
      </div>
      <Snackbar
        open={showSuccess}
        autoHideDuration={5000}
        onClose={() => setShowSuccess(false)}
        message="Invite sent successfully!"
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      >  <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
    Invite sent successfully!
  </Alert></Snackbar>
    </div>
  );
}
