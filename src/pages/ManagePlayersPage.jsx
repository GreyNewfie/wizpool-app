import classes from './ManagePlayersPage.module.css';
import PageHeader from '../components/PageHeader';
import MobileNavMenu from './MobileNavMenu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayerHomeProfile from '../components/PlayerHomeProfile';
import usePool from '../utils/usePool';
import { useState } from 'react';
import PlayerInput from '../components/PlayerInput';
import PrimaryActionButton from '../components/PrimayActionButton';

export default function ManagePlayersPage() {
  const { pool, setPool } = usePool();
  const [playerToEdit, setPlayerToEdit] = useState(null);

  const togglePlayerToEdit = (index) => {
    setPlayerToEdit((prevIndex) => (prevIndex === index ? null : index));
  };

  const handlePlayerNameChange = (name, index) => {
    const updatedPool = pool.clonePool();
    updatedPool.setPlayerName(name, index);
    setPool(updatedPool);
  };

  const handleTeamNameChange = (name, index) => {
    const updatedPool = pool.clonePool();
    updatedPool.setTeamName(name, index);
    setPool(updatedPool);
  };

  function addBlankPlayer() {
    const updatedPool = pool.clonePool();
    updatedPool.players.push({
      playerName: '',
      teamName: '',
      teams: [],
    });
    setPool(updatedPool);
  }

  const deletePlayer = (player) => {
    const updatedPool = pool.clonePool();
    updatedPool.players = updatedPool.players.filter(
      (poolPlayer) => poolPlayer.playerName !== player.playerName,
    );
    setPool(updatedPool);
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
            {playerToEdit === index && (
              <PlayerInput
                player={player}
                index={index}
                handleNameChange={handlePlayerNameChange}
                handleTeamNameChange={handleTeamNameChange}
              />
            )}
            {playerToEdit === index ? (
              <div className={classes['edit-player-btns']}>
                <button
                  className={classes['edit-btn']}
                  onClick={() => togglePlayerToEdit(index)}
                >
                  Save
                </button>
                <button
                  className={classes['delete-btn']}
                  onClick={() => deletePlayer(player)}
                >
                  Delete
                </button>
              </div>
            ) : (
              <button
                className={classes['edit-btn']}
                onClick={() => togglePlayerToEdit(index)}
              >
                Edit
              </button>
            )}
          </div>
        ))}
        <PrimaryActionButton
          text="Add another player"
          handleClick={addBlankPlayer}
          optionalSymbol="+"
        />
      </div>

      <MobileNavMenu className={classes['bottom-menu']} />
    </div>
  );
}
