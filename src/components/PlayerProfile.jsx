import PropTypes from 'prop-types';
import PrimaryActionButton from './PrimayActionButton';
import classes from './PlayerProfile.module.css';
import addBasePath from '../utils/addBasePath';

export default function PlayerProfile({ player, index }) {
  const iconNum = index + 1;
  const hasTeams = player.teams?.length > 0;
  return (
    <div className={classes['player']}>
      <div className={classes['player-info']}>
        <img
          className={classes['team-icon']}
          src={addBasePath(`player-icon-${iconNum}-150x150.png`)}
          alt="team icon"
        />
        <div className={classes['profile-container']}>
          <h5
            className={`${classes['player-name']} ${classes['truncated-text']}`}
          >
            {player.playerName}
          </h5>
          <span
            className={`${classes['team-name']} ${classes['truncated-text']}`}
          >
            {player.teamName
              ? player.teamName
              : `${player.name}'s Awesome Team`}
          </span>
        </div>
      </div>
      {!hasTeams ? (
        <PrimaryActionButton
          text={`Assign Teams to ${player.playerName}`}
          path={`/choose-teams/${index}`}
        />
      ) : (
        <PrimaryActionButton
          text={`Edit Teams for ${player.playerName}`}
          path={`/choose-teams/${index}`}
          hasTeams={hasTeams}
        />
      )}{' '}
    </div>
  );
}

PlayerProfile.propTypes = {
  player: PropTypes.object,
  index: PropTypes.number,
};
