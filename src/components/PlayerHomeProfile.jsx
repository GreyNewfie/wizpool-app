import PropTypes from 'prop-types';
import classes from './PlayerHomeProfile.module.css';

export default function PlayerHomeProfile(props) {
  const iconNum = props.playerIndex + 1;
  return (
    <div className={classes['player-home-profile']}>
      <img
        className="team-icon"
        src={`player-icon-${iconNum}-150x150.png`}
        alt="team icon"
      />
      <div className={classes['player-info']}>
        <h5>{props.player.playerName}</h5>
        <p className={classes['profile-team-name']}>
          {props.player.teamName
            ? props.player.teamName
            : `${props.player.name}'s Awesome Team`}
        </p>
      </div>
    </div>
  );
}

PlayerHomeProfile.propTypes = {
  player: PropTypes.object,
  playerIndex: PropTypes.number,
};
