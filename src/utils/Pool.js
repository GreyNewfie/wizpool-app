// eslint-disable-next-line no-unused-vars
export default class Pool {
  constructor(poolName, players) {
    this.poolName = poolName;
    this.players = players;
  }

  setPoolName(poolName) {
    this.poolName = poolName;
  }

  SetPlayerName(playerName, index) {
    this.players[index] = { ...this.players[index], playerName };
  }

  setTeamName(teamName, index) {
    this.players[index] = { ...this.players[index], teamName };
  }

  updatePool(pool) {
    this.poolName = pool.poolName;
    this.players = pool.players;
  }

  updatePlayers(players) {
    this.players = players;
  }

  updatePlayersTeams(teams, playerIndex) {
    this.players[playerIndex].teams = [...teams];
  }

  getPool() {
    return this.poolName, this.players;
  }
}
