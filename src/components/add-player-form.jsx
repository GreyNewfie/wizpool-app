export default function AddPlayer() {
  return (
    <form className="add-player">
      <input
        type="text"
        id="player-1-name"
        name="player-1-name"
        className="text-input"
      />
      <input
        type="text"
        id="player-1-team-name"
        name="player-1-team-name"
        className="text-input"
      />
    </form>
  );
}
