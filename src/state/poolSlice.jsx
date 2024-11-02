import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialState = {
  id: '',
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
  },
});

export const {
  setPool,
  setLeague,
  setPoolName,
  addPlayer,
  setPlayerName,
  setTeamName,
} = poolSlice.actions;

export default poolSlice.reducer;
