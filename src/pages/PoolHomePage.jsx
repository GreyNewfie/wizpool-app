import PageHeader from '../components/PageHeader';
import PlayerHomeProfile from '../components/PlayerHomeProfile';
import PlayerWinsTracker from '../components/PlayerWinsTracker';
import classes from './PoolHomePage.module.css';
import MobileNavMenu from '../components/MobileNavMenu';
import useTheme from '../context/useTheme';
import classNames from 'classnames';
import DesktopNavHeader from '../components/DesktopNavHeader';
import useIsDesktop from '../utils/useIsDesktop';
import LoadingOverlay from '../components/LoadingOverlay';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSortedPlayersByWins } from '../state/poolSlice';
import { useAuth, useUser } from '@clerk/clerk-react';
import { setPool } from '../state/poolSlice';

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
    let playerAWins = playerA.totalWins;
    const nextIndex = currentIndex + 1;

    if (nextIndex < sortedPlayers.length) {
      const playerB = sortedPlayers[nextIndex];
      const playerBWins = playerB.totalWins;

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
          // Add playerA's standing to playerB
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
  const { user } = useUser();
  const { getToken } = useAuth();
  const { dispatch } = useDispatch();
  const pool = useSelector((state) => state.pool);
  const isLoading = useSelector((state) => state.pool.loading);
  const sortedPlayers = useSelector(selectSortedPlayersByWins);
  const poolClasses = classNames(classes['pool-home'], classes[theme]);
  const isDesktop = useIsDesktop();
  const playerStandings = getPlayerStandings(sortedPlayers);

  useEffect(() => {
    const handleInvitation = async () => {
          // Check if the User has a poolId in their publicMetadata
          const invitePoolId = user?.publicMetadata?.poolId;
          if (!user.invitePoolId) return;

          try {
          const token = await getToken();

          const response = await fetch(`${import.meta.evn.VITE_BASE_API_URL}/complete_pools/:${invitePoolId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          })

          if (!response.ok)  throw new Error('Failed to fetch pool data for invite');

          const poolData = response.json();
          dispatch(setPool(poolData));
        } catch (error) {
          console.error('Error handling pool invitation:', error);
        }
    };

    handleInvitation();
  }, [user, dispatch, getToken])

  return (
    <div className={classes['page-container']}>
      {isLoading && <LoadingOverlay />}
      {isDesktop && <DesktopNavHeader />}
      <div className={poolClasses}>
        <PageHeader headerText={pool.name} poolName={pool.name} />
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
