import PageHeader from '../components/PageHeader';
import PlayerHomeProfile from '../components/PlayerHomeProfile';
import PlayerWinsTracker from '../components/PlayerWinsTracker';
import classes from './PoolHomePage.module.css';
import usePool from '../utils/usePool';
import MobileNavMenu from './MobileNavMenu';

const sortPlayersByWins = (players) => {
  const unsortedPlayers = [...players];
  const sortedPlayers = unsortedPlayers.sort((player1, player2) => {
    const getTotalWins = (player) =>
      player.nbaTeams.reduce((totalWins, team) => totalWins + team.wins, 0);
    const totalWinsPlayer1 = getTotalWins(player1);
    const totalWinsPlayer2 = getTotalWins(player2);

    return totalWinsPlayer2 - totalWinsPlayer1;
  });
  return sortedPlayers;
};

export default function PoolHomePage() {
  const { pool } = usePool();
  const sortedPlayers = sortPlayersByWins([...pool.players]);

  return (
    <div className={classes['pool-home']}>
      <PageHeader headerText={pool.poolName} />
      <div className={classes['pool-players']}>
        <h3>Overall Standings</h3>
        {sortedPlayers.map((player, playerIndex) => {
          return (
            <div key={playerIndex} className={classes['player-container']}>
              <PlayerHomeProfile
                key={playerIndex}
                player={player}
                playerIndex={playerIndex}
              />
              <PlayerWinsTracker player={player} />
            </div>
          );
        })}
      </div>
      <MobileNavMenu className={classes['bottom-menu']} />
    </div>
  );
}
