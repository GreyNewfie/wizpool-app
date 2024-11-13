import { configureStore } from '@reduxjs/toolkit';
import poolReducer from './poolSlice';

const store = configureStore({
  reducer: {
    pool: poolReducer,
  },
});

export default store;
