import classes from './PlayerWinsTracker.module.css';
import PropTypes from 'prop-types';
import useApiData from '../utils/useApiData';
import usePool from '../utils/usePool';
import Pool from '../utils/Pool';
import { useEffect } from 'react';

const addPlayerTeamsData = (player, allNbaData) => {
  if (allNbaData.length === 0) return;
  const updatedPlayer = { ...player };
  const updatedNbaTeams = player.nbaTeams.flatMap((teamName) => {
    // Check if teamId has been added (means data has already been added)
    if (teamName.teamId) return;
    // Get city from teamName
    const teamCity = teamName?.split(' ')[0];
    // Get teamData based on teamCity
    const teamData = allNbaData.filter(
      (nbaTeamData) => nbaTeamData.city === teamCity,
    );
    // Return teamData
    return teamData;
  });

  updatedPlayer.nbaTeams = updatedNbaTeams;
  return updatedPlayer;
};

const addUpdatedPlayerToPool = (updatedPlayer, pool) => {
  const updatedPool = new Pool(pool.poolName, pool.players);
  const playerIndex = updatedPool.players.findIndex(
    (poolPlayer) => poolPlayer.playerName === updatedPlayer?.playerName,
  );
  updatedPool.players[playerIndex] = updatedPlayer;
  return updatedPool;
};

export default function PlayerWinsTracker({ player }) {
  const { getAllNbaTeamsData } = useApiData();
  const { pool, setPool } = usePool();

  const allNbaData = getAllNbaTeamsData();
  const updatedPlayer = addPlayerTeamsData(player, allNbaData);
  const updatedPool = addUpdatedPlayerToPool(updatedPlayer, pool);

  // useEffect(() => {
  //   setPool(updatedPool);
  //   console.log('useEffect set pool to updatedPool: ', updatedPool);
  // }, []);
  const playerWins = 12;

  return (
    <div className={classes['wins-tracker-container']}>
      <span className={classes['wins-tracker']}>{`${playerWins} Wins`}</span>
    </div>
  );
}

PlayerWinsTracker.propTypes = {
  player: PropTypes.object,
};
