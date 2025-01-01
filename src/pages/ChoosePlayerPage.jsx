import ChoosePlayerList from '../components/ChoosePlayerList';
import BackHeaderButton from '../components/BackHeaderButton';
import NextHeaderButton from '../components/NextHeaderButton';
import PrimaryActionButton from '../components/PrimaryActionButton';
import classes from './ChoosePlayerPage.module.css';
import LoadingOverlay from '../components/LoadingOverlay';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { storePoolAsync, setUserId, setPool } from '../state/poolSlice';
import { useUser, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

export default function ChoosePlayerPage() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pool = useSelector((state) => state.pool);
  const isStoringPool = useSelector((state) => state.pool.storingPool);
  const [areTeamsSelected, setAreTeamsSelected] = useState(false);

  // Check if all players have teams to determine if next button should be enabled
  useEffect(() => {
    if (!pool) return;
    const playersHaveTeams = () => {
      return pool.players.every((player) => player.teams?.length > 0);
    };

    setAreTeamsSelected(playersHaveTeams());
  }, [pool]);

  const handleStorePool = async () => {
    try {
      // Add user id to pool before storing
      dispatch(setUserId(user.id));
      // Wait for the pool to be stored
      const token = await getToken();
      const storedPool = await dispatch(storePoolAsync({ token })).unwrap();

      dispatch(setPool(storedPool));

      localStorage.setItem('activePoolId', pool.id);
      localStorage.setItem('userId', user.id);

      navigate('/pool-home');
    } catch (error) {
      console.error('Failed to create pool: ', error);
    }
  };

  return (
    <div className={classes['assign-teams-page']}>
    {isStoringPool && <LoadingOverlay />}
      <div className={classes['assign-teams-page-header']}>
        <BackHeaderButton path="/create-pool" />
        <h2>Assign Teams</h2>
      </div>
      <ChoosePlayerList />
        <PrimaryActionButton
        text="Create Pool"
        handleClick={handleStorePool}
        disabled={!areTeamsSelected}
      />
    </div>
  );
}
