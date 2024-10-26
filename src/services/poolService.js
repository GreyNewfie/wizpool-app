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

export async function createPlayers(players) {
  const playerPromises = players.map(async (player) => {
    const payload = {
      id: player.id,
      name: player.playerName,
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
      pool_name: pool.poolName,
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

export async function fetchPooolById(poolId) {
  try {
    const response = await fetch(`${BASE_URL}/pools/${poolId}`);
    console.log('Response from fetchPoolById: ', response);
    return response;
  } catch (error) {
    console.error('Error fetching pool from database: ', error);
    return error;
  }
}
