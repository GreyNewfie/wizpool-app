import PageHeader from '../components/PageHeader';
import PlayerHomeProfile from '../components/PlayerHomeProfile';
import PlayerWinsTracker from '../components/PlayerWinsTracker';
import classes from './PoolHomePage.module.css';
import MobileNavMenu from '../components/MobileNavMenu';
import useTheme from '../context/useTheme';
import classNames from 'classnames';
import DesktopNavHeader from '../components/DesktopNavHeader';
import useIsDesktop from '../utils/useIsDesktop';
import useStoredPools from '../utils/useStoredPools';
import { useEffect, useRef } from 'react';
import useApiData from '../utils/useApiData';
import { useSelector, useDispatch } from 'react-redux';
import { selectSortedPlayersByWins, setPool } from '../state/poolSlice';
import { fetchCompletePool } from '../services/poolService';
import CircularIndeterminate from '../components/Loading';
import { useState } from 'react';

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
  if (!sortedPlayers) return [];

  const playerStandings = {};
  let currentStanding = 1;
  let currentIndex = 0;

  const assignStanding = (player, standing, isTied = false) => {
    const suffix = getStandingSuffix(standing);
    playerStandings[player.name] = `${isTied ? 'T-' : ''}${standing}${suffix}`;
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
        if (playerStandings[playerA.name]) {
          // If yes, check if playerA's standing has a tied suffix
          if (!playerStandings[playerA.name].startsWith('T-')) {
            // If no, add T- to playerA's standing
            playerStandings[playerB.name] =
              `T-${playerStandings[playerA.name]}`;
          }
          // dd playerA's standing to playerB
          playerStandings[playerB.name] = `${playerStandings[playerA.name]}`;
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
        if (!playerStandings[playerA.name]) {
          // If no, assign current standing to playerA
          assignStanding(playerA, currentStanding);
        }
      }
    } else {
      // Last player in the list, assign standing if not already assigned
      if (!playerStandings[playerA.name]) {
        assignStanding(playerA, currentStanding);
      }
    }
    currentIndex++;
    currentStanding++;
  }
  return playerStandings;
};

export default function PoolHomePage() {
  const { theme } = useTheme();
  const { getApiLeagueData } = useApiData();
  const { getNonActivePools } = useStoredPools();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const pool = useSelector((state) => state.pool);
  const sortedPlayers = useSelector(selectSortedPlayersByWins);
  const poolClasses = classNames(classes['pool-home'], classes[theme]);
  const isDesktop = useIsDesktop();
  const nonActivePools = getNonActivePools();
  const playerStandings = getPlayerStandings(sortedPlayers);
  const fetchRef = useRef({
    controller: null,
    isInitialMount: true,
    isLoading: false,
  });

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      const activePoolId = localStorage.getItem('activePoolId');
      if (!activePoolId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const poolData = await fetchCompletePool(activePoolId, {
          maxRetries: 3,
          retryDelay: 1000,
          signal: controller.signal,
          initialDelay: 500,
        });

        if (!isMounted) return;

        if (!poolData) {
          setError('Pool not found');
          return;
        }

        const leagueData = await getApiLeagueData(poolData.league);

        if (!isMounted) return;

        const updatedPlayers = poolData.players.map((player) => {
          const updatedTeams = player.teams.map((team) => {
            const teamData = leagueData.find(
              (dataTeam) => dataTeam.key === team.key,
            );
            return {
              ...team,
              ...(teamData || {}),
              wins: teamData?.wins || 0,
              losses: teamData?.losses || 0,
              ties: teamData?.ties || 0,
            };
          });
          return {
            ...player,
            teams: updatedTeams,
            totalWins: updatedTeams.reduce(
              (sum, team) => sum + (team.wins || 0),
              0,
            ),
          };
        });

        dispatch(setPool({ ...poolData, players: updatedPlayers }));
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Request aborted');
          return;
        }
        if (isMounted) {
          console.error('Error fetching pool data:', error);
          setError(error.message);
        }
      } finally {
        if (isMounted && fetchRef.current.isLoading) {
          fetchRef.current.isLoading = false;
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      if (fetchRef.current.controller) {
        fetchRef.current.controller.abort();
        fetchRef.current.isLoading = false;
        setIsLoading(false);
      }
    };
  }, []);

  const createNewPool = () => {};

  const deletePool = () => {};

  const changePool = () => {
    console.log('changePool');
  };

  if (isLoading && fetchRef.current.isLoading) {
    return (
      <div className={classes['page-loading-container']}>
        <CircularIndeterminate />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes['page-loading-container']}>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={classes['page-container']}>
      {isDesktop && (
        <DesktopNavHeader
          createNewPool={createNewPool}
          deletePool={deletePool}
          changePool={changePool}
          nonActivePools={nonActivePools}
        />
      )}
      <div className={poolClasses}>
        <PageHeader
          headerText={pool.name}
          poolName={pool.name}
          createNewPool={createNewPool}
          changePool={changePool}
          nonActivePools={nonActivePools}
        />
        <div className={classes['pool-players']}>
          <h3>Overall Standings</h3>
          {sortedPlayers.map((player, playerIndex) => {
            const playerStanding = playerStandings[player.name];
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
