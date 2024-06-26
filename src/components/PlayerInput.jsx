import PropTypes from 'prop-types';
import UserTextInput from './UserTextInput';
import classes from './AddPlayer.module.css';

export default function PlayerInput(props) {
  return (
    <div className={classes['player-input']}>
      <UserTextInput
        id={`player-${props.index}-name`}
        name={`player-${props.index}-name`}
        value={props.player.playerName}
        placeholderText="Player's Name"
        handleChange={(e) => props.handleNameChange(e, props.index)}
      />
      <UserTextInput
        id={`player-${props.index}-team-name`}
        name={`player-${props.index}-team-name`}
        value={props.player.teamName}
        placeholderText="Player's Team Name (optional)"
        handleChange={(e) => props.handleTeamNameChange(e, props.index)}
      />
    </div>
  );
}

PlayerInput.propTypes = {
  player: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleTeamNameChange: PropTypes.func.isRequired,
};
