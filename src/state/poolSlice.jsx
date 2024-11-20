import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { createPool, fetchCompletePool } from '../services/poolService';

const initialState = {
  id: uuid(),
  league: '',
  players: [
    {
      id: uuid(),
      name: '',
      teamName: '',
      teams: [],
    },
  ],
  name: '',
  userId: '',
};

export const storePoolAsync = createAsyncThunk(
  'pool/storePoolAsync',
  async (_, { getState }) => {
    const pool = getState().pool;

    try {
      // Create the pool
      const result = await createPool(pool);
      if (!result) {
        throw new Error('Failed to create pool');
      }

      // Wait a moment for the database to complete the transaction
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Fetch the pool with retry options
      const fetchedPool = await fetchCompletePool(pool.id, {
        maxRetries: 3,
        retryDelay: 1000,
        initialDelay: 500,
      });

      if (!fetchedPool) {
        throw new Error('Failed to verify pool creation');
      }

      return fetchedPool;
    } catch (error) {
      console.error('Error in pool creation process:', error);
      throw error;
    }
  },
);

export const fetchPoolByIdAsync = createAsyncThunk(
  'pool/fetchPoolByIdAsync',
  async (poolId) => {
    try {
      const pool = await fetchCompletePool(poolId, {
        maxRetries: 3,
        retryDelay: 500,
        initialDelay: 300,
      });

      if (!pool) throw new Error('Failed to fetch pool');

      return pool;
    } catch (error) {
      console.error('Error in fetch pool by id process:', error);
      throw error;
    }
  },
);

const poolSlice = createSlice({
  name: 'pool',
  initialState,
  reducers: {
    setPool: (state, action) => {
      return { ...state, ...action.payload };
    },
    setLeague: (state, action) => {
      return { ...state, league: action.payload };
    },
    setPoolName: (state, action) => {
      return { ...state, name: action.payload };
    },
    addPlayer: (state, action) => {
      state.players.push({ ...action.payload, id: uuid() });
    },
    setPlayerName: (state, action) => {
      const { name, index } = action.payload;
      const player = state.players[index];

      if (player) {
        player.name = name;
      }
    },
    setTeamName: (state, action) => {
      const { teamName, index } = action.payload;
      const player = state.players[index];

      if (player) {
        player.teamName = teamName;
      }
    },
    addTeamToPlayer: (state, action) => {
      const { team, playerIndex } = action.payload;
      const player = state.players[playerIndex];
      if (player) {
        player.teams = [...player.teams, team];
      }
    },
    removeTeamFromPlayer: (state, action) => {
      const { team, playerIndex } = action.payload;
      const player = state.players[playerIndex];
      if (player) {
        player.teams = player.teams.filter((t) => t.teamId !== team.teamId);
      }
    },
    removeEmptyPlayers: (state) => {
      state.players = state.players.filter(
        (player) => player.name.trim() !== '',
      );
    },
    setUserId: (state, action) => {
      return { ...state, userId: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(storePoolAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(storePoolAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(storePoolAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPoolByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPoolByIdAsync.fulfilled, (state, action) => {
        // Instead of returning the action payload, we'll merge it with the current state
        Object.assign(state, {
          ...action.payload,
          loading: false,
          error: true,
        });
      })
      .addCase(fetchPoolByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectSortedPlayersByWins = createSelector(
  (state) => state.pool.players,
  (players) => {
    return players
      .map((player) => ({
        ...player,
        teams: player.teams || [],
      }))
      .sort((player1, player2) => {
        return player2.totalWins - player1.totalWins;
      });
  },
);

export const {
  setPool,
  setLeague,
  setPoolName,
  addPlayer,
  setPlayerName,
  setTeamName,
  addTeamToPlayer,
  removeTeamFromPlayer,
  removeEmptyPlayers,
  setUserId,
} = poolSlice.actions;

export default poolSlice.reducer;
