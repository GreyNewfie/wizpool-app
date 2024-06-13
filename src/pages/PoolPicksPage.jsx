import classes from './PoolPicksPage.module.css';
import PageHeader from '../components/PageHeader';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MobileNavMenu from './MobileNavMenu';
import usePool from '../utils/usePool';
import DisplayTeams from '../components/DisplayTeams';

export default function PoolPicksPage() {
  const { pool } = usePool();

  const getTeamsAndPlayers = () => {
    const clonedPool = pool.clonePool();
    const TeamsWithPlayers = clonedPool.players.flatMap((player) => {
      return player.nbaTeams.map((team) => {
        return {
          playerName: player.playerName,
          team: team,
        };
      });
    });
    return TeamsWithPlayers;
  };

  const teamsAndPlayersList = getTeamsAndPlayers();

  return (
    <div className={classes['pool-picks']}>
      <PageHeader
        headerText="Picked Teams"
        leftBtnText=<ArrowBackIcon />
        path="/pool-home"
      />
      <div className={classes['picks-container']}>
        {teamsAndPlayersList.map((teamAndPlayer, index) => (
          <div key={index} className={classes['player-team-container']}>
            <DisplayTeams teams={[teamAndPlayer.team]} />
            <h5>{teamAndPlayer.playerName}</h5>
          </div>
        ))}
      </div>
      <MobileNavMenu className={classes['bottom-menu']} />
    </div>
  );
}