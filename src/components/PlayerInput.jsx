import PropTypes from 'prop-types';
import UserTextInput from './UserTextInput';
import classes from './PlayerInput.module.css';

export default function PlayerInput(props) {
  return (
    <div className={classes['player-input']}>
      <UserTextInput
        className={classes['text-input']}
        id={`player-${props.index}-name`}
        name={`player-${props.index}-name`}
        value={props.player.name}
        placeholderText="Player's Name"
        handleChange={(e) =>
          props.handleNameChange(e.target.value, props.index)
        }
      />
      <UserTextInput
        className={classes['text-input']}
        id={`player-${props.index}-team-name`}
        name={`player-${props.index}-team-name`}
        value={props.player.teamName}
        placeholderText="Player's Team Name (optional)"
        handleChange={(e) =>
          props.handleTeamNameChange(e.target.value, props.index)
        }
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
