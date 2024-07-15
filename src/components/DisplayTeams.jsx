import PropTypes from 'prop-types';
import classes from './DisplayTeams.module.css';

export default function DisplayTeams({ league, teams }) {
  return (
    <div className={classes['player-teams-container']}>
      {teams.map((team) => {
        const lowerCaseTeamId = team.teamId.toLowerCase();
        return (
          <div key={`team-${team.teamId}`} className={classes['player-team']}>
            <img
              className={classes['team-logo']}
              src={`/${league}-logos/${lowerCaseTeamId}-logo.png`}
              alt={`${team.city} ${team.name} ${league} team logo`}
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

DisplayTeams.propTypes = {
  teams: PropTypes.array.isRequired,
  league: PropTypes.string.isRequired,
};
