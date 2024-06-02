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

  copyPool(pool) {
    this.poolName = pool.poolName;
    this.players = pool.players;
  }

  clonePool() {
    const clonedPool = new Pool(this.poolName, this.players);
    return clonedPool;
  }

  updatePlayers(players) {
    this.players = players;
  }

  updatePlayerNbaTeams(nbaTeamName, playerIndex) {
    if (this.players[playerIndex].nbaTeams) {
      this.players[playerIndex].nbaTeams = [
        ...this.players[playerIndex].nbaTeams,
        nbaTeamName,
      ];
    } else {
      this.players[playerIndex].nbaTeams = [nbaTeamName];
    }
  }

  getPool() {
    return this.poolName, this.players;
  }
}
