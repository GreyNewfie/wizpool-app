import { useState } from 'react';
import AddPlayer from '../components/AddPlayer';
import NextHeaderButton from '../components/NextHeaderButton';
import PrimaryActionButton from '../components/PrimayActionButton';
import UserTextInput from '../components/UserTextInput';
import classes from './CreatePoolPage.module.css';

export default function CreatePoolPage() {
  const [playerCount, setPlayerCount] = useState(1);
  const [poolName, setPoolName] = useState('Initial');
  const [players, setPlayers] = useState([]);

  function handleClick() {
    setPlayerCount(playerCount + 1);
  }

  const handlePoolNameChange = (e) => {
    setPoolName(e.target.value);
  };

  const handlePlayerNameChange = (e, index) => {
    const updatedPlayers = [...players];

    updatedPlayers[index] = {
      ...updatedPlayers[index],
      playerName: e.target.value,
    };

    setPlayers(updatedPlayers);
  };

  return (
    <div
      id="create-pool-container"
      className={classes['create-pool-container']}
    >
      <div className={classes['create-pool-page-header']}>
        <NextHeaderButton path="/choose-assign-teams-player" />
        <h1>Create a pool</h1>
      </div>
      <div className={classes['choose-pool-name']}>
        <label
          htmlFor="pool-name"
          className={classes['page-subsection-header']}
        >
          Name your pool
        </label>
        <UserTextInput
          props={{
            id: 'pool-name',
            name: 'pool-name',
            placeholderText: 'Pool Name',
            handleChange: handlePoolNameChange,
          }}
        />
        <p>{poolName}</p>
      </div>
      <div className={classes['add-players-section']}>
        <form className={classes['add-player']}>
          <h3 className="page-subsection-header">Add players to your pool</h3>
          {[...Array(playerCount)].map((_, index) => {
            console.log(index);
            return (
              <AddPlayer
                key={index} //Shold this be outside of the props object?
                playerId={index}
                handlePlayerNameChange={(e) => handlePlayerNameChange(e, index)}
                handleTeamNameChange={() => console.log('temporary')}
              />
            );
          })}
        </form>
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
