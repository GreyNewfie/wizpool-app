import classes from './TeamsList.module.css';
import PropTypes from 'prop-types';
import useApiData from '../utils/useApiData';
import SelectTeamSection from './SelectTeamSection';
import CircularIndeterminate from './Loading';
import { useState, useEffect, useCallback } from 'react';

const getAvailableTeams = (pool, teams, playerIndex) => {
  // Get a list of teams each other player has selected
  const selectedTeams = pool.players.flatMap((player) => {
    // If the index matches the current player's index don't include teams
    if (pool.players.indexOf(player) == playerIndex || !player.teams) {
      return [];
    }
    return player.teams;
  });
  // Remove those teams from the nbaTeamNames list
  const availableTeams = teams.filter(
    (team) =>
      !selectedTeams.some((selectedTeam) => selectedTeam.name === team.name),
  );
  return availableTeams;
};

export default function TeamsList(props) {
  const { getAllTeams, loading } = useApiData();
  const [allTeams, setAllTeams] = useState(null);
  const updatedPool = props.pool.clonePool();

  const fetchTeams = useCallback(async () => {
    try {
      const teams = await getAllTeams(props.pool.league);
      setAllTeams(teams);
    } catch (error) {
      console.log('Error fetching teams:', error);
    }
  }, [getAllTeams, props.pool.league]);

  useEffect(() => {
    if (!allTeams || allTeams.length === 0) {
      fetchTeams();
    }
  }, [allTeams, fetchTeams]);

  if (loading) return <CircularIndeterminate />;

  // Ensure teams are available before rendering
  if (!allTeams) return null;

  // Filter the available teams based on other players' selected teams
  const availableTeams = getAvailableTeams(
    updatedPool,
    allTeams,
    props.playerIndex,
  ).sort((team1, team2) => team1.city.localeCompare(team2.city));

  return (
    <div className={classes['teams-list']}>
      {availableTeams.map((team, teamIndex) => {
        return (
          <SelectTeamSection
            key={teamIndex}
            league={props.pool.league}
            team={team}
            teamName={team}
            playerIndex={props.playerIndex}
            updatedPool={updatedPool}
            setPool={props.setPool}
          />
        );
      })}
    </div>
  );
}

TeamsList.propTypes = {
  pool: PropTypes.object.isRequired,
  setPool: PropTypes.func.isRequired,
  playerIndex: PropTypes.number.isRequired,
};
