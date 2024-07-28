import classes from './PlayerWinsTracker.module.css';
import PropTypes from 'prop-types';

// Function to calculate the total wins for a player
const getPlayerWins = (player) => {
  if (!player?.teams) return 0;
  const wins = player.teams.reduce((wins, team) => {
    if (team && team.wins != null) {
      return wins + team.wins;
    }
    return wins;
  }, 0);
  return wins;
};

export default function PlayerWinsTracker({ player, standing }) {
  const playerWins = getPlayerWins(player);

  return (
    <div className={classes['wins-tracker-container']}>
      <p className={classes['player-standing']}>{`${standing}`}</p>
      <p className={classes['player-wins']}>{`${playerWins} Wins`}</p>
    </div>
  );
}

PlayerWinsTracker.propTypes = {
  player: PropTypes.object.isRequired,
  standing: PropTypes.string,
};
