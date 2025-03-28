import PropTypes from 'prop-types';
import classes from './PlayerHomeProfile.module.css';

export default function PlayerHomeProfile(props) {
  return (
    <div className={classes['player-home-profile']}>
      <img
        className={
          props.playerStanding === '1st' || props.playerStanding === 'T-1st'
            ? classes['first-place-icon']
            : props.playerStanding === '2nd' || props.playerStanding === 'T-2nd'
              ? classes['second-place-icon']
              : props.playerStanding === '3rd' ||
                  props.playerStanding === 'T-3rd'
                ? classes['third-place-icon']
                : classes['team-icon']
        }
        src="./wizpool-trophy-icon-512x512.png"
        alt="team profile image"
      />
      <div className={classes['player-info']}>
        <h6 className={classes['player-name']}>
          {props.player.name != '' ? props.player.name : 'New player'}
        </h6>
        <p className={classes['team-name']}>
          {props.player.teamName
            ? props.player.teamName
            : props.player.name != ''
              ? `${props.player.name}'s Awesome Team`
              : `New team`}
        </p>
      </div>
    </div>
  );
}

PlayerHomeProfile.propTypes = {
  player: PropTypes.object,
  playerStanding: PropTypes.string,
};
