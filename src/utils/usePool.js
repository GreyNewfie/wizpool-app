import { useState, useEffect } from 'react';
import Pool from './Pool';
import { useNavigate } from 'react-router-dom';
import useStoredPools from './useStoredPools';
// import { create } from '@mui/material/styles/createTransitions';
import {
  createPool,
  createPlayers,
  createPoolPlayers,
  createPlayerTeams,
  fetchPoolById,
} from '../services/poolService';
import { v4 as uuidv4 } from 'uuid';

const getInitialPool = async () => {
  const activePoolId = localStorage.getItem('activePoolId');
  if (activePoolId) {
    // Check if pool is stored in the database, and if so return it
    const poolFromDb = await fetchPoolById(activePoolId);
    if (poolFromDb) {
      console.log('Pool is set from database');
      return new Pool(poolFromDb.name, [], poolFromDb.league, poolFromDb.id);
    }

    // Check if pool is stored in local storage, and if so return it
    const poolFromLocalStorage = JSON.parse(
      localStorage.getItem(`pool-${activePoolId}`),
    );
    if (poolFromLocalStorage) {
      console.log('Pool is set from local storage');
      const clonedPlayers = poolFromLocalStorage.players.map((player) => ({
        ...player,
      }));
      return new Pool(
        poolFromLocalStorage.poolName,
        clonedPlayers,
        poolFromLocalStorage.league,
        poolFromLocalStorage.id,
      );
    }
  }
  // Return blank pool if no pool is found
  return new Pool('', [], '');
};

const cleanPool = (pool) => {
  if (pool?.players?.length > 0) {
    const updatedPlayers = pool.players.filter(
      (player) => player.playerName.trim() !== '',
    );
    const cleanedPool = new Pool(
      pool.poolName,
      updatedPlayers,
      pool.league,
      pool.id,
    );
    return cleanedPool;
  }
  return pool;
};

export default function usePool() {
  const [pool, setPool] = useState();
  const [activePoolId, setActivePoolId] = useState(
    localStorage.getItem('activePoolId') || null,
  );
  const navigate = useNavigate();
  const { getNonActivePools } = useStoredPools();

  // Fetch initial pool data when the component mounts
  useEffect(() => {
    const initializePool = async () => {
      const initialPool = await getInitialPool();
      if (initialPool) {
        setPool(initialPool);
      }
    };

    initializePool();
  }, []);

  // Update localStorage when pool changes
  useEffect(() => {
    // Remove possible blank players before adding to localStorage
    if (activePoolId === pool?.id) {
      const cleanedPool = cleanPool(pool);
      localStorage.setItem(
        `pool-${cleanedPool.id}`,
        JSON.stringify(cleanedPool),
      );
    }
  }, [activePoolId, pool]);

  // Update active pool when it changes
  useEffect(() => {
    if (pool && activePoolId !== pool?.id && pool?.name !== '') {
      setActivePoolId(pool.id);
      localStorage.setItem('activePoolId', pool.id);
      console.log('Stored active pool has been updated');
    }
  }, [activePoolId, pool]);

  const createNewPool = () => {
    const newPool = new Pool('', [], '');
    setPool(newPool);
    setActivePoolId(newPool.id);
    localStorage.setItem(`pool-${newPool.id}`, JSON.stringify(newPool));
    localStorage.setItem('activePoolId', newPool.id);
    navigate('/choose-league');
  };

  const storePoolToDb = async () => {
    const poolToStore = pool.clonePool();
    try {
      const poolResponse = await createPool(poolToStore);
      console.log(poolResponse.message);
      const playerResponse = await createPlayers(poolToStore.players);
      console.log('Players stored:', playerResponse);
      const poolPlayersResponse = await createPoolPlayers(poolToStore);
      console.log('Pool players stored:', poolPlayersResponse);
      const playerTeamsResponse = await createPlayerTeams(poolToStore);
      console.log("All player's teams stored:", playerTeamsResponse);
    } catch (error) {
      console.error('Error storing pool and related data:', error);
    }
  };

  // const clearPoolFromLocal = (poolId) => {
  //   localStorage.removeItem(`pool-${poolId}`);
  // };

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
      id: uuidv4(),
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

  const updatePlayersTeamsRecords = async (leagueData) => {
    // Clone pool
    const updatedPool = pool.clonePool();
    // Check if apiData exists
    if (leagueData === null) {
      throw new Error('League data is not available');
    }

    // Iterate through players
    updatedPool.players.forEach((player) => {
      // Iterate through player's teams
      player.teams?.forEach((playerTeam) => {
        // Find team record
        const teamRecord = leagueData.find(
          (dataTeam) => dataTeam.name === `${playerTeam.name}`,
        );
        if (!teamRecord)
          return console.error(`Team record not found for ${playerTeam.name}`);

        // Update player's team's record
        playerTeam.wins = teamRecord.wins;
        playerTeam.losses = teamRecord.losses;
        playerTeam.division = teamRecord.division;
        playerTeam.conference = teamRecord.conference;
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
    sortPlayersByWins,
    updatePlayersTeamsRecords,
    storePoolToDb,
  };
}
