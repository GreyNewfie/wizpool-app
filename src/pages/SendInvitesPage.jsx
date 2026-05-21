import { useSelector } from 'react-redux';
import { useState } from 'react';
import classes from './SendInvitesPage.module.css';
import PlayerHomeProfile from '../components/PlayerHomeProfile';
import UserTextInput from '../components/UserTextInput';
import PageHeader from '../components/PageHeader';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function SendInvitesPage() {
  const pool = useSelector((state) => state.pool);
  const [emails, setEmails] = useState({});

  console.log('Pool:', pool);

  const handleEmailChange = (playerId, email) => {
    setEmails((prev) => ({
      ...prev,
      [playerId]: email,
    }));
  };

  // iterate through the list to send out invites
  // create pool
  // initialize draft - store it in db

  return (
    <div className={classes['page-container']}>
      <div className={classes['send-invites-content']}>
        <PageHeader
          headerText="Send Pool Invites"
          leftBtnText={<ArrowBackIcon />}
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
      </div>
    </div>
  );
}
