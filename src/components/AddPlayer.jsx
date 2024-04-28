import PropTypes from 'prop-types';
import UserTextInput from './UserTextInput';

export default function AddPlayer({ props }) {
  return (
    <>
      <UserTextInput
        props={{
          id: `player-${props.playerId}-name`,
          name: `player-${props.playerId}-name`,
          placeholderText: "Player's Name",
          onChange: props.handlePlayerNameChange,
        }}
      />
      <UserTextInput
        props={{
          id: `player-${props.playerId}-team-name`,
          name: `player-${props.playerId}-team-name`,
          placeholderText: "Player's Team Name (optional)",
          onChange: props.handleTeamNameChange,
        }}
      />
    </>
  );
}

AddPlayer.propTypes = {
  props: PropTypes.object,
  playerId: PropTypes.number,
  handlePlayerNameChange: PropTypes.func,
  handleTeamNameChange: PropTypes.func,
};
