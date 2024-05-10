import { useState, useEffect } from 'react';
import Pool from './Pool';

function getInitialPool() {
  const storedPool = JSON.parse(localStorage.getItem('pool'));
  if (storedPool) return storedPool;
  if (!storedPool) return new Pool('', []);
}

export default function usePool() {
  const [pool, setPool] = useState(getInitialPool());

  useEffect(() => {
    localStorage.setItem('pool', JSON.stringify(pool));
  }, [pool]);

  return {
    pool,
    setPool,
  };
}
