import usePool from '../utils/usePool';
import PlayerProfile from './PlayerProfile';

export default function ChoosePlayerList() {
  const { pool } = usePool();

  return (
    <div className="select-player">
      <h3>Select a player to assign teams</h3>
      {pool.players.map((player, index) => {
        return <PlayerProfile key={index} player={player} index={index} />;
      })}
    </div>
  );
}
