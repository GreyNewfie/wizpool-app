import { getApiBaseUrl } from '../config/config';
const BASE_URL = getApiBaseUrl();

export async function createPool(pool, token) {
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
        key: team.key,
      })),
    })),
  };

  try {
    console.log('Payload for createPool:', payload);

    const response = await fetch(`${BASE_URL}/complete_pools`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
    const verifyResponse = await fetch(
      `${BASE_URL}/complete_pools/${pool.id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!verifyResponse.ok) {
      throw new Error('Pool creation verification failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error storing pool to DB:', error);
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
          Authorization: `Bearer ${token}`,
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

export async function fetchUserPools(userId, token) {
  try {
    const response = await fetch(`${BASE_URL}/pools/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Fetch response not OK:', errorText);
      throw new Error(`Failed to fetch user pools: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const responseText = await response.text();
      console.error('Unexpected response type:', responseText);
      throw new Error('Expected JSON response, but received different content type');
    }

    const userPools = await response.json();
    return userPools;
  } catch (error) {
    console.error('Error fetching user pools: ', error);
    throw error;
  }
}

export async function deletePool(poolId, token) {
  try {
    const response = await fetch(`${BASE_URL}/pools/${poolId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error('Failed to delete pool: ', errorText);
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting pool: ', error);
    throw error;
  }
}

export async function updatePool(pool, token) {
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
        key: team.key,
      })),
    })),
  };

  console.log('Pool to udpate payload: ', payload);

  try {
    const response = await fetch(`${BASE_URL}/complete_pools/${pool.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error('Failed to update pool: ', errorText);
    }
    return { success: true };
  } catch (error) {
    console.error('Error updating pool: ', error);
    throw error;
  }
}
