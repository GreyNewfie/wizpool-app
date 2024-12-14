import classes from './ReassignTeamsPage.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PageHeader from '../components/PageHeader';
import MobileNavMenu from '../components/MobileNavMenu';
import PlayerHomeProfile from '../components/PlayerHomeProfile';
import TeamsList from '../components/TeamsList';
import { Fragment, useState } from 'react';
import useIsDesktop from '../utils/useIsDesktop';
import DesktopNavHeader from '../components/DesktopNavHeader';
import { useSelector } from 'react-redux';
import { setPool, updatePoolAsync } from '../state/poolSlice';
import { useAuth } from '@clerk/clerk-react';
import { useDispatch } from 'react-redux';

export default function ReassignTeamsPage() {
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const pool = useSelector((state) => state.pool);
  const [playerToEdit, setPlayerToEdit] = useState(null);
  const isDesktop = useIsDesktop();

  const togglePlayerToEdit = (index) => {
    setPlayerToEdit((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleUpdateTeams = async () => {    
    try {
      const token = await getToken();
      await dispatch(updatePoolAsync({ token })).unwrap();
    } catch (error) {
      console.error('Error updating teams: ', error);
    } finally {
      setPlayerToEdit(null);
    }
  }

  return (
    <div className={classes['page-container']}>
      {isDesktop && (
        <DesktopNavHeader />
      )}
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
                    onClick={playerToEdit !== null ? handleUpdateTeams : () => togglePlayerToEdit(index)}
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
