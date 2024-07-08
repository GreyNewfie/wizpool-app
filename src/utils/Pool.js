// eslint-disable-next-line no-unused-vars
export default class Pool {
  constructor(poolName, players) {
    this.poolName = poolName;
    this.players = players;
  }

  setPoolName(poolName) {
    this.poolName = poolName;
  }

  setPlayerName(playerName, index) {
    this.players[index] = { ...this.players[index], playerName };
  }

  setTeamName(teamName, index) {
    this.players[index] = { ...this.players[index], teamName };
  }

  clonePool() {
    const clonedPlayers = this.players.map((player) => ({ ...player }));
    const clonedPool = new Pool(this.poolName, clonedPlayers);
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

  getPool() {
    return this.poolName, this.players;
  }
}
