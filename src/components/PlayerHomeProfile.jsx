import PropTypes from 'prop-types';
import classes from './PlayerHomeProfile.module.css';
import PlayerWinsTracker from './PlayerWinsTracket';

export default function PlayerHomeProfile(props) {
  const iconNum = props.playerIndex + 1;
  return (
    <div className={classes['player-home-profile']}>
      <div className="player-info">
        <img
          className="team-icon"
          src={`player-icon-${iconNum}-150x150.png`}
          alt="team icon"
        />
        <div>
          <h5>{props.player.playerName}</h5>
          <span className="profile-team-name">
            {props.player.teamName
              ? props.player.teamName
              : `${props.player.name}'s Awesome Team`}
          </span>
        </div>
        <PlayerWinsTracker player={props.player} />
      </div>
    </div>
  );
}

PlayerHomeProfile.propTypes = {
  player: PropTypes.object,
  playerIndex: PropTypes.number,
};
