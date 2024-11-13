import PlayerProfile from './PlayerProfile';
import classes from './ChoosePlayerList.module.css';
import { useSelector } from 'react-redux';

export default function ChoosePlayerList() {
  const pool = useSelector((state) => state.pool);
  return (
    <div className={classes['select-player']}>
      <h3>Assign teams to each player</h3>
      {pool.players.map((player, index) => {
        return <PlayerProfile key={index} player={player} index={index} />;
      })}
    </div>
  );
}
