import NextHeaderButton from '../components/NextHeaderButton';
import PrimaryActionButton from '../components/PrimayActionButton';
import UserTextInput from '../components/UserTextInput';
import classes from './CreatePoolPage.module.css';
import usePool from '../utils/usePool';
import PlayersList from '../components/PlayersList';

export default function CreatePoolPage() {
  const { pool, setPool, copyPool } = usePool();

  function addBlankPlayer() {
    const updatedPlayers = [...pool.players];
    updatedPlayers.push({ playerName: '', teamName: '' });
    const updatedPool = { ...pool, players: updatedPlayers };
    setPool(updatedPool);
  }

  const handlePoolNameChange = (e) => {
    const updatedPool = copyPool();
    updatedPool.setPoolName(e.target.value);
    setPool(updatedPool);
  };

  const handlePlayerNameChange = (e, index) => {
    const updatedPool = copyPool();
    updatedPool.SetPlayerName(e.target.value, index);
    setPool(updatedPool);
  };

  const handleTeamNameChange = (e, index) => {
    const updatedPool = copyPool();
    updatedPool.setTeamName(e.target.value, index);
    setPool(updatedPool);
  };

  return (
    <div
      id="create-pool-container"
      className={classes['create-pool-container']}
    >
      <div className={classes['create-pool-page-header']}>
        <NextHeaderButton
          path="/choose-player"
          handleClick={() => console.log('Button clicked')}
        />
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
