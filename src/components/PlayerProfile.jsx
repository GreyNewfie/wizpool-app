import PropTypes from 'prop-types';
import PrimaryActionButton from './PrimaryActionButton';
import classes from './PlayerProfile.module.css';

export default function PlayerProfile({ player, index }) {
  const iconNum = index + 1;
  const hasTeams = player.teams?.length > 0;
  return (
    <div className={classes['player']}>
      <div className={classes['player-info']}>
        <img
          className={classes['team-icon']}
          src={`./player-icon-${iconNum}-150x150.png`}
          alt="team icon"
        />
        <div className={classes['profile-container']}>
          <h5
            className={`${classes['player-name']} ${classes['truncated-text']}`}
          >
            {player.name}
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
          text={`Assign Teams to ${player.name}`}
          path={`/choose-teams/${index}`}
        />
      ) : (
        <PrimaryActionButton
          text={`Edit Teams for ${player.name}`}
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
