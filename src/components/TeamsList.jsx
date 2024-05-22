import classes from './TeamsList.module.css';
import PropTypes from 'prop-types';
import useApiData from '../utils/useApiData';
import SelectTeamSection from './SelectTeamSection';

const updateNbaTeams = (nbaTeams, playerIndex) => {
  // Get list of players
  const pool = JSON.parse(localStorage.getItem('pool'));
  // Get a list of teams each other player has selected
  const pickedTeams = pool.players.flatMap((player) => {
    // If the index matches the current player's index don't include teams
    if (pool.players.indexOf(player) == playerIndex) {
      return [];
    }
    return player.nbaTeams;
  });
  // Remove those teams from the nbaTeamNames list
  const updatedNbaTeams = nbaTeams.filter(
    (teamName) => !pickedTeams.includes(teamName),
  );
  return updatedNbaTeams;
};

export default function TeamsList({ playerIndex }) {
  const { getAllNbaTeams } = useApiData();
  const nbaTeams = getAllNbaTeams().sort(); //**** Why is nbaTeams value [] when next line gets executed? ****
  const updatedNbaTeams = updateNbaTeams(nbaTeams, playerIndex);

  return (
    <div className={classes['teams-list']}>
      {updatedNbaTeams.map((teamName, index) => {
        return (
          <SelectTeamSection
            key={index}
            index={index}
            teamName={teamName}
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
