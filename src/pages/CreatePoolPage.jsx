import NextHeaderButton from '../components/NextHeaderButton';
import PrimaryActionButton from '../components/PrimaryActionButton';
import UserTextInput from '../components/UserTextInput';
import classes from './CreatePoolPage.module.css';
import PlayersList from '../components/PlayersList';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addPlayer,
  setPoolName,
  setPlayerName,
  setTeamName,
} from '../state/poolSlice';

export default function CreatePoolPage() {
  const dispatch = useDispatch();
  const pool = useSelector((state) => state.pool);
  const [isPoolCreated, setIsPoolCreated] = useState(false);

  useEffect(() => {
    if (!pool) return;
    // Check if first player has name and pool has a name
    const checkPoolCreated = () => {
      let playersHaveNames =
        pool.players[0].name.replace(/[^a-zA-z]/g, '').length > 0;
      let poolHasName = pool.name.replace(/[^a-zA-Z]/g, '').length > 0;
      return playersHaveNames && poolHasName;
    };
    // Set isPoolCreated to toggle next button
    setIsPoolCreated(checkPoolCreated());
  }, [pool]);

  const handleAddBlankPlayer = () => {
    dispatch(addPlayer({ name: '', teamName: '', teams: [] }));
  };

  const handlePoolNameChange = (value) => {
    dispatch(setPoolName(value));
  };

  const handlePlayerNameChange = (value, index) => {
    dispatch(setPlayerName({ name: value, index }));
  };

  const handleTeamNameChange = (value, index) => {
    dispatch(setTeamName({ teamName: value, index }));
  };

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
          value={pool.name}
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
          handleClick={handleAddBlankPlayer}
          optionalSymbol="+"
        />
      </div>
    </div>
  );
}
