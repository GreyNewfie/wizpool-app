import { useState, useEffect } from 'react';
import Pool from './Pool';

const getInitialPool = () => {
  const storedPool = JSON.parse(localStorage.getItem('pool'));
  if (storedPool) {
    const clonedPlayers = storedPool.players.map((player) => ({ ...player }));
    return new Pool(storedPool.poolName, clonedPlayers, storedPool.league);
  }
  return new Pool('', [], '');
};

const cleanPool = (pool) => {
  const updatedPlayers = pool.players.filter(
    (player) => player.playerName !== '',
  );
  const cleanedPool = new Pool(pool.poolName, updatedPlayers, pool.league);
  return cleanedPool;
};

export default function usePool() {
  const [pool, setPool] = useState(getInitialPool());

  useEffect(() => {
    // Remove possible blank players before adding to localStorage
    const cleanedPool = cleanPool(pool);
    console.log('Pool cleaned and passed to storage');
    localStorage.setItem('pool', JSON.stringify(cleanedPool));
  }, [pool]);

  const getPoolFromStorage = () => {
    const storedPool = JSON.parse(localStorage.getItem('pool'));
    if (!storedPool) {
      return null;
    }
    const clonedPlayers = storedPool.players.map((player) => ({ ...player }));
    return new Pool(storedPool.poolName, clonedPlayers, storedPool.league);
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
    getPoolFromStorage,
    handleSetLeague,
    handlePoolNameChange,
    handlePlayerNameChange,
    handleTeamNameChange,
    addBlankPlayer,
    deletePlayer,
  };
}
