import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserPools } from '../services/poolService';

const initialState = {
  pools: [],
  loading: false,
  error: null,
};

export const fetchUserPoolsAsync = createAsyncThunk(
  'userPools/fetchUserPools',
  async (userId) => {
    const userPools = await fetchUserPools(userId);
    return userPools;
  },
);

const userPoolsSlice = createSlice({
  name: 'userPools',
  initialState,
  reducers: {
    clearUserPools: (state) => {
      state.pools = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPoolsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPoolsAsync.fulfilled, (state, action) => {
        state.pools = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserPoolsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearUserPools } = userPoolsSlice.actions;
export default userPoolsSlice.reducer;
