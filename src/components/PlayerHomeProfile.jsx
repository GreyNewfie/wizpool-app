import PropTypes from 'prop-types';
import classes from './PlayerHomeProfile.module.css';

export default function PlayerHomeProfile(props) {
  const iconNum = props.playerIndex + 1;
  return (
    <div className={classes['player-home-profile']}>
      <img
        className={classes['team-icon']}
        src={`player-icon-${iconNum}-150x150.png`}
        alt="team icon"
      />
      <div className={classes['player-info']}>
        <h4>
          {props.player.playerName != ''
            ? props.player.playerName
            : 'New player'}
        </h4>
        <p className={classes['profile-team-name']}>
          {props.player.teamName
            ? props.player.teamName
            : props.player.playerName != ''
              ? `${props.player.playerName}'s Awesome Team`
              : `New team`}
        </p>
      </div>
    </div>
  );
}

PlayerHomeProfile.propTypes = {
  player: PropTypes.object,
  playerIndex: PropTypes.number,
};
