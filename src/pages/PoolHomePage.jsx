import PageHeader from '../components/PageHeader';
import PlayerHomeProfile from '../components/PlayerHomeProfile';
import classes from './PoolHomePage.module.css';

export default function PoolHomePage() {
  const pool = JSON.parse(localStorage.getItem('pool'));

  return (
    <div className={classes['pool-home']}>
      <PageHeader headerText={pool.poolName} />
      <h3>Standings</h3>
      <PlayerHomeProfile player={pool.players[2]} playerIndex={2} />
    </div>
  );
}
