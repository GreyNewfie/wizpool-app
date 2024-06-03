import PageHeader from '../components/PageHeader';
import PlayerHomeProfile from '../components/PlayerHomeProfile';
import MobileNavMenu from './MobileNavMenu';
import PrimaryActionButton from '../components/PrimayActionButton';
import usePool from '../utils/usePool';
import classes from './PoolPlayersPage.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
            <div key={index} className="player">
              <PlayerHomeProfile
                key={index}
                player={player}
                playerIndex={index}
              />
            </div>
          );
        })}
      </div>
      <MobileNavMenu className={classes['bottom-menu']} />
    </div>
  );
}
