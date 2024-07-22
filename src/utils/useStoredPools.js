import { useEffect, useState } from 'react';

export default function useStoredPools() {
  const [pools, setPools] = useState([]);

  useEffect(() => {
    function getAllPools() {
      const pools = [];
      const keys = Object.keys(localStorage);

      keys.forEach((key) => {
        if (key.startsWith('pool-')) {
          const poolData = localStorage.getItem(key);
          try {
            const pool = JSON.parse(poolData);
            pools.push(pool);
          } catch (e) {
            console.error(`Error parsing data for key ${key}:`, e);
          }
        }
      });
      return pools;
    }

    setPools(getAllPools);
  }, []);

  const getNonActivePools = () => {
    const activePoolId = localStorage.getItem('activePoolId');
    const nonActivePools = pools.filter((pool) => pool.id !== activePoolId);
    return nonActivePools;
  };

  return {
    pools,
    getNonActivePools,
  };
}
