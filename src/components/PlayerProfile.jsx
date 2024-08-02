import PropTypes from 'prop-types';
import PrimaryActionButton from './PrimayActionButton';
import classes from './PlayerProfile.module.css';
import addBasePath from '../utils/addBasePath';

export default function PlayerProfile({ player, index }) {
  const iconNum = index + 1;
  return (
    <div className={classes['player']}>
      <div className={classes['player-info']}>
        <img
          className={classes['team-icon']}
          src={addBasePath(`player-icon-${iconNum}-150x150.png`)}
          alt="team icon"
        />
        <div>
          <h5>{player.playerName}</h5>
          <span className={classes['profile-team-name']}>
            {player.teamName
              ? player.teamName
              : `${player.name}'s Awesome Team`}
          </span>
        </div>
      </div>
      <PrimaryActionButton
        text={`Assign Teams to ${player.playerName}`}
        path={`/choose-teams/${index}`}
      />
    </div>
  );
}

PlayerProfile.propTypes = {
  player: PropTypes.object,
  index: PropTypes.number,
};
