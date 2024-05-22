import classes from './PlayerWinsTracker.module.css';
import PropTypes from 'prop-types';
import useApiData from '../utils/useApiData';

const addPlayerTeamsData = (player, allNbaData) => {
  const updatedNbaTeams = player.nbaTeams.flatMap((teamName) => {
    // Get city from teamName
    const teamCity = teamName.split(' ')[0];
    // Get teamData based on teamCity
    const teamData = allNbaData.filter(
      (nbaTeamData) => nbaTeamData.city === teamCity,
    );
    // Retunr teamData
    return teamData;
  });

  console.log(updatedNbaTeams);
};

export default function PlayerWinsTracker({ player }) {
  const { getAllNbaTeamsData } = useApiData();
  const allNbaData = getAllNbaTeamsData();
  addPlayerTeamsData(player, allNbaData);

  return (
    <div className={classes['wins-tracker-container']}>
      <span className={classes['wins-tracker']}>10 Wins</span>
    </div>
  );
}

PlayerWinsTracker.propTypes = {
  player: PropTypes.object,
};
