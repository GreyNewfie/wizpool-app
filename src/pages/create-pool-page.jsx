export default function CreatePool() {
  return (
    <div className="create-pool-container">
      <h1>Create a pool</h1>
      <label htmlFor="pool-name">Name your pool</label>
      <input
        type="text"
        id="pool-name"
        name="pool-name"
        className="page-input"
        placeholder="Pool name"
        required
      />
    </div>
  );
}
