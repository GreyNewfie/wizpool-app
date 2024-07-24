import PageHeader from '../components/PageHeader';
import PlayerHomeProfile from '../components/PlayerHomeProfile';
import MobileNavMenu from './MobileNavMenu';
import usePool from '../utils/usePool';
import classes from './PoolPlayersPage.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DisplayTeams from '../components/DisplayTeams';
import { useState } from 'react';
import useIsDesktop from '../utils/useIsDesktop';
import DesktopNavHeader from '../components/DesktopNavHeader';
import useStoredPools from '../utils/useStoredPools';

export default function PoolPlayersPage() {
  const { pool, createNewPool, changePool } = usePool();
  const [viewingTeamsFor, setViewingTeamsFor] = useState(null);
  const isDesktop = useIsDesktop();
  const { getNonActivePools } = useStoredPools();
  const nonActivePools = getNonActivePools();

  const toggleViewTeam = (index) => {
    setViewingTeamsFor((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className={classes['page-container']}>
      {isDesktop && (
        <DesktopNavHeader
          poolName={pool.poolName}
          createNewPool={createNewPool}
          changePool={changePool}
          nonActivePools={nonActivePools}
        />
      )}
      <div className={classes['pool-players']}>
        <PageHeader
          headerText="Player's Teams"
          path="/pool-home"
          leftBtnText=<ArrowBackIcon />
          poolName={pool.poolName}
          createNewPool={createNewPool}
          changePool={changePool}
          nonActivePools={nonActivePools}
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
