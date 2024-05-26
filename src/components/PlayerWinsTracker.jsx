import classes from './PlayerWinsTracker.module.css';
import PropTypes from 'prop-types';

// Function to calculate the total wins for a player
const getPlayerWins = (player) => {
  if (!player?.nbaTeams) return 0;
  const wins = player.nbaTeams.reduce((wins, team) => {
    if (team && team.wins != null) {
      return wins + team.wins;
    }
    return wins;
  }, 0);
  return wins;
};

export default function PlayerWinsTracker({ player }) {
  const playerWins = getPlayerWins(player);

  return (
    <div className={classes['wins-tracker-container']}>
      <span className={classes['wins-tracker']}>{`${playerWins} Wins`}</span>
    </div>
  );
}

PlayerWinsTracker.propTypes = {
  player: PropTypes.object.isRequired,
};
