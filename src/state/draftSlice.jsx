import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialState = {
  draftId: uuid(),
  draftStyle: '',
  draftStatus: 'pending',
  draftOrder: [],
  currentPick: 0,
  timePerPick: 60,
  draftDate: null,
  availableTeams: [],
  draftedTeams: [],
  isSnakeDraft: true,
  currentRound: 1,
  teamsPerPlayer: 0,
  draftCompleted: false,
  draftLoading: false,
  draftError: null,
};

const draftSlice = createSlice({
  name: 'draft',
  initialState,
  reducers: {
    setDraftStyle: (state, action) => {
      state.draftStyle = action.payload;
    },
    setDraftStatus: (state, action) => {
      state.draftStatus = action.payload;
    },
    setDraftOrder: (state, action) => {
      state.draftOrder = action.payload;
    },
    setTimePerPick: (state, action) => {
      state.timePerPick = action.payload;
    },
    setDraftDate: (state, action) => {
      state.draftDate = action.payload;
    },
    setAvailableTeams: (state, action) => {
      state.availableTeams = action.payload;
    },
    draftTeam: (state, action) => {
      const { teamId, playerId } = action.payload;
      // Remove from available teams
      state.availableTeams = state.availableTeams.filter(
        (team) => team.key !== teamId,
      );
      // Add to drafted teams
      state.draftedTeams.push({
        teamId,
        playerId,
        pickNumber: state.currentPick + 1,
      });
      // Move to next pick
      state.currentPick += 1;
      // Check if we need to move to the next round
      if (state.currentPick === state.draftOrder.length) {
        state.currentPick = 0;
        state.currentRound += 1;
      }
    },
    resetDraft: (state) => {
      Object.assign(state, initialState);
    },
    setTeamsPerPlayer: (state, action) => {
      state.teamsPerPlayer = action.payload;
    },
    setIsSnakeDraft: (state, action) => {
      state.isSnakeDraft = action.payload;
    },
    setDraftCompleted: (state, action) => {
      state.draftCompleted = action.payload;
    },
    setDraftLoading: (state, action) => {
      state.draftLoading = action.payload;
    },
    setDraftError: (state, action) => {
      state.draftError = action.payload;
    },
  },
});
