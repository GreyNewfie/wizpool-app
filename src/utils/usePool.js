import { useState, useEffect } from 'react';
import Pool from './Pool';

function getInitialPool() {
  const storedPool = JSON.parse(localStorage.getItem('pool'));
  if (storedPool) return storedPool;
  if (!storedPool) return new Pool('', []);
}

// let cachedData = {if cachedData else getData}

export default function usePool() {
  const [pool, setPool] = useState(getInitialPool());
  const url =
    'https://api.sportsdata.io/v3/nba/scores/json/Standings/2024?key=b461640f8b2641b8bcaf42396b30ba9a';

  const setPoolInLocalStorage = () => {
    removeBlankPlayers();
    localStorage.setItem('pool', JSON.stringify(pool));
  };

  const removeBlankPlayers = () => {
    const updatedPool = copyPool(pool);
    const updatedPlayers = updatedPool.players.filter(
      (player) => player.playerName !== '',
    );
    updatedPool.updatePlayers(updatedPlayers);
    setPool(updatedPool);
  };

  const copyPool = () => {
    const copyOfPool = new Pool('', []);
    copyOfPool.updatePool(pool);
    return copyOfPool;
  };

  function getStoredPool() {
    const storedPool = JSON.parse(localStorage.getItem('pool'));
    return storedPool;
  }

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
    getStoredPool,
    setPoolInLocalStorage,
  };
}
