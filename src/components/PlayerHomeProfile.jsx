import PropTypes from 'prop-types';
import classes from './PlayerHomeProfile.module.css';
import addBasePath from '../utils/addBasePath';

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
        src={addBasePath(`wizpool-trophy-icon-512x512.png`)}
        alt="team icon"
      />
      <div className={classes['player-info']}>
        <h6 className={classes['player-name']}>
          {props.player.playerName != ''
            ? props.player.playerName
            : 'New player'}
        </h6>
        <p className={classes['team-name']}>
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
  playerStanding: PropTypes.string,
};
