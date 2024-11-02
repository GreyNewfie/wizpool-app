import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialState = {
  id: '',
  league: '',
  players: [],
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
  },
});

export const { setPool, setLeague, setPoolName, addPlayer } = poolSlice.actions;

export default poolSlice.reducer;
