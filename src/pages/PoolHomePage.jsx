import PageHeader from '../components/PageHeader';
import PlayerHomeProfile from '../components/PlayerHomeProfile';
import PlayerWinsTracker from '../components/PlayerWinsTracker';
import classes from './PoolHomePage.module.css';
import usePool from '../utils/usePool';
import MobileNavMenu from '../components/MobileNavMenu';
import useTheme from '../context/useTheme';
import classNames from 'classnames';
import DesktopNavHeader from '../components/DesktopNavHeader';
import useIsDesktop from '../utils/useIsDesktop';
import useStoredPools from '../utils/useStoredPools';

const getTotalWins = (player) =>
  player.teams.reduce((totalWins, team) => totalWins + team.wins, 0);

const sortPlayersByWins = (players) => {
  const unsortedPlayers = players.map((player) => {
    return {
      ...player,
      teams: player.teams || [],
    };
  });
  const sortedPlayers = unsortedPlayers.sort((player1, player2) => {
    const totalWinsPlayer1 = getTotalWins(player1);
    const totalWinsPlayer2 = getTotalWins(player2);

    return totalWinsPlayer2 - totalWinsPlayer1;
  });
  return sortedPlayers;
};

const getStandingSuffix = (standing) => {
  const standingDigits = [...standing.toString()].map(Number);
  const lastDigitInStanding = standingDigits[standingDigits.length - 1];

  if (standing === 11 || standing === 12 || standing === 13) {
    return 'th';
  }

  switch (lastDigitInStanding) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

const getPlayerStandings = (sortedPlayers) => {
  const playerStandings = {};
  let currentStanding = 1;
  let playerAIndex = 0;

  for (let i = 0; i < sortedPlayers.length; i++) {
    let standingSuffix = getStandingSuffix(currentStanding);
    let playerBIndex = playerAIndex + 1;
    let playerA = sortedPlayers[playerAIndex];
    let playerB = sortedPlayers[playerBIndex];
    let playerAWins = getTotalWins(playerA);
    let playerBWins =
      playerBIndex < sortedPlayers.length ? getTotalWins(playerB) : null;

    // Compare players a and b
    // if a > b, a receives the standing
    if (playerAWins === playerBWins && playerBIndex < sortedPlayers.length) {
      // if a = b, a and b are set to current standing
      playerStandings[playerA.playerName] =
        `${currentStanding}${standingSuffix}`;
      playerStandings[playerB.playerName] =
        `${currentStanding}${standingSuffix}`;
    } else {
      playerStandings[playerA.playerName] =
        `${currentStanding}${standingSuffix}`;
    }
    // b is set to a
    playerAIndex++;
    // standing is set to 2
    currentStanding++;
  }
  return playerStandings;
};

export default function PoolHomePage() {
  const { pool, changePool, createNewPool, deletePool } = usePool();
  const { theme } = useTheme();
  const sortedPlayers = sortPlayersByWins([...pool.players]);
  const poolClasses = classNames(classes['pool-home'], classes[theme]);
  const isDesktop = useIsDesktop();
  const { getNonActivePools } = useStoredPools();
  const nonActivePools = getNonActivePools();
  const playerStandings = getPlayerStandings(sortedPlayers);

  return (
    <div className={classes['page-container']}>
      {isDesktop && (
        <DesktopNavHeader
          poolName={pool.poolName}
          createNewPool={createNewPool}
          deletePool={deletePool}
          changePool={changePool}
          nonActivePools={nonActivePools}
        />
      )}
      <div className={poolClasses}>
        <PageHeader
          headerText={pool.poolName}
          poolName={pool.poolName}
          createNewPool={createNewPool}
          changePool={changePool}
          nonActivePools={nonActivePools}
        />
        <div className={classes['pool-players']}>
          <h3>Overall Standings</h3>
          {sortedPlayers.map((player, playerIndex) => {
            const playerStanding = playerStandings[player.playerName];
            return (
              <div key={playerIndex} className={classes['player-container']}>
                <PlayerHomeProfile
                  key={playerIndex}
                  player={player}
                  playerIndex={playerIndex}
                  playerStanding={playerStanding}
                />
                <PlayerWinsTracker player={player} standing={playerStanding} />
              </div>
            );
          })}
        </div>
        {!isDesktop && <MobileNavMenu className={classes['bottom-menu']} />}
      </div>
    </div>
  );
}
