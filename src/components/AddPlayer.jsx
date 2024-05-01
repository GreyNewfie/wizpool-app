import PropTypes from 'prop-types';
import UserTextInput from './UserTextInput';

export default function AddPlayer(props) {
  return (
    <>
      <UserTextInput
        id={`player-${props.playerId}-name`}
        name={`player-${props.playerId}-name`}
        placeholderText="Player's Name"
        handleChange={props.handlePlayerNameChange}
      />
      <UserTextInput
        id={`player-${props.playerId}-team-name`}
        name={`player-${props.playerId}-team-name`}
        placeholderText="Player's Team Name (optional)"
        handleChange={props.handleTeamNameChange}
      />
    </>
  );
}

AddPlayer.propTypes = {
  playerId: PropTypes.number.isRequired,
  handlePlayerNameChange: PropTypes.func.isRequired,
  handleTeamNameChange: PropTypes.func.isRequired,
};
