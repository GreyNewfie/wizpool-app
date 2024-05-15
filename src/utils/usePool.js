import { useState, useEffect } from 'react';
import Pool from './Pool';

const getInitialPool = () => {
  const storedPool = JSON.parse(localStorage.getItem('pool'));
  if (storedPool) return storedPool;
  if (!storedPool) return new Pool('', []);
};

const cleanPool = (pool) => {
  const updatedPlayers = pool.players.filter(
    (player) => player.playerName !== '',
  );
  const cleanedPool = new Pool(pool.poolName, updatedPlayers);
  return cleanedPool;
};

// let cachedData = {if cachedData else getData}

export default function usePool() {
  const [pool, setPool] = useState(getInitialPool());
  const url =
    'https://api.sportsdata.io/v3/nba/scores/json/Standings/2024?key=b461640f8b2641b8bcaf42396b30ba9a';

  useEffect(() => {
    // Remove possible blank player forms before adding to localStorage
    const cleanedPool = cleanPool(pool);
    localStorage.setItem('pool', JSON.stringify(cleanedPool));
  }, [pool]);

  const copyPool = () => {
    const copyOfPool = new Pool('', []);
    copyOfPool.updatePool(pool);
    return copyOfPool;
  };

  const fecthData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (response.status !== 200) {
        console.log('Server Error:', data.message);
      }
    } catch (error) {
      console.log('Fetch Error:', error);
    }
  };

  // fecthData();

  return {
    pool,
    setPool,
    copyPool,
  };
}
