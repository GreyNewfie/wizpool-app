import PropTypes from 'prop-types';
import PrimaryActionButton from './PrimayActionButton';

export default function PlayerProfile({ player, index }) {
  const iconNum = index + 1;
  return (
    <div className="player">
      <div className="player-info">
        <img
          className="team-icon"
          src={`team-icon-${iconNum}-200x200.png`}
          alt="team icon"
        />
        <div>
          <h5>{player.playerName}</h5>
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
  index: PropTypes.number,
};
