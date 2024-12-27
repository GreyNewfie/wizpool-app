import PropTypes from 'prop-types';
import classes from './DisplayTeams.module.css';

export default function DisplayTeams({ league, teams }) {
  return (
    <div className={classes['player-teams-container']}>
      {teams.map((team) => {
        const lowerCaseKey = team.key.toLowerCase();
        return (
          <div key={`team-${team.key}`} className={classes['player-team']}>
            <img
              className={classes['team-logo']}
              src={`./${league}-logos/${lowerCaseKey}-logo.png`}
              alt={`${team.city} ${team.name} ${league} team logo`}
            />
            <div className={classes['team-info']}>
              <h6>
                {team.city} {team.name}
              </h6>
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
