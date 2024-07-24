import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line no-unused-vars
export default class Pool {
  constructor(poolName, players, league, id = uuidv4()) {
    this.poolName = poolName;
    this.players = players;
    this.league = league;
    this.id = id;
  }

  setPoolName(poolName) {
    this.poolName = poolName;
  }

  setLeague(league) {
    this.league = league;
  }

  setPlayerName(playerName, index) {
    this.players[index] = { ...this.players[index], playerName };
  }

  setTeamName(teamName, index) {
    this.players[index] = { ...this.players[index], teamName };
  }

  clonePool() {
    const clonedPlayers = this.players.map((player) => ({ ...player }));
    const clonedPool = new Pool(
      this.poolName,
      clonedPlayers,
      this.league,
      this.id,
    );
    return clonedPool;
  }

  updatePlayers(players) {
    this.players = players;
  }

  updatePlayerTeams(teamName, playerIndex) {
    if (this.players[playerIndex].teams) {
      this.players[playerIndex].teams = [
        ...this.players[playerIndex].teams,
        teamName,
      ];
    } else {
      this.players[playerIndex].teams = [teamName];
    }
  }
}
