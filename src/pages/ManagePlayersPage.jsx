import classes from './ManagePlayersPage.module.css';
import PageHeader from '../components/PageHeader';
import MobileNavMenu from './MobileNavMenu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayerHomeProfile from '../components/PlayerHomeProfile';
import usePool from '../utils/usePool';

export default function ManageTeamsPage() {
  const {pool} = usePool();

  return (
    <div className={classes['manage-players']}>
      <PageHeader
        headerText="Manage Players"
        leftBtnText=<ArrowBackIcon />
        path="/pool-settings"
      />
      <div className={classes['players-container']}>
        {
          pool.players.map((player, index) => (
            <div key={index} className={classes['player']}>
            <PlayerHomeProfile
              player={player}
              playerIndex={index}
            />
          </div>
          )
          )
        }
      </div>
      <MobileNavMenu className={classes['bottom-menu']} />
    </div>
  );
}
