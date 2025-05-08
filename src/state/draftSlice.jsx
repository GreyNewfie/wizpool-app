import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialState = {
  draftId: uuid(),
  poolName: '', // Name of the pool
  draftStyle: '', // 'manual' or 'live'
  draftStatus: 'pending', // 'pending', 'scheduled', 'in-progress', 'completed'
  draftOrder: [], // Array of player IDs in draft order
  currentPick: 0, // Index of current pick in the draft
  timePerPick: 60, // Time per pick in seconds
  draftDate: null, // Date and time of the draft
  scheduledTime: null, // Scheduled time for the draft
  availableTeams: [], // Teams not yet drafted
  draftedTeams: [], // Teams already drafted with player info
  isSnakeDraft: true, // Whether the draft order reverses each round
  currentRound: 1,
  teamsPerPlayer: 0, // Number of teams each player can draft
  draftCompleted: false,
  draftLoading: false,
  draftError: null,
};

const draftSlice = createSlice({
  name: 'draft',
  initialState,
  reducers: {
    setPoolName: (state, action) => {
      state.poolName = action.payload;
    },
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
    setScheduledTime: (state, action) => {
      state.scheduledTime = action.payload;
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

export const {
  setPoolName,
  setDraftStyle,
  setDraftStatus,
  setDraftOrder,
  setTimePerPick,
  setDraftDate,
  setScheduledTime,
  setAvailableTeams,
  draftTeam,
  resetDraft,
  setTeamsPerPlayer,
  setIsSnakeDraft,
  setDraftCompleted,
  setDraftLoading,
  setDraftError,
} = draftSlice.actions;

export default draftSlice.reducer;
