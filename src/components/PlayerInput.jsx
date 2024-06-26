import PropTypes from 'prop-types';
import UserTextInput from './UserTextInput';
import classes from './AddPlayer.module.css';
import usePool from '../utils/usePool';

export default function PlayerInput({ player }) {
  const { pool, setPool } = usePool();
  const playerIndex = pool.players.findIndex(
    (poolPlayer) => poolPlayer.playerName === player.playerName,
  );

  const handlePlayerNameChange = (e, index) => {
    const updatedPool = pool.clonePool();
    updatedPool.SetPlayerName(e.target.value, index);
    setPool(updatedPool);
  };

  const handleTeamNameChange = (e, index) => {
    const updatedPool = pool.clonePool();
    updatedPool.setTeamName(e.target.value, index);
    setPool(updatedPool);
  };

  return (
    <div className={classes['player-input']}>
      <UserTextInput
        id={`player-${playerIndex}-name`}
        name={`player-${playerIndex}-name`}
        value={player.playerName}
        placeholderText="Player's Name"
        handleChange={handlePlayerNameChange}
      />
      <UserTextInput
        id={`player-${playerIndex}-team-name`}
        name={`player-${playerIndex}-team-name`}
        value={player.teamName}
        placeholderText="Player's Team Name (optional)"
        handleChange={handleTeamNameChange}
      />
    </div>
  );
}

PlayerInput.propTypes = {
  player: PropTypes.object.isRequired,
};
