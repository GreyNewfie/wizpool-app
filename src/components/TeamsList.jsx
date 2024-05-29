import classes from './TeamsList.module.css';
import PropTypes from 'prop-types';
import useApiData from '../utils/useApiData';
import SelectTeamSection from './SelectTeamSection';
import CircularIndeterminate from './Loading';

const getAvailableNbaTeams = (nbaTeams, playerIndex) => {
  // Get list of players
  const pool = JSON.parse(localStorage.getItem('pool'));
  // Get a list of teams each other player has selected
  const selectedTeams = pool.players.flatMap((player) => {
    // If the index matches the current player's index don't include teams
    if (pool.players.indexOf(player) == playerIndex || !player.nbaTeams) {
      return [];
    }
    return player.nbaTeams;
  });
  // Remove those teams from the nbaTeamNames list
  const availableNbaTeams = nbaTeams.filter(
    (team) =>
      !selectedTeams.some((selectedTeam) => selectedTeam.name === team.name),
  );
  return availableNbaTeams;
};

export default function TeamsList({ playerIndex }) {
  const { getAllNbaTeamsData, loading } = useApiData();

  if (loading) return <CircularIndeterminate />;

  const nbaTeams = getAllNbaTeamsData();
  const availableNbaTeams = getAvailableNbaTeams(nbaTeams, playerIndex).sort(
    (team1, team2) => team1.city.localeCompare(team2.city),
  );

  return (
    <div className={classes['teams-list']}>
      {availableNbaTeams.map((team, teamIndex) => {
        return (
          <SelectTeamSection
            key={teamIndex}
            team={team}
            teamName={team}
            playerIndex={playerIndex}
          />
        );
      })}
    </div>
  );
}

TeamsList.propTypes = {
  playerIndex: PropTypes.string,
};
