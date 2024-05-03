import PropTypes from 'prop-types';
import PrimaryActionButton from './PrimayActionButton';

export default function PlayerProfile({ player }) {
  return (
    <div className="player">
      <div className="player-info">
        <img className="team-icon" src={player.icon} alt="team icon" />
        <div>
          <h5>{player.name}</h5>
          <span className="profile-team-name">
            {player.teamName
              ? player.teamName
              : `${player.name}'s Awesome Team`}
          </span>
        </div>
      </div>
      <PrimaryActionButton
        text={`Assign Teams to ${player.name}`}
        handleClick={() => console.log(player.name)}
      />
    </div>
  );
}

PlayerProfile.propTypes = {
  player: PropTypes.object,
};
