import classes from './PoolPicksPage.module.css';
import PageHeader from '../components/PageHeader';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MobileNavMenu from '../components/MobileNavMenu';
import DisplayTeams from '../components/DisplayTeams';
import useIsDesktop from '../utils/useIsDesktop';
import DesktopNavHeader from '../components/DesktopNavHeader';
import { useSelector } from 'react-redux';

export default function PoolPicksPage() {
  const pool = useSelector((state) => state.pool);
  const isDesktop = useIsDesktop();

  const getTeamsAndPlayers = () => {
    const teamsAndPlayersList = pool.players.flatMap((player) => {
      return player.teams?.map((team) => {
        return {
          playerName: player.name,
          team: team,
        };
      });
    });
    teamsAndPlayersList.sort((a, b) => b.team.wins - a.team.wins);
    // Filter out is any falsy values
    const filteredList = teamsAndPlayersList.filter(Boolean);
    return filteredList;
  };

  const teamsAndPlayersList = getTeamsAndPlayers();

  return (
    <div className={classes['page-container']}>
      {isDesktop && (
        <DesktopNavHeader />
      )}
      <div className={classes['pool-picks']}>
        <PageHeader
          headerText="Picked Teams"
          leftBtnText={<ArrowBackIcon />}
          path="/pool-home"
          poolName={pool.poolName}
        />
        <div className={classes['picks-container']}>
          <p>See which players have the teams with the most wins</p>
          {teamsAndPlayersList.map((teamAndPlayer, index) => (
            <div key={index} className={classes['player-team-container']}>
              <DisplayTeams
                league={pool.league}
                teams={[teamAndPlayer?.team]}
              />
              <h6>{teamAndPlayer.playerName}</h6>
            </div>
          ))}
        </div>
        {!isDesktop && <MobileNavMenu className={classes['bottom-menu']} />}
      </div>
    </div>
  );
}
