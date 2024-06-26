import classes from './ManagePlayersPage.module.css';
import PageHeader from '../components/PageHeader';
import MobileNavMenu from './MobileNavMenu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayerHomeProfile from '../components/PlayerHomeProfile';
import usePool from '../utils/usePool';
import { useState } from 'react';
import PlayerInput from '../components/PlayerInput';

export default function ManageTeamsPage() {
  const { pool } = usePool();
  const [playerToEdit, setPlayerToEdit] = useState(null);

  const togglePlayerToEdit = (index) => {
    setPlayerToEdit((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className={classes['manage-players']}>
      <PageHeader
        headerText="Manage Players"
        leftBtnText=<ArrowBackIcon />
        path="/pool-settings"
      />
      <div className={classes['players-container']}>
        {pool.players.map((player, index) => (
          <div key={index} className={classes['player']}>
            {playerToEdit !== index && (
              <PlayerHomeProfile player={player} playerIndex={index} />
            )}
            {playerToEdit === index && <PlayerInput player={player} />}
            <button
              className={classes['edit-btn']}
              onClick={() => togglePlayerToEdit(index)}
            >
              {playerToEdit === index ? 'Save' : 'Edit'}
            </button>
          </div>
        ))}
      </div>
      <MobileNavMenu className={classes['bottom-menu']} />
    </div>
  );
}
