import { getApiBaseUrl } from '../config/config';
const BASE_URL = getApiBaseUrl();

export async function createPool(pool) {
  const payload = {
    id: pool.id,
    name: pool.name,
    league: pool.league,
    userId: pool.userId,
    players: pool.players.map((player) => ({
      id: player.id,
      name: player.name,
      teamName: player.teamName || '',
      teams: player.teams.map((team) => ({
        key: team.teamId,
      })),
    })),
  };

  try {
    console.log('Payload for createPool:', payload);

    const response = await fetch(`${BASE_URL}/complete_pools`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error details:', errorData);
      throw new Error('Failed to store pool');
    }

    // Wait for a moment to ensure the pool is stored in the database
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Verify that the pool was created by trying to fetch it
    const verifyResponse = await fetch(`${BASE_URL}/complete_pools/${pool.id}`);

    if (!verifyResponse.ok) {
      throw new Error('Pool creation verification failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error storing pool to DB:', error);
    throw error;
  }
}

export async function createPlayers(players) {
  const playerPromises = players.map(async (player) => {
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
  });
  return await Promise.all(playerPromises);
}

export async function createPoolPlayers(pool) {
  const playerPromises = pool.players.map(async (player) => {
    const payload = {
      pool_id: pool.id,
      pool_name: pool.name,
      player_id: player.id,
      player_team_name: player.teamName,
    };

    try {
      const response = await fetch(`${BASE_URL}/pool_players`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed: POST request to store pool players');
      }

      return await response.json();
    } catch (error) {
      console.error('Error with POST request to store pool players:', error);
      throw error;
    }
  });
  return await Promise.all(playerPromises);
}

export async function createPlayerTeams(pool) {
  const allPlayerTeamsPromises = pool.players.map(async (player) => {
    const playerTeamsPromises = player.teams.map(async (team) => {
      const payload = {
        player_id: player.id,
        team_key: team.teamId,
        pool_id: pool.id,
      };

      console.log('Payload for createPlayerTeams:', payload);

      try {
        const response = await fetch(`${BASE_URL}/player_teams`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Failed to POST player's teams");
        }

        return await response.json();
      } catch (error) {
        console.error("Error with POSt request to store player's teams");
        throw error;
      }
    });
    return await Promise.all(playerTeamsPromises);
  });
  return await Promise.all(allPlayerTeamsPromises);
}

export async function fetchPoolById(poolId) {
  try {
    const response = await fetch(`${BASE_URL}/pools/${poolId}`);

    // If the pool isn't in the database, return undefined
    if (response.status === 404) {
      console.log("Pool isn't stored in the database");
      return undefined;
    }

    if (!response.ok) {
      throw new Error('Failed to fetch pool: ', response.statusText);
    }

    const poolData = await response.json();
    return poolData;
  } catch (error) {
    console.error('Error fetching pool from database: ', error);
    throw error;
  }
}

export async function fetchPlayersInPool(poolId) {
  try {
    const response = await fetch(`${BASE_URL}/pool_players/${poolId}`);

    if (!response.ok)
      throw new Error('Failed to fetch players in pool: ', response.statusText);

    const poolPlayers = response.json();
    return poolPlayers;
  } catch (error) {
    console.error('Error fetching players in pool: ', error);
    throw error;
  }
}

export async function fetchCompletePool(poolId, token, options = {}) {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    initialDelay = 0,
    signal,
  } = options;

  // Wait for initial delay if specified
  if (initialDelay > 0) {
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(resolve, initialDelay);
      if (signal) {
        signal.addEventListener('abort', () => {
          clearTimeout(timeout);
          reject(new DOMException('Aborted', 'AbortError'));
        });
      }
    });
  }

  let lastError = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(
        `Attempt ${attempt}/${maxRetries} - Fetching pool ID: ${poolId}`,
      );

      const response = await fetch(`${BASE_URL}/complete_pools/${poolId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        signal,
      });

      if (!response.ok) {
        if (response.status === 404 && attempt < maxRetries) {
          console.log(
            `Pool not found on attempt ${attempt}, waiting ${retryDelay}ms...`,
          );
          await new Promise((resolve, reject) => {
            const timeout = setTimeout(resolve, retryDelay);
            if (signal) {
              signal.addEventListener('abort', () => {
                clearTimeout(timeout);
                reject(new DOMException('Aborted', 'AbortError'));
              });
            }
          });
          continue;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Successfully fetched pool data');
      return data;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw error;
      }
      lastError = error;
      if (attempt === maxRetries) {
        console.error('All retry attempts failed:', error);
        throw error;
      }
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(resolve, retryDelay);
        if (signal) {
          signal.addEventListener('abort', () => {
            clearTimeout(timeout);
            reject(new DOMException('Aborted', 'AbortError'));
          });
        }
      });
    }
  }

  throw lastError || new Error('Failed to fetch pool after all retries');
}

export async function fetchUserPools(userId) {
  try {
    const response = await fetch(`${BASE_URL}/pools/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok)
      throw new Error('Failed to fetch user pools: ', response.statusText);

    const userPools = await response.json();
    return userPools;
  } catch (error) {
    console.error('Error fetching user pools: ', error);
    throw error;
  }
}
