import ChoosePlayerList from '../components/ChoosePlayerList';
import BackHeaderButton from '../components/BackHeaderButton';
import NextHeaderButton from '../components/NextHeaderButton';
import classes from './ChoosePlayerPage.module.css';
import usePool from '../utils/usePool';

export default function ChoosePlayerPage() {
  const { pool } = usePool();

  return (
    <div className={classes['assign-teams-page']}>
      <div className={classes['assign-teams-page-header']}>
        <BackHeaderButton path="/create-pool" />
        <h2>Assign Teams</h2>
        <NextHeaderButton path="/choose-player" />
      </div>
      <ChoosePlayerList poolPlayers={pool.players} />
    </div>
  );
}
