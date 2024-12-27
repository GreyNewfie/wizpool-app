import classes from './ReassignTeamsPage.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PageHeader from '../components/PageHeader';
import MobileNavMenu from '../components/MobileNavMenu';
import PlayerHomeProfile from '../components/PlayerHomeProfile';
import TeamsList from '../components/TeamsList';
import useIsDesktop from '../utils/useIsDesktop';
import DesktopNavHeader from '../components/DesktopNavHeader';
import LoadingOverlay from '../components/LoadingOverlay';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { setPool, updatePoolAsync } from '../state/poolSlice';
import { useAuth } from '@clerk/clerk-react';
import { useDispatch } from 'react-redux';
import { fetchCompletePool } from '../services/poolService';

export default function ReassignTeamsPage() {
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const pool = useSelector((state) => state.pool);
  const updatingPool = useSelector((state) => state.pool.loading);
  const [playerToEdit, setPlayerToEdit] = useState(null);
  const isDesktop = useIsDesktop();

  const togglePlayerToEdit = (index) => {
    setPlayerToEdit((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleUpdateTeams = async () => {
    try {
      console.log('Storing pool: ', updatingPool);
      const token = await getToken();

      // First update the pool in the database
      await dispatch(updatePoolAsync({ token })).unwrap();

      // Then fetch the complete pool with team data
      const updatedPool = await fetchCompletePool(pool.id, token);
      dispatch(setPool(updatedPool));

      console.log('Finished storing pool: ', updatingPool);
    } catch (error) {
      console.error('Error updating teams: ', error);
    } finally {
      setPlayerToEdit(null);
    }
  };

  return (
    <div className={classes['page-container']}>
      {isDesktop && <DesktopNavHeader />}
      <div className={classes['reassign-teams']}>
        <PageHeader
          headerText="Rassign Teams"
          leftBtnText={<ArrowBackIcon />}
          path="/pool-settings"
          poolName={pool.name}
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
                    onClick={
                      playerToEdit !== null
                        ? handleUpdateTeams
                        : () => togglePlayerToEdit(index)
                    }
                    disabled={updatingPool}
                  >
                    {playerToEdit === index ? 'Save' : 'Edit'}
                  </button>
                </div>
                {updatingPool && playerToEdit === index && (
                  <div className={classes['loading-container']}>
                    <LoadingOverlay />
                  </div>
                )}
                {playerToEdit === index && !updatingPool && (
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
