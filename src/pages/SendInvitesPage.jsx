import classes from './SendInvitesPage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayerHomeProfile from '../components/PlayerHomeProfile';
import UserTextInput from '../components/UserTextInput';
import PageHeader from '../components/PageHeader';
import PrimaryActionButton from '../components/PrimaryActionButton';
import { setPool, storePoolAsync } from '../state/poolSlice';
import { setSessionId } from '../state/draftSlice';
import { inviteToPoolBulk } from '../services/poolService';
import { initDraft } from '../services/draftService';

export default function SendInvitesPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getToken } = useAuth();
  const { user } = useUser();
  const pool = useSelector((state) => state.pool);
  const draft = useSelector((state) => state.draft);
  const [emails, setEmails] = useState(() => {
    const savedEmails = localStorage.getItem(`player-emails-${pool.id}`);
    return savedEmails ? JSON.parse(savedEmails) : {};
  });

  console.log('Pool:', pool);
  console.log('Player Emails:', emails);

  useEffect(() => {
    localStorage.setItem(`player-emails-${pool.id}`, JSON.stringify(emails));
  }, [emails, pool.id]);

  const handleEmailChange = useCallback((playerId, email) => {
    setEmails((prev) => ({
      ...prev,
      [playerId]: email,
    }));
  }, []);

  const handleFinalize = async () => {
    try {
      const token = await getToken();

      // 1. Create the pool in the db
      const storedPool = await dispatch(storePoolAsync({ token })).unwrap();
      dispatch(setPool(storedPool));

      // 2. Prepare the invitations (array)
      const invitations = Object.entries(emails)
        .filter(([, email]) => email.trim() !== '')
        .map(([playerId, email]) => ({
          playerId,
          email: email.trim(),
        }));

      // 3. Send the invites if there are any
      if (invitations.length > 0) {
        await inviteToPoolBulk(storedPool.id, invitations, token);
      }

      // 4. Initialize the draft
      const session = await initDraft(storedPool.id, draft.settings, token);
      dispatch(setSessionId(session.id));

      // 5. Cleanup and navigate
      localStorage.setItem('activePoolId', pool.id);
      localStorage.setItem('userId', user.id);

      navigate('/pool-home');
    } catch (error) {
      console.error('Failed to finalize pool:', error);
    }
  };

  return (
    <div className={classes['page-container']}>
      <div className={classes['send-invites-content']}>
        <PageHeader
          headerText="Send Pool Invites"
          leftBtnText={<ArrowBackIcon />}
          path="/live-draft-settings"
        />
        <div className={classes['intro-section']}>
          <p>
            Enter the email address to send an invite to each player to join the
            pool.
          </p>
        </div>
        <div className={classes['player-list']}>
          {pool.players?.map((p) => (
            <div key={p.id} className={classes['player-invite-row']}>
              <div className={classes['player-profile-wrapper']}>
                <PlayerHomeProfile player={p} />
              </div>
              <div className={classes['input-wrapper']}>
                <UserTextInput
                  placeholderText="Enter email address"
                  className={classes['player-email-input']}
                  value={emails[p.id] || ''}
                  handleChange={(e) => handleEmailChange(p.id, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
        <PrimaryActionButton
          text="Create Pool & Send Invites"
          handleClick={handleFinalize}
        />
      </div>
    </div>
  );
}
