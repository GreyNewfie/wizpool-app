import { createSlice } from '@reduxjs/toolkit';

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
  },
});

export const { setPool, setLeague } = poolSlice.actions;

export default poolSlice.reducer;
