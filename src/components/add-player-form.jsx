import PropTypes from 'prop-types';

export default function AddPlayer({ playerId }) {
  return (
    <form className="add-player">
      <input
        type="text"
        id={`player-${playerId}-name`}
        name="player-1-name"
        className="text-input"
        placeholder="Player's Name"
      />
      <input
        type="text"
        id={`player-${playerId}-team-name`}
        name="player-1-team-name"
        className="text-input"
        placeholder="Player's Team Name (optional)"
      />
    </form>
  );
}

AddPlayer.propTypes = {
  playerId: PropTypes.number,
};
