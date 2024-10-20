import ChoosePlayerList from '../components/ChoosePlayerList';
import BackHeaderButton from '../components/BackHeaderButton';
import NextHeaderButton from '../components/NextHeaderButton';
import PrimaryActionButton from '../components/PrimayActionButton';
import classes from './ChoosePlayerPage.module.css';
import usePool from '../utils/usePool';
import { useEffect, useState } from 'react';

export default function ChoosePlayerPage() {
  const { pool } = usePool();
  const [areTeamsSelected, setAreTeamsSelected] = useState(false);

  useEffect(() => {
    const playersHaveTeams = () => {
      return pool.players.every((player) => player.teams?.length > 0);
    };

    setAreTeamsSelected(playersHaveTeams());
  }, [pool.players]);

  return (
    <div className={classes['assign-teams-page']}>
      <div className={classes['assign-teams-page-header']}>
        <BackHeaderButton path="/create-pool" />
        <h2>Assign Teams</h2>
        <NextHeaderButton path="/pool-home" disabled={!areTeamsSelected} />
      </div>
      <ChoosePlayerList poolPlayers={pool.players} />
      <PrimaryActionButton text="Create Pool" disabled={!areTeamsSelected} />
    </div>
  );
}
