import classes from './ManagePlayersPage.module.css';
import PageHeader from '../components/PageHeader';
import MobileNavMenu from '../components/MobileNavMenu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayerHomeProfile from '../components/PlayerHomeProfile';
import usePool from '../utils/usePool';
import { useState } from 'react';
import PlayerInput from '../components/PlayerInput';
import PrimaryActionButton from '../components/PrimayActionButton';
import ConfirmDialog from '../components/ConfirmDialog';
import useIsDesktop from '../utils/useIsDesktop';
import DesktopNavHeader from '../components/DesktopNavHeader';
import useStoredPools from '../utils/useStoredPools';

export default function ManagePlayersPage() {
  const {
    pool,
    createNewPool,
    changePool,
    handlePlayerNameChange,
    handleTeamNameChange,
    addBlankPlayer,
    deletePlayer,
  } = usePool();
  const [playerToEdit, setPlayerToEdit] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState(null);
  const isDesktop = useIsDesktop();
  const { getNonActivePools } = useStoredPools();
  const nonActivePools = getNonActivePools();

  const togglePlayerToEdit = (index) => {
    setPlayerToEdit((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleShowConfirmDialog = (player) => {
    setPlayerToDelete(player);
    setShowConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setPlayerToDelete(null);
    setShowConfirmDialog(false);
  };

  const handleDeletePlayer = () => {
    deletePlayer(playerToDelete);
    setShowConfirmDialog(false);
  };

  return (
    <div className={classes['page-container']}>
      {isDesktop && (
        <DesktopNavHeader
          poolName={pool.poolName}
          createNewPool={createNewPool}
          changePool={changePool}
          nonActivePools={nonActivePools}
        />
      )}
      <div className={classes['manage-players']}>
        <PageHeader
          headerText="Manage Players"
          leftBtnText=<ArrowBackIcon />
          path="/pool-settings"
          poolName={pool.poolName}
          createNewPool={createNewPool}
          changePool={changePool}
          nonActivePools={nonActivePools}
        />
        <div className={classes['players-container']}>
          {pool.players.map((player, index) => (
            <div key={index} className={classes['player']}>
              {playerToEdit !== index && (
                <PlayerHomeProfile player={player} playerIndex={index} />
              )}
              {playerToEdit === index && (
                <PlayerInput
                  player={player}
                  index={index}
                  handleNameChange={handlePlayerNameChange}
                  handleTeamNameChange={handleTeamNameChange}
                />
              )}
              {playerToEdit === index ? (
                <div className={classes['edit-player-btns']}>
                  <button
                    className={classes['edit-btn']}
                    onClick={() => togglePlayerToEdit(index)}
                  >
                    Save
                  </button>
                  <button
                    className={classes['delete-btn']}
                    onClick={() => handleShowConfirmDialog(player)}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <button
                  className={classes['edit-btn']}
                  onClick={() => togglePlayerToEdit(index)}
                >
                  Edit
                </button>
              )}
            </div>
          ))}
          <PrimaryActionButton
            text="Add another player"
            handleClick={addBlankPlayer}
            optionalSymbol="+"
          />
        </div>
        {!isDesktop && <MobileNavMenu className={classes['bottom-menu']} />}{' '}
        <ConfirmDialog
          open={showConfirmDialog}
          onClose={handleCloseConfirmDialog}
          onConfirm={handleDeletePlayer}
          itemName={playerToDelete?.playerName}
          dialogTitle="Confirm Delete Player"
        />
      </div>
    </div>
  );
}
