import PageHeader from '../components/PageHeader';
import PlayerHomeProfile from '../components/PlayerHomeProfile';
import PlayerWinsTracker from '../components/PlayerWinsTracker';
import classes from './PoolHomePage.module.css';
import usePool from '../utils/usePool';
import MobileNavMenu from './MobileNavMenu';
import useTheme from '../context/useTheme';
import classNames from 'classnames';
import DesktopNavHeader from '../components/DesktopNavHeader';
import { useState, useEffect } from 'react';

const sortPlayersByWins = (players) => {
  const unsortedPlayers = players.map((player) => {
    return {
      ...player,
      teams: player.teams || [],
    };
  });
  const sortedPlayers = unsortedPlayers.sort((player1, player2) => {
    const getTotalWins = (player) =>
      player.teams.reduce((totalWins, team) => totalWins + team.wins, 0);
    const totalWinsPlayer1 = getTotalWins(player1);
    const totalWinsPlayer2 = getTotalWins(player2);

    return totalWinsPlayer2 - totalWinsPlayer1;
  });
  return sortedPlayers;
};

export default function PoolHomePage() {
  const { pool } = usePool();
  const { theme } = useTheme();
  const sortedPlayers = sortPlayersByWins([...pool.players]);
  const poolClasses = classNames(classes['pool-home'], classes[theme]);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={classes['page-container']}>
      {isDesktop && <DesktopNavHeader />}
      <div className={poolClasses}>
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
        {!isDesktop && <MobileNavMenu className={classes['bottom-menu']} />}
      </div>
    </div>
  );
}
