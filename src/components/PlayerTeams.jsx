import PropTypes from 'prop-types';
import classes from './PlayerTeams.module.css';

export default function PlayerTeams({ player }) {
  return (
    <div className={classes['player-teams-container']}>
      <h4>Teams</h4>
      {player.nbaTeams.map((team) => {
        return (
          <div key={`team-${team.teamId}`} className={classes['player-team']}>
            <img
              className={classes['team-logo']}
              src={`${team.teamId}-logo`}
              alt={`${team.city} ${team.name} basketball team loto`}
            />
            <div className={classes['team-info']}>
              <h4>
                `${team.city} ${team.name}`
              </h4>
              <p>`${team.division} division`</p>
              <span className={classes['team-record']}>
                `${team.wins}-${team.losses}`
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

PlayerTeams.propTypes = {
  player: PropTypes.object,
};
