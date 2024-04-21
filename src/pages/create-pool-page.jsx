import AddPlayer from '../components/add-player-form';
import PrimaryLinkButton from '../components/primary-link-button';
import NextHeaderButton from '../components/next-header-btn';

export default function CreatePool() {
  return (
    <div className="create-pool-container">
      <div className="create-pool-page-header">
        <NextHeaderButton />
        <h1>Create a pool</h1>
      </div>
      <div className="choose-pool-name">
        <label htmlFor="pool-name" className="page-subsection-header">
          Name your pool
        </label>
        <input
          type="text"
          id="pool-name"
          name="pool-name"
          className="text-input"
          placeholder="Pool Name"
          required
        />
      </div>
      <div className="add-players-section">
        <h3 className="page-subsection-header">Add players to your pool</h3>
        <AddPlayer />
        <span className="secondary-text">
          Select next when all players are added
        </span>
        <PrimaryLinkButton text={'Add another player'} />
      </div>
    </div>
  );
}
