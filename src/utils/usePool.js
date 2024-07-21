import { useState, useEffect } from 'react';
import Pool from './Pool';

const getInitialPool = () => {
  const activePoolId = localStorage.getItem('activePoolId');
  if (activePoolId) {
    const storedPool = JSON.parse(localStorage.getItem(`pool-${activePoolId}`));
    const clonedPlayers = storedPool.players.map((player) => ({ ...player }));
    return new Pool(
      storedPool.poolName,
      clonedPlayers,
      storedPool.league,
      storedPool.id,
    );
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

  useEffect(() => {
    // Remove possible blank players before adding to localStorage
    const cleanedPool = cleanPool(pool);
    console.log('Pool cleaned and passed to storage');
    const id = activePoolId || cleanedPool.id;
    localStorage.setItem(`pool-${id}`, JSON.stringify(cleanedPool));

    // Update activePoolId in state and local storage if it's null
    if (activePoolId === null) {
      setActivePoolId(cleanedPool.id);
      localStorage.setItem('activePoolId', cleanedPool.id);
    }
  }, [pool, activePoolId]);

  const updateActivePoolId = (poolId) => {
    setActivePoolId(poolId);
    localStorage.setItem('activePool', poolId);
  };

  const handleSetLeague = (league) => {
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

  return {
    pool,
    setPool,
    handleSetLeague,
    handlePoolNameChange,
    handlePlayerNameChange,
    handleTeamNameChange,
    addBlankPlayer,
    deletePlayer,
    activePoolId,
    updateActivePoolId,
  };
}
