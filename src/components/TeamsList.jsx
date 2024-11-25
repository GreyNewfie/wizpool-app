import classes from './TeamsList.module.css';
import PropTypes from 'prop-types';
import useApiData from '../utils/useApiData';
import SelectTeamSection from './SelectTeamSection';
import CircularIndeterminate from './Loading';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPool, setTeamName } from '../state/poolSlice';

const getUnassignedTeams = (players, teams, playerIndex) => {
  // Get a list of teams each other player has selected
  const selectedTeams = players.flatMap((player, index) => {
    // If the index matches the current player's index don't include teams
    if (index === playerIndex || !player.teams) {
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

export default function TeamsList({ playerIndex }) {
  const dispatch = useDispatch();
  const { getAllTeams, loading } = useApiData();
  const pool = useSelector((state) => state.pool);
  const [allTeams, setAllTeams] = useState(undefined);

  useEffect(() => {
    const fetchTeams = async () => {
      const teams = await getAllTeams(pool.league);
      setAllTeams(teams || []);
    };

    if (!allTeams?.length) {
      fetchTeams();
    }
  }, [getAllTeams, pool.league]);

  if (loading) return <CircularIndeterminate />;

  // Ensure teams are available before rendering
  if (!allTeams?.length) return null;

  // Filter the available teams based on other players' selected teams
  const availableTeams = getUnassignedTeams(
    pool.players,
    allTeams,
    playerIndex,
  ).sort((team1, team2) => team1.city.localeCompare(team2.city));

  return (
    <div className={classes['teams-list']}>
      {availableTeams.map((team, index) => {
        return (
          <SelectTeamSection
            key={index}
            team={team}
            playerIndex={playerIndex}
            setTeam={(teamName) =>
              dispatch(setTeamName({ teamName, playerIndex }))
            }
          />
        );
      })}
    </div>
  );
}

TeamsList.propTypes = {
  playerIndex: PropTypes.number,
};
