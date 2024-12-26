import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import {
  createPool,
  fetchCompletePool,
  deletePool,
  updatePool,
} from '../services/poolService';

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
  storingPool: false,
  error: null,
};

export const storePoolAsync = createAsyncThunk(
  'pool/storePoolAsync',
  async ({ token }, { getState }) => {
    const pool = getState().pool;

    try {
      // Create the pool
      const result = await createPool(pool, token);
      if (!result) {
        throw new Error('Failed to create pool');
      }

      // Wait a moment for the database to complete the transaction
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Fetch the pool with retry options
      const fetchedPool = await fetchCompletePool(pool.id, token, {
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
  async ({ poolId, token }, { rejectWithValue }) => {
    try {
      const pool = await fetchCompletePool(poolId, token, {
        maxRetries: 3,
        retryDelay: 500,
        initialDelay: 300,
      });

      if (!pool) throw new Error('Failed to fetch pool');

      return pool;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchPoolAsync = createAsyncThunk(
  'pool/fetchPoolAsync',
  async ({ poolId, token }, { rejectWithValue }) => {
    try {
      const poolData = await fetchCompletePool(poolId, token);
      return poolData;
    } catch (error) {
      console.error('Error fetching pool: ', error);
      return rejectWithValue(error.message);
    }
  },
);

export const deletePoolAsync = createAsyncThunk(
  'pool/deletePoolAsync',
  async ({ poolId, token }, { rejectWithValue }) => {
    try {
      const deleteResponse = await deletePool(poolId, token);

      if (!deleteResponse.success)
        throw new Error('Error trying to delete pool from the database');

      return { poolId };
    } catch (error) {
      console.error('Error attempting to delete pool', error);
      throw rejectWithValue(error.message);
    }
  },
);

export const updatePoolAsync = createAsyncThunk(
  'pool/updatePoolAsync',
  async ({ token }, { getState, rejectWithValue }) => {
    try {
      const pool = getState().pool;

      const updateResponse = await updatePool(pool, token);

      if (!updateResponse.success)
        throw new Error('Error trying to update the pool in the database');

      return { poolId: pool.id };
    } catch (error) {
      console.error('Error attempting to update the pool: ', error);
      throw rejectWithValue(error.message);
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
    deletePlayer: (state, action) => {
      const playerToDelete = action.payload;
      state.players = state.players.filter(
        (player) => player.id !== playerToDelete.id,
      );
    },
    setPlayerName: (state, action) => {
      const { name, index } = action.payload;
      const player = state.players[index];

      if (player) {
        player.name = name;
      }
    },
    setTeamName: (state, action) => {
      const { teamName, playerIndex } = action.payload;
      const player = state.players[playerIndex];

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
        player.teams = player.teams.filter((t) => t.key !== team.key);
      }
    },
    removeEmptyPlayers: (state) => {
      state.players = state.players.filter(
        (player) => player.name.trim() !== '',
      );
    },
    setUserId: (state, action) => {
      return { ...state, userId: action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(storePoolAsync.pending, (state) => {
        state.storingPool = true;
        state.error = null;
      })
      .addCase(storePoolAsync.fulfilled, (state) => {
        state.storingPool = false;
        state.error = null;
      })
      .addCase(storePoolAsync.rejected, (state, action) => {
        state.storingPool = false;
        state.error = action.error.message;
      })
      .addCase(fetchPoolByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPoolByIdAsync.fulfilled, (state, action) => {
        // Instead of returning the action payload, merge it with the current state
        Object.assign(state, {
          ...action.payload,
          loading: false,
          error: null,
        });
      })
      .addCase(fetchPoolByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPoolAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPoolAsync.fulfilled, (state, action) => {
        Object.assign(state, {
          ...action.payload,
          loading: false,
          error: null,
        });
      })
      .addCase(fetchPoolAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch pool data';
      })
      .addCase(deletePoolAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePoolAsync.fulfilled, () => {
        return {
          ...initialState,
          loading: false,
          error: null,
        };
      })
      .addCase(deletePoolAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete pool';
      })
      .addCase(updatePoolAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePoolAsync.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updatePoolAsync.rejected, (state, action) => {
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
  deletePlayer,
} = poolSlice.actions;

export default poolSlice.reducer;
