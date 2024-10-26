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
import { useState, useEffect } from 'react';
import useApiData from '../utils/useApiData';

const getTotalWins = (player) =>
  player.teams.reduce((totalWins, team) => totalWins + team.wins, 0);

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
  let currentIndex = 0;

  const assignStanding = (player, standing, isTied = false) => {
    const suffix = getStandingSuffix(standing);
    playerStandings[player.playerName] =
      `${isTied ? 'T-' : ''}${standing}${suffix}`;
  };

  while (currentIndex < sortedPlayers.length) {
    let playerA = sortedPlayers[currentIndex];
    let playerAWins = getTotalWins(playerA);
    const nextIndex = currentIndex + 1;

    if (nextIndex < sortedPlayers.length) {
      const playerB = sortedPlayers[nextIndex];
      const playerBWins = getTotalWins(playerB);

      // Compare players a and b
      // Check if playeA and playerB have the same number of wins
      if (playerAWins === playerBWins) {
        // If yes, check if playerA already has a standing
        if (playerStandings[playerA.playerName]) {
          // If yes, check if playerA's standing has a tied suffix
          if (!playerStandings[playerA.playerName].startsWith('T-')) {
            // If no, add T- to playerA's standing
            playerStandings[playerB.playerName] =
              `T-${playerStandings[playerA.playerName]}`;
          }
          // dd playerA's standing to playerB
          playerStandings[playerB.playerName] =
            `${playerStandings[playerA.playerName]}`;
        } else {
          // If playerA doesn't have a standing assign current standing to both players
          assignStanding(playerA, currentStanding, true);
          assignStanding(playerB, currentStanding, true);
        }
        // Move to the next player, but keep the current standing
        currentIndex++;
        continue;
      } else {
        // If not tied, check if playerA already has a standing
        if (!playerStandings[playerA.playerName]) {
          // If no, assign current standing to playerA
          assignStanding(playerA, currentStanding);
        }
      }
    } else {
      // Last player in the list, assign standing if not already assigned
      if (!playerStandings[playerA.playerName]) {
        assignStanding(playerA, currentStanding);
      }
    }
    currentIndex++;
    currentStanding++;
  }
  return playerStandings;
};

export default function PoolHomePage() {
  const {
    pool,
    changePool,
    createNewPool,
    deletePool,
    sortPlayersByWins,
    updatePlayersTeamsRecords,
  } = usePool();
  const { getApiLeagueData } = useApiData();
  const { theme } = useTheme();
  const sortedPlayers = sortPlayersByWins([...pool.players]);
  const poolClasses = classNames(classes['pool-home'], classes[theme]);
  const isDesktop = useIsDesktop();
  const { getNonActivePools } = useStoredPools();
  const nonActivePools = getNonActivePools();
  const playerStandings = getPlayerStandings(sortedPlayers);
  const [leagueData, setLeagueData] = useState(null);

  useEffect(() => {
    const fetchApiData = async () => {
      const apiData = await getApiLeagueData(pool.league);
      setLeagueData(apiData);
    };

    if (!leagueData) fetchApiData();
  }, []);

  useEffect(() => {
    if (leagueData !== null) {
      updatePlayersTeamsRecords(leagueData);
    }
  }, [leagueData]);

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
