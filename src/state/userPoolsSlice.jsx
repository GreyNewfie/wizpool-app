import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserPools } from '../services/poolService';

const initialState = {
  pools: [],
  activePool: null,
  loading: false,
  error: null,
};

export const fetchUserPoolsAsync = createAsyncThunk(
  'userPools/fetchUserPools',
  async ({userId, token}, { rejectWithValue }) => {
    try {
      const userPools = await fetchUserPools(userId, token);
      return userPools;
    } catch (error) {
      console.error('Error fetching user pools:', error);
      return rejectWithValue(error.message);
    }
  },
);

const userPoolsSlice = createSlice({
  name: 'userPools',
  initialState,
  reducers: {
    clearUserPools: (state) => {
      state.pools = [];
    },
    setActivePool: (state, action) => {
      state.activePool = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPoolsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPoolsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.pools = action.payload;
      })
      .addCase(fetchUserPoolsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserPools, setActivePool } = userPoolsSlice.actions;
export default userPoolsSlice.reducer;
