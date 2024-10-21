const BASE_URL = 'http://localhost:3030/api';

export async function createPool(pool) {
  const payload = {
    id: pool.id,
    name: pool.poolName,
    league: pool.league,
  };

  try {
    const response = await fetch(`${BASE_URL}/pools`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to store pool');
    }

    return await response.json();
  } catch (error) {
    console.error('Error storing pool to DB:', error);
    throw error;
  }
}

export async function createPlayer(player) {
  const payload = {
    id: player.id,
    name: player.name,
  };

  try {
    const response = await fetch(`${BASE_URL}/players`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to store player');
    }

    return await response.json();
  } catch (error) {
    console.error('Error storing player to DB:', error);
    throw error;
  }
}
