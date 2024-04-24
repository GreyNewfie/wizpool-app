import { useState } from 'react';
import AddPlayer from '../components/add-player-form';
import NextHeaderButton from '../components/next-header-btn';
import PrimaryActionButton from '../components/primary-action-button';
import UserTextInput from '../components/user-text-input';

export default function CreatePool() {
  const [playerCount, setPlayerCount] = useState(1);

  function handleClick() {
    setPlayerCount(playerCount + 1);
  }

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
        <UserTextInput
          props={{
            id: 'pool-name',
            name: 'pool-name',
            placeholderText: 'Pool Name',
          }}
        />
      </div>
      <div className="add-players-section">
        <h3 className="page-subsection-header">Add players to your pool</h3>
        {[...Array(playerCount)].map((_, index) => {
          return <AddPlayer key={index} playerId={index} />;
        })}
        <span className="secondary-text">
          Select next when all players are added
        </span>
        <PrimaryActionButton
          text={'Add another player'}
          handleClick={handleClick}
          addPlusSymbol={true}
        />
      </div>
    </div>
  );
}
