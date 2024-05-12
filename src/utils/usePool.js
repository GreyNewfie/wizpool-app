import { useState, useEffect } from 'react';
import Pool from './Pool';

function getInitialPool() {
  const storedPool = JSON.parse(localStorage.getItem('pool'));
  if (storedPool) return storedPool;
  if (!storedPool) return new Pool('', []);
}

export default function usePool() {
  const [pool, setPool] = useState(getInitialPool());
  const url =
    'https://api.sportsdata.io/v3/nba/scores/json/Standings/2024?key=b461640f8b2641b8bcaf42396b30ba9a';

  useEffect(() => {
    localStorage.setItem('pool', JSON.stringify(pool));
  }, [pool]);

  function getStoredPool() {
    const storedPool = JSON.parse(localStorage.getItem('pool'));
    return storedPool;
  }

  const fecthData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.status === 200) {
        console.log(data);
      } else {
        console.log('Server Error:', data.message);
      }
    } catch (error) {
      console.log('Fetch Erro:', error);
    }
  };

  fecthData();

  return {
    pool,
    setPool,
    getStoredPool,
  };
}
