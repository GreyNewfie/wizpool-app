import { useEffect, useState } from 'react';

export default function useStoredPools() {
  const [storedPools, setStoredPools] = useState([]);

  const getAllPools = () => {
    const pools = [];
    const keys = Object.keys(localStorage);

    keys.forEach((key) => {
      if (key.startsWith('pool-')) {
        const poolData = localStorage.getItem(key);
        try {
          const pool = JSON.parse(poolData);
          // Q1: Should this be new Pool(pool.poolName, pool.players, pool.league, pool.id)?
          pools.push(pool);
        } catch (e) {
          console.error(`Error parsing data for key ${key}:`, e);
        }
      }
    });
    return pools;
  };

  useEffect(() => {
    setStoredPools(getAllPools);
  }, []);

  const refreshStoredPools = () => {
    setStoredPools(getAllPools());
  };

  const getNonActivePools = () => {
    // Q2: activePoolId is a state variable in usePool, should this be using that state variable?
    // Q3: How would using a state variable from usePool impact this hook?
    const activePoolId = localStorage.getItem('activePoolId');
    const nonActivePools = storedPools.filter(
      (pool) => pool.id !== activePoolId,
    );
    return nonActivePools;
  };

  return {
    storedPools,
    getNonActivePools,
    refreshStoredPools,
  };
}
