import { configureStore } from '@reduxjs/toolkit';
import poolReducer from './poolSlice';
import userPoolsReducer from './userPoolsSlice';

const store = configureStore({
  reducer: {
    pool: poolReducer,
    userPools: userPoolsReducer,
  },
});

export default store;
