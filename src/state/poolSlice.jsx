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
  },
});

export default poolSlice.reducer;
