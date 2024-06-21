import classes from './ManagePlayersPage.module.css';
import PageHeader from '../components/PageHeader';
import MobileNavMenu from './MobileNavMenu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayerHomeProfile from '../components/PlayerHomeProfile';
import usePool from '../utils/usePool';
import { Link } from 'react-router-dom';

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
            <Link to='/edit-player'>            
              <button 
                className={classes['edit-btn']}
                onClick={console.log("Edit player ${player.name}")}
                >
                  Edit
                </button>
            </Link>
          </div>
          )
          )
        }
      </div>
      <MobileNavMenu className={classes['bottom-menu']} />
    </div>
  );
}
