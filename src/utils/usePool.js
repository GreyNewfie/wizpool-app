import { useState, useEffect } from 'react';
import Pool from './Pool';

const getInitialPool = () => {
  const storedPool = JSON.parse(localStorage.getItem('pool'));
  if (storedPool) return new Pool(storedPool.poolName, storedPool.players);
  if (!storedPool) return new Pool('', []);
};

const cleanPool = (pool) => {
  const updatedPlayers = pool.players.filter(
    (player) => player.playerName !== '',
  );
  const cleanedPool = new Pool(pool.poolName, updatedPlayers);
  return cleanedPool;
};

export default function usePool() {
  const [pool, setPool] = useState(getInitialPool());

  useEffect(() => {
    // Remove possible blank player forms before adding to localStorage
    const cleanedPool = cleanPool(pool);
    console.log('Pool cleaned and passed to storage');
    localStorage.setItem('pool', JSON.stringify(cleanedPool));
  }, [pool]);

  const getPoolFromStorage = () => {
    const storedPool = JSON.parse(localStorage.getItem('pool'));
    return storedPool;
  };

  return {
    pool,
    setPool,
    getPoolFromStorage,
  };
}
