import usePool from '../utils/usePool';
import PlayerProfile from './PlayerProfile';

export default function ChoosePlayerList() {
  const { getStoredPool } = usePool();
  const storedPool = getStoredPool();

  return (
    <div className="select-player">
      <h3>Select a player to assign teams</h3>
      {storedPool.players.map((player, index) => {
        return <PlayerProfile key={index} player={player} index={index} />;
      })}
    </div>
  );
}
