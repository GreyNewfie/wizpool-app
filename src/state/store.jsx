import { configureStore } from '@reduxjs/toolkit';
import poolReducer from './poolSlice';
import userPoolsReducer from './userPoolsSlice';
import draftReducer from './draftSlice';

// --- LocalStorage persistence for pool and draft slices ---
const STORAGE_KEYS = {
  pool: 'wizpool_pool_state',
  draft: 'wizpool_draft_state',
};

const loadState = (key) => {
  try {
    const serialized = localStorage.getItem(key);
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch {
    return undefined;
  }
};

const saveState = (key, state) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(key, serialized);
  } catch {
    // ignore write errors
  }
};

const preloadedState = {
  pool: loadState(STORAGE_KEYS.pool),
  draft: loadState(STORAGE_KEYS.draft),
};

const store = configureStore({
  reducer: {
    pool: poolReducer,
    userPools: userPoolsReducer,
    draft: draftReducer,
  },
  preloadedState,
});

// Persist on changes (can be throttled if needed)
store.subscribe(() => {
  const state = store.getState();
  saveState(STORAGE_KEYS.pool, state.pool);
  saveState(STORAGE_KEYS.draft, state.draft);
});

export default store;
