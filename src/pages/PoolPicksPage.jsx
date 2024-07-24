import classes from './PoolPicksPage.module.css';
import PageHeader from '../components/PageHeader';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MobileNavMenu from './MobileNavMenu';
import usePool from '../utils/usePool';
import DisplayTeams from '../components/DisplayTeams';
import useIsDesktop from '../utils/useIsDesktop';
import DesktopNavHeader from '../components/DesktopNavHeader';

export default function PoolPicksPage() {
  const { pool } = usePool();
  const isDesktop = useIsDesktop();

  const getTeamsAndPlayers = () => {
    const clonedPool = pool.clonePool();
    const teamsWithPlayers = clonedPool.players.flatMap((player) => {
      return player.teams.map((team) => {
        return {
          playerName: player.playerName,
          team: team,
        };
      });
    });
    teamsWithPlayers.sort((a, b) => b.team.wins - a.team.wins);
    return teamsWithPlayers;
  };

  const teamsAndPlayersList = getTeamsAndPlayers();

  return (
    <div className={classes['page-container']}>
      {isDesktop && <DesktopNavHeader poolName={pool.poolName} />}
      <div className={classes['pool-picks']}>
        <PageHeader
          headerText="Picked Teams"
          leftBtnText=<ArrowBackIcon />
          path="/pool-home"
        />
        <div className={classes['picks-container']}>
          <p>See which players have the teams with the most wins</p>
          {teamsAndPlayersList.map((teamAndPlayer, index) => (
            <div key={index} className={classes['player-team-container']}>
              <DisplayTeams league={pool.league} teams={[teamAndPlayer.team]} />
              <h6>{teamAndPlayer.playerName}</h6>
            </div>
          ))}
        </div>
        {!isDesktop && <MobileNavMenu className={classes['bottom-menu']} />}
      </div>
    </div>
  );
}
