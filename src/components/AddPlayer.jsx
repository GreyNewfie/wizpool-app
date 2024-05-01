import PropTypes from 'prop-types';
import UserTextInput from './UserTextInput';

export default function AddPlayer({
  playerId,
  handlePlayerNameChange,
  handleTeamNameChange,
}) {
  return (
    <>
      <UserTextInput
        id={`player-${playerId}-name`}
        name={`player-${playerId}-name`}
        placeholderText="Player's Name"
        handleChange={handlePlayerNameChange}
      />
      <UserTextInput
        props={{
          id: `player-${playerId}-team-name`,
          name: `player-${playerId}-team-name`,
          placeholderText: "Player's Team Name (optional)",
          handleChange: handleTeamNameChange,
        }}
      />
    </>
  );
}

AddPlayer.propTypes = {
  props: PropTypes.object,
  playerId: PropTypes.number.isRequired,
  handlePlayerNameChange: PropTypes.func.isRequired,
  handleTeamNameChange: PropTypes.func.isRequired,
};
