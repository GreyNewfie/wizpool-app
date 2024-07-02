import classes from './ReassignTeamsPage.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PageHeader from '../components/PageHeader';
import MobileNavMenu from './MobileNavMenu';
import PlayerHomeProfile from '../components/PlayerHomeProfile';
import usePool from '../utils/usePool';
import { useState } from 'react';

export default function ReassignTeamsPage() {
  const { pool, setPool } = usePool();
  const [playerToEdit, setPlayerToEdit] = useState(null);

  const togglePlayerToEdit = (index) => {
    setPlayerToEdit((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className={classes['reassign-teams']}>
      <PageHeader
        headerText="Rassign Teams"
        leftBtnText=<ArrowBackIcon />
        path="/pool-settings"
      />
      <div className={classes['players-container']}>
        {pool.players.map((player, index) => {
          return (
            <div key={index} className={classes['player']}>
              <PlayerHomeProfile player={player} playerIndex={index} />
              {playerToEdit !== index && (
                <button className={classes['edit-btn']}>Edit</button>
              )}
            </div>
          );
        })}
      </div>
      <MobileNavMenu className={classes['bottom-menu']} />
    </div>
  );
}
