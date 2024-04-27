import { useState } from 'react';
import AddPlayer from '../components/AddPlayer';
import NextHeaderButton from '../components/NextHeaderButton';
import PrimaryActionButton from '../components/PrimayActionButton';
import UserTextInput from '../components/UserTextInput';

export default function CreatePoolPage() {
  const [playerCount, setPlayerCount] = useState(1);

  function handleClick() {
    setPlayerCount(playerCount + 1);
  }

  return (
    <div className="create-pool-container">
      <div className="create-pool-page-header">
        <NextHeaderButton path="/choose-assign-teams-player" />
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
          props={{
            text: 'Add another player',
            handleClick: handleClick,
            optionalSymbol: '+',
          }}
        />
      </div>
    </div>
  );
}
