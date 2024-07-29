import PropTypes from 'prop-types';
import classes from './PlayerHomeProfile.module.css';

export default function PlayerHomeProfile(props) {
  const iconNum = props.playerIndex + 1;
  return (
    <div className={classes['player-home-profile']}>
      <img
        className={
          props.playerStanding === '1st'
            ? classes['first-place-icon']
            : props.playerStanding === '2nd'
              ? classes['second-place-icon']
              : props.playerStanding === '3rd'
                ? classes['third-place-icon']
                : classes['team-icon']
        }
        src={`wizpool-trophy-icon-512x512.png`}
        alt="team icon"
      />
      <div className={classes['player-info']}>
        <h6>
          {props.player.playerName != ''
            ? props.player.playerName
            : 'New player'}
        </h6>
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
  playerStanding: PropTypes.string,
};
