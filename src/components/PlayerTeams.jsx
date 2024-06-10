import PropTypes from 'prop-types';
import classes from './PlayerTeams.module.css';

export default function PlayerTeams({ player }) {
  return (
    <div className={classes['player-teams-container']}>
      <h4>Teams</h4>
      {player.nbaTeams.map((team) => {
        const lowerCaseTeamId = team.teamId.toLowerCase();
        return (
          <div key={`team-${team.teamId}`} className={classes['player-team']}>
            <img
              className={classes['team-logo']}
              src={`/nba-logos/${lowerCaseTeamId}-logo.png`}
              alt={`${team.city} ${team.name} basketball team logo`}
            />
            <div className={classes['team-info']}>
              <h5>
                {team.city} {team.name}
              </h5>
              <p>{team.division} division</p>
              <span className={classes['team-record']}>
                {team.wins}-{team.losses}
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