import PageHeader from '../components/PageHeader';
import PlayerHomeProfile from '../components/PlayerHomeProfile';
import MobileNavMenu from './MobileNavMenu';
import usePool from '../utils/usePool';
import classes from './PoolPlayersPage.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayerTeams from '../components/PlayerTeams';

export default function PoolPlayersPage() {
  const { pool } = usePool();

  return (
    <div className={classes['pool-players']}>
      <PageHeader
        headerText="Player's Teams"
        path="/pool-home"
        leftBtnText=<ArrowBackIcon />
      />
      <div className={classes['players-container']}>
        {pool.players.map((player, index) => {
          return (
            <div key={index} className={classes['player-container']}>
              <div className={classes['player']}>
                <PlayerHomeProfile
                  key={index}
                  player={player}
                  playerIndex={index}
                />
                <button className={classes['view-teams-btn']}>
                  View Teams
                </button>
              </div>
              <PlayerTeams player={player} />
            </div>
          );
        })}
      </div>
      <MobileNavMenu className={classes['bottom-menu']} />
    </div>
  );
}
