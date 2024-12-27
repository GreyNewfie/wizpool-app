import PageHeader from '../components/PageHeader';
import PlayerHomeProfile from '../components/PlayerHomeProfile';
import MobileNavMenu from '../components/MobileNavMenu';
import classes from './PoolPlayersPage.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DisplayTeams from '../components/DisplayTeams';
import { useState } from 'react';
import useIsDesktop from '../utils/useIsDesktop';
import DesktopNavHeader from '../components/DesktopNavHeader';
import { useSelector } from 'react-redux';
export default function PoolPlayersPage() {
  const pool = useSelector((state) => state.pool);
  const [viewingTeamsFor, setViewingTeamsFor] = useState(null);
  const isDesktop = useIsDesktop();

  const toggleViewTeam = (index) => {
    setViewingTeamsFor((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className={classes['page-container']}>
      {isDesktop && (
        <DesktopNavHeader />
      )}
      <div className={classes['pool-players']}>
        <PageHeader
          headerText="Player's Teams"
          path="/pool-home"
          leftBtnText=<ArrowBackIcon />
          poolName={pool.name}
        />
        <div className={classes['players-container']}>
          <p>{`View each player's teams with season record`}</p>
          {pool.players.map((player, index) => {
            return (
              <div key={index} className={classes['player-container']}>
                <div className={classes['player']}>
                  <PlayerHomeProfile
                    key={index}
                    player={player}
                    playerIndex={index}
                  />
                  <button
                    className={classes['view-teams-btn']}
                    onClick={() => toggleViewTeam(index)}
                  >
                    {viewingTeamsFor === index ? 'Hide Teams' : 'View Teams'}
                  </button>
                </div>
                {viewingTeamsFor === index && (
                  <>
                    <h5>Teams</h5>
                    <DisplayTeams
                      league={pool.league}
                      teams={player.teams || []}
                    />
                  </>
                )}
              </div>
            );
          })}
        </div>
        {!isDesktop && <MobileNavMenu className={classes['bottom-menu']} />}{' '}
      </div>
    </div>
  );
}
