import { useState, useEffect } from 'react';
import Pool from './Pool';
import { useNavigate } from 'react-router-dom';
import useStoredPools from './useStoredPools';

const getInitialPool = () => {
  const activePoolId = localStorage.getItem('activePoolId');
  if (activePoolId) {
    const storedPool = JSON.parse(localStorage.getItem(`pool-${activePoolId}`));
    if (storedPool) {
      const clonedPlayers = storedPool.players.map((player) => ({ ...player }));
      return new Pool(
        storedPool.poolName,
        clonedPlayers,
        storedPool.league,
        storedPool.id,
      );
    }
  }
  return new Pool('', [], '');
};

const cleanPool = (pool) => {
  const updatedPlayers = pool.players.filter(
    (player) => player.playerName !== '',
  );
  const cleanedPool = new Pool(
    pool.poolName,
    updatedPlayers,
    pool.league,
    pool.id,
  );
  return cleanedPool;
};

export default function usePool() {
  const [pool, setPool] = useState(getInitialPool());
  const [activePoolId, setActivePoolId] = useState(
    localStorage.getItem('activePoolId') || null,
  );
  const navigate = useNavigate();
  const { getNonActivePools } = useStoredPools();

  // Update localStorage when pool changes
  useEffect(() => {
    // Remove possible blank players before adding to localStorage
    const cleanedPool = cleanPool(pool);
    localStorage.setItem(`pool-${cleanedPool.id}`, JSON.stringify(cleanedPool));
  }, [pool]);

  // Update active pool when it changes
  useEffect(() => {
    if (activePoolId !== pool.id) {
      setActivePoolId(pool.id);
      localStorage.setItem('activePoolId', pool.id);
      console.log('Stored active pool has been updated');
    }
  }, [activePoolId, pool.id]);

  const updateActivePoolId = (poolId) => {
    setActivePoolId(poolId);
    localStorage.setItem('activePool', poolId);
  };

  const createNewPool = () => {
    const newPool = new Pool('', [], '');
    setPool(newPool);
    setActivePoolId(newPool.id);
    localStorage.setItem(`pool-${newPool.id}`, JSON.stringify(newPool));
    localStorage.setItem('activePoolId', newPool.id);
    navigate('/choose-league');
  };

  const changePool = (poolId) => {
    const selectedPoolData = localStorage.getItem(`pool-${poolId}`);
    if (selectedPoolData) {
      const selectedPool = JSON.parse(selectedPoolData);
      setPool(
        new Pool(
          selectedPool.poolName,
          selectedPool.players,
          selectedPool.league,
          selectedPool.id,
        ),
      );
      setActivePoolId(poolId);
      localStorage.setItem('activePoolId', poolId);
      navigate('/pool-home');
    } else {
      console.error(`Pool with ID ${poolId} not found.`);
    }
  };

  const deletePool = (poolId) => {
    const poolToDelete = JSON.parse(localStorage.getItem(`pool-${poolId}`));
    const nonActivePools = getNonActivePools();

    if (!poolToDelete) {
      return console.error('Unable to get pool to delete');
    }
    // Check if active pool matches poolToDelete
    if (poolId === activePoolId) {
      // check if there are other pools to display, and if so change to the first option
      if (nonActivePools.length > 0) {
        changePool(nonActivePools[0].id);
        localStorage.removeItem(`pool-${poolId}`);
      } else {
        // If there are no other pools take the user to create a new pool
        createNewPool();
        localStorage.removeItem(`pool-${poolId}`);
      }
    } else {
      localStorage.removeItem(`pool-${poolId}`);
    }
    setPool(getInitialPool());
  };

  const setLeague = (league) => {
    const updatedPool = pool.clonePool();
    updatedPool.setLeague(league);
    setPool(updatedPool);
  };

  const handlePoolNameChange = (name) => {
    const updatedPool = pool.clonePool();
    updatedPool.setPoolName(name);
    setPool(updatedPool);
  };

  const handlePlayerNameChange = (name, index) => {
    const updatedPool = pool.clonePool();
    updatedPool.setPlayerName(name, index);
    setPool(updatedPool);
  };

  const handleTeamNameChange = (name, index) => {
    const updatedPool = pool.clonePool();
    updatedPool.setTeamName(name, index);
    setPool(updatedPool);
  };

  const addBlankPlayer = () => {
    const updatedPool = pool.clonePool();
    updatedPool.players.push({
      playerName: '',
      teamName: '',
      teams: [],
    });
    setPool(updatedPool);
  };

  const deletePlayer = (player) => {
    const updatedPool = pool.clonePool();
    updatedPool.players = updatedPool.players.filter(
      (poolPlayer) => poolPlayer.playerName !== player.playerName,
    );
    setPool(updatedPool);
  };

  const sortPlayersByWins = (players) => {
    const getTotalWins = (player) =>
      player.teams.reduce((totalWins, team) => totalWins + team.wins, 0);

    const unsortedPlayers = players.map((player) => {
      return {
        ...player,
        teams: player.teams || [],
      };
    });
    const sortedPlayers = unsortedPlayers.sort((player1, player2) => {
      const totalWinsPlayer1 = getTotalWins(player1);
      const totalWinsPlayer2 = getTotalWins(player2);

      return totalWinsPlayer2 - totalWinsPlayer1;
    });
    return sortedPlayers;
  };

  const updatePlayersTeamsRecords = () => {
    // Clone pool
    const updatedPool = pool.clonePool();
    const apiData = JSON.parse(localStorage.getItem('storedData'));
    // Check if apiData exists
    if (!apiData || apiData?.data.length === 0) {
      console.log('No API data found in local storage.');
      return;
    }
    // Iterate through players
    updatedPool.players.forEach((player) => {
      // Iterate through player's teams
      player.teams?.forEach((team) => {
        // Check league to determine how to reference team data
        if (pool.league === 'nfl') {
          // Find team record
          const teamRecord = apiData.data.find(
            (data) => data.Name === `${team.city} ${team.name}`,
          );
          if (teamRecord) {
            // Update player's team's record
            team.wins = teamRecord.Wins;
            team.losses = teamRecord.Losses;
            team.division = teamRecord.Division;
          }
        } else {
          // Find team record
          const teamRecord = apiData.data.find(
            (data) => data.Name === team.name,
          );
          if (teamRecord) {
            // Update player's team's record
            team.wins = teamRecord.Wins;
            team.losses = teamRecord.Losses;
            team.division = teamRecord.Division;
          }
        }
      });
    });
    // Update pool
    setPool(updatedPool);
  };

  return {
    pool,
    setPool,
    createNewPool,
    deletePool,
    changePool,
    setLeague,
    handlePoolNameChange,
    handlePlayerNameChange,
    handleTeamNameChange,
    addBlankPlayer,
    deletePlayer,
    activePoolId,
    updateActivePoolId,
    sortPlayersByWins,
    updatePlayersTeamsRecords,
  };
}
