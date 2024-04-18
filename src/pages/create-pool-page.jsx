import AddPlayer from '../components/add-player-form';
import PrimaryButton from '../components/primary-button';
import TopRightActionBtn from '../components/top-right-action-btn';

export default function CreatePool() {
  return (
    <div className="create-pool-container">
      <div className="create-pool-page-header">
        <TopRightActionBtn />
        <h1>Create a pool</h1>
      </div>
      <div className="choose-pool-name">
        <label htmlFor="pool-name">Name your pool</label>
        <input
          type="text"
          id="pool-name"
          name="pool-name"
          className="text-input"
          placeholder="Pool name"
          required
        />
      </div>
      <h2>Add players to your pool</h2>
      <AddPlayer />
      <PrimaryButton text={'Add player'} />
    </div>
  );
}
