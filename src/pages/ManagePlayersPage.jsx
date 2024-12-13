import classes from './ManagePlayersPage.module.css';
import PageHeader from '../components/PageHeader';
import MobileNavMenu from '../components/MobileNavMenu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayerHomeProfile from '../components/PlayerHomeProfile';
import { useState } from 'react';
import PlayerInput from '../components/PlayerInput';
import PrimaryActionButton from '../components/PrimaryActionButton';
import ConfirmDialog from '../components/ConfirmDialog';
import useIsDesktop from '../utils/useIsDesktop';
import DesktopNavHeader from '../components/DesktopNavHeader';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPlayerName,
  setTeamName,
  addPlayer,
  deletePlayer,
  updatePoolAsync,
} from '../state/poolSlice';
import { useAuth } from '@clerk/clerk-react';

export default function ManagePlayersPage() {
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const pool = useSelector((state) => state.pool);
  const [playerToEdit, setPlayerToEdit] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState(null);
  const isDesktop = useIsDesktop();

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
    dispatch(deletePlayer(playerToDelete));
    setShowConfirmDialog(false);
  };

  const handlePlayerNameChange = (name, index) => {
    dispatch(setPlayerName({ name, index }));
  };

  const handleTeamNameChange = (teamName, playerIndex) => {
    dispatch(setTeamName({ teamName, playerIndex }));
  };

  const addBlankPlayer = () => {
    dispatch(addPlayer({ name: '', teamName: '', teams: [] }));
  };

  const handleSavingPlayer = async (index) => {
    const token = await getToken();
    dispatch(updatePoolAsync({ token }));
    togglePlayerToEdit(index);
  };

  return (
    <div className={classes['page-container']}>
      {isDesktop && (
        <DesktopNavHeader />
      )}
      <div className={classes['manage-players']}>
        <PageHeader
          headerText="Manage Players"
          leftBtnText={<ArrowBackIcon />}
          path="/pool-settings"
          poolName={pool.name}
        />
        <div className={classes['players-container']}>
          <p>{`Edit player names or team names`}</p>
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
                    onClick={() => handleSavingPlayer(index)}
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
