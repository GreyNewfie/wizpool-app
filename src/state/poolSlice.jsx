import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import {
  createPool,
  createPlayers,
  createPlayerTeams,
  createPoolPlayers,
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
};

export const storePoolAsync = createAsyncThunk(
  'pool/storePoolAsync',
  async (_, { getState, rejectWithValue }) => {
    const pool = getState().pool;
    try {
      await createPool(pool);
      await createPlayers(pool.players);
      await createPoolPlayers(pool);
      await createPlayerTeams(pool);
    } catch (error) {
      console.error('Error storing pool data:', error);
      return rejectWithValue(error.message);
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
        state.error = action.payload;
      });
  },
});

export const {
  setPool,
  setLeague,
  setPoolName,
  addPlayer,
  setPlayerName,
  setTeamName,
  addTeamToPlayer,
  removeTeamFromPlayer,
} = poolSlice.actions;

export default poolSlice.reducer;
