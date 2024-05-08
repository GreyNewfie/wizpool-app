import { useState, useEffect } from 'react';
import Pool from './Pool';

export default function usePool() {
  const [pool, setPool] = useState(new Pool('', []));

  useEffect(() => {
    localStorage.setItem('pool', JSON.stringify(pool));
  }, [pool]);

  return {
    pool,
    setPool,
  };
}
