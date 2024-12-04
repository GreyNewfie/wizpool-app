import classes from './ReassignTeamsPage.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PageHeader from '../components/PageHeader';
import MobileNavMenu from '../components/MobileNavMenu';
import PlayerHomeProfile from '../components/PlayerHomeProfile';
import TeamsList from '../components/TeamsList';
import { Fragment, useState } from 'react';
import useIsDesktop from '../utils/useIsDesktop';
import DesktopNavHeader from '../components/DesktopNavHeader';
import useStoredPools from '../utils/useStoredPools';
import { useSelector } from 'react-redux';
import { setPool } from '../state/poolSlice';

export default function ReassignTeamsPage() {
  const pool = useSelector((state) => state.pool);
  const [playerToEdit, setPlayerToEdit] = useState(null);
  const isDesktop = useIsDesktop();
  const { getNonActivePools } = useStoredPools();
  const nonActivePools = getNonActivePools();

  const togglePlayerToEdit = (index) => {
    setPlayerToEdit((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className={classes['page-container']}>
      {isDesktop && (
        <DesktopNavHeader
          poolName={pool.name}
          nonActivePools={nonActivePools}
        />
      )}
      <div className={classes['reassign-teams']}>
        <PageHeader
          headerText="Rassign Teams"
          leftBtnText={<ArrowBackIcon />}
          path="/pool-settings"
          poolName={pool.name}
          nonActivePools={nonActivePools}
        />
        <div className={classes['players-container']}>
          <p>{`Select edit to begin reassigning a player's teams`}</p>
          {pool.players.map((player, index) => {
            return (
              <Fragment key={index}>
                <div key={index} className={classes['player']}>
                  <PlayerHomeProfile player={player} playerIndex={index} />
                  <button
                    className={classes['edit-btn']}
                    onClick={() => togglePlayerToEdit(index)}
                  >
                    {playerToEdit === index ? 'Save' : 'Edit'}
                  </button>
                </div>
                {playerToEdit === index && (
                  <TeamsList
                    pool={pool}
                    setPool={setPool}
                    playerIndex={index}
                  />
                )}
              </Fragment>
            );
          })}
        </div>
        {!isDesktop && <MobileNavMenu className={classes['bottom-menu']} />}{' '}
      </div>
    </div>
  );
}
