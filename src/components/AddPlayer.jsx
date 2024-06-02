import PropTypes from 'prop-types';
import UserTextInput from './UserTextInput';
import classes from './AddPlayer.module.css';

export default function AddPlayer(props) {
  return (
    <div className={classes['player-input']}>
      <UserTextInput
        id={`player-${props.playerId}-name`}
        name={`player-${props.playerId}-name`}
        value={props.playerName}
        placeholderText="Player's Name"
        handleChange={props.handlePlayerNameChange}
      />
      <UserTextInput
        id={`player-${props.playerId}-team-name`}
        name={`player-${props.playerId}-team-name`}
        value={props.teamName}
        placeholderText="Player's Team Name (optional)"
        handleChange={props.handleTeamNameChange}
      />
    </div>
  );
}

AddPlayer.propTypes = {
  playerId: PropTypes.number.isRequired,
  playerName: PropTypes.string.isRequired,
  teamName: PropTypes.string.isRequired,
  handlePlayerNameChange: PropTypes.func.isRequired,
  handleTeamNameChange: PropTypes.func.isRequired,
};
