import poolReducer, {
  setPlayerName,
  setTeamName,
  removeEmptyPlayers,
  addTeamToPlayer,
} from '../src/state/poolSlice';
import { describe, it, expect } from 'vitest';

describe('poolSlice reducer', () => {
  it('should set player name correctly', () => {
    // Initial state with one player
    const initialState = {
      id: 'test-pool-id',
      league: '',
      players: [
        {
          id: 'player1-id',
          name: '',
          teamName: '',
          teams: [],
        },
      ],
      name: 'Test Pool',
    };

    // Action to update the player's name
    const action = setPlayerName({ name: 'John Doe', index: 0 });

    // Call reducer
    const newState = poolReducer(initialState, action);

    // Assertion
    expect(newState.players[0].name).toBe('John Doe');
  });

  it('should set team name correctly', () => {
    // Initial state with one player
    const initialState = {
      id: 'test-pool-id',
      league: '',
      players: [
        {
          id: 'player1-id',
          name: 'John Doe',
          teamName: '',
          teams: [],
        },
      ],
      name: 'Test Pool',
    };

    // Action to update the player's team name
    const action = setTeamName({ teamName: 'Team A', index: 0 });

    // Call reducer
    const newState = poolReducer(initialState, action);

    // Assertion
    expect(newState.players[0].teamName).toBe('Team A');
  });

  it('should add team to player correctly', () => {
    // Initial state with one player and no teams
    const initialState = {
      id: 'test-pool-id',
      league: '',
      players: [
        {
          id: 'player1-id',
          name: 'John Doe',
          teamName: '',
          teams: [],
        },
      ],
      name: 'Test Pool',
    };

    // Action to add a team to the player
    const action = addTeamToPlayer({
      team: { key: 'team1', name: 'Team A' },
      playerIndex: 0,
    });

    // Call reducer
    const newState = poolReducer(initialState, action);

    // Assertion
    expect(newState.players[0].teams.length).toBe(1);
    expect(newState.players[0].teams[0].key).toBe('team1');
    expect(newState.players[0].teams[0].name).toBe('Team A');
  });

  it('should remove players when name is empty', () => {
    // Initial state with one player and a blank player
    const initialState = {
      id: 'test-pool-id',
      league: '',
      players: [
        {
          id: 'player1-id',
          name: 'John Doe',
          teamName: '',
          teams: [],
        },
        {
          id: 'player2-id',
          name: '',
          teamName: '',
          teams: [],
        },
        {
          id: 'player3-id',
          name: 'Jane Smith',
          teamName: '',
          teams: [],
        },
        {
          id: 'player4-id',
          name: '',
          teamName: '',
          teams: [],
        },
      ],
      name: 'Test Pool',
    };

    // Action to remove the blank player
    const action = removeEmptyPlayers();

    // Call reducer
    const newState = poolReducer(initialState, action);

    // Assertion
    expect(newState.players.length).toBe(2);
    expect(newState.players[0].name).toBe('John Doe');
    expect(newState.players[1].name).toBe('Jane Smith');
    expect(newState.players.every((player) => player.name.trim() !== '')).toBe(
      true,
    );
  });
});
