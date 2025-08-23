import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pickOrder: [],
  currentPickIndex: 0,
  draftComplete: false,
  // draftOrder determines how initial draft order is assigned
  // 'random' (shuffled) or 'pool' (entered order)
  draftOrder: 'random',
  // We could add more draft-specific state here
  // like availableTeams, draftHistory, etc.
};

const draftSlice = createSlice({
  name: 'draft',
  initialState,
  reducers: {
    setPickOrder: (state, action) => {
      state.pickOrder = action.payload;
    },
    setCurrentPickIndex: (state, action) => {
      state.currentPickIndex = action.payload;
    },
    incrementPickIndex: (state) => {
      state.currentPickIndex += 1;
    },
    setDraftComplete: (state, action) => {
      state.draftComplete = action.payload;
    },
    setDraftOrder: (state, action) => {
      state.draftOrder = action.payload;
    },
    resetDraft: () => initialState,
  },
});

export const {
  setPickOrder,
  setCurrentPickIndex,
  incrementPickIndex,
  setDraftComplete,
  setDraftOrder,
  resetDraft,
} = draftSlice.actions;

export default draftSlice.reducer;
