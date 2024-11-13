import ChoosePlayerList from '../components/ChoosePlayerList';
import BackHeaderButton from '../components/BackHeaderButton';
import NextHeaderButton from '../components/NextHeaderButton';
import PrimaryActionButton from '../components/PrimaryActionButton';
import classes from './ChoosePlayerPage.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { storePoolAsync } from '../state/poolSlice';

export default function ChoosePlayerPage() {
  const dispatch = useDispatch();
  const pool = useSelector((state) => state.pool);
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
    dispatch(storePoolAsync());
    localStorage.setItem('activePoolId', pool.id);
  };

  return (
    <div className={classes['assign-teams-page']}>
      <div className={classes['assign-teams-page-header']}>
        <BackHeaderButton path="/create-pool" />
        <h2>Assign Teams</h2>
        <NextHeaderButton path="/pool-home" disabled={!areTeamsSelected} />
      </div>
      <ChoosePlayerList />
      <PrimaryActionButton
        text="Create Pool"
        handleClick={handleStorePool}
        path={'/pool-home'}
        disabled={!areTeamsSelected}
      />
    </div>
  );
}
