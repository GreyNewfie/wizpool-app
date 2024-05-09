import { useState } from 'react';
import AddPlayer from '../components/AddPlayer';
import NextHeaderButton from '../components/NextHeaderButton';
import PrimaryActionButton from '../components/PrimayActionButton';
import UserTextInput from '../components/UserTextInput';
import classes from './CreatePoolPage.module.css';
import Pool from '../utils/Pool';
import usePool from '../utils/usePool';

function copyPool(pool) {
  const copyOfPool = new Pool('', []);
  copyOfPool.updatePool(pool);
  return copyOfPool;
}

export default function CreatePoolPage() {
  const [playerCount, setPlayerCount] = useState(1);
  const { pool, setPool } = usePool();

  // Tracks how many add player forms to display
  function handleClick() {
    setPlayerCount(playerCount + 1);
  }

  const handlePoolNameChange = (e) => {
    const updatedPool = copyPool(pool);
    updatedPool.setPoolName(e.target.value);
    setPool(updatedPool);
  };

  const handlePlayerNameChange = (e, index) => {
    const updatedPool = copyPool(pool);
    updatedPool.SetPlayerName(e.target.value, index);
    setPool(updatedPool);
  };

  const handleTeamNameChange = (e, index) => {
    const updatedPool = copyPool(pool);
    updatedPool.setTeamName(e.target.value, index);
    setPool(updatedPool);
  };

  return (
    <div
      id="create-pool-container"
      className={classes['create-pool-container']}
    >
      <div className={classes['create-pool-page-header']}>
        <NextHeaderButton path="/choose-player" />
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
          id="pool-name"
          name="pool-name"
          value={pool.poolName}
          placeholderText="Pool Name"
          handleChange={handlePoolNameChange}
        />
      </div>
      <div className={classes['add-players-section']}>
        <form className={classes['add-player']}>
          <h3 className="page-subsection-header">Add players to your pool</h3>
          {[...Array(playerCount)].map((_, index) => {
            return (
              <AddPlayer
                key={index}
                playerId={index}
                handlePlayerNameChange={(e) => handlePlayerNameChange(e, index)}
                handleTeamNameChange={(e) => handleTeamNameChange(e, index)}
              />
            );
          })}
        </form>
        <span className="secondary-text">
          Select next when all players are added
        </span>
        <PrimaryActionButton
          text="Add another player"
          handleClick={handleClick}
          optionalSymbol="+"
        />
      </div>
    </div>
  );
}
