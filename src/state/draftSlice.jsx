import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessionId: null,
  status: 'pre-draft',
  settings: {
    timePerPick: 60,
    teamsPerPlayer: 3,
  },
  pickOrder: [],
  currentPickIndex: 0,
  draftComplete: false,
  // draftOrder determines how initial draft order is assigned
  // 'random' (shuffled) or 'pool' (entered order)
  draftOrder: 'random',
};

const draftSlice = createSlice({
  name: 'draft',
  initialState,
  reducers: {
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
    },
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
    setTimePerPick: (state, action) => {
      state.settings.timePerPick = action.payload;
    },
    setTeamsPerPlayer: (state, action) => {
      state.settings.teamsPerPlayer = action.payload;
    },
    setDraftOrder: (state, action) => {
      state.draftOrder = action.payload;
    },
    resetDraft: () => initialState,
  },
});

export const {
  setSessionId,
  setPickOrder,
  setCurrentPickIndex,
  incrementPickIndex,
  setDraftComplete,
  setTimePerPick,
  setTeamsPerPlayer,
  setDraftOrder,
  resetDraft,
} = draftSlice.actions;

export default draftSlice.reducer;
