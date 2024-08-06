import NextHeaderButton from '../components/NextHeaderButton';
import PrimaryActionButton from '../components/PrimayActionButton';
import UserTextInput from '../components/UserTextInput';
import classes from './CreatePoolPage.module.css';
import usePool from '../utils/usePool';
import PlayersList from '../components/PlayersList';
import { useState, useEffect } from 'react';

export default function CreatePoolPage() {
  const {
    pool,
    addBlankPlayer,
    handlePoolNameChange,
    handlePlayerNameChange,
    handleTeamNameChange,
  } = usePool();

  const [isPoolCreated, setIsPoolCreated] = useState(false);

  useEffect(() => {
    const checkPoolCreated = () => {
      let playersHaveNames =
        pool.players[0]?.playerName?.replace(/[^a-zA-z]/g, '').length > 0;
      let poolHasName = pool.poolName?.replace(/[^a-zA-Z]/g, '').length > 0;
      return playersHaveNames && poolHasName;
    };
    setIsPoolCreated(checkPoolCreated());
  }, [pool.players, pool.poolName]);

  return (
    <div
      id="create-pool-container"
      className={classes['create-pool-container']}
    >
      <div className={classes['create-pool-page-header']}>
        <NextHeaderButton path="/choose-player" disabled={!isPoolCreated} />
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
          handleChange={(e) => handlePoolNameChange(e.target.value)}
          autoFocus={true}
        />
      </div>
      <div className={classes['add-players-section']}>
        <form className={classes['add-players']}>
          <h3 className="page-subsection-header">Add players to your pool</h3>
          <PlayersList
            players={pool.players}
            handlePlayerNameChange={handlePlayerNameChange}
            handleTeamNameChange={handleTeamNameChange}
          />
        </form>
        <span className="secondary-text">
          Select next when all players are added
        </span>
        <PrimaryActionButton
          text="Add another player"
          handleClick={addBlankPlayer}
          optionalSymbol="+"
        />
      </div>
    </div>
  );
}
