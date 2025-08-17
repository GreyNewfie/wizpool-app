import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MockDraftTeamsList from '../components/MockDraftTeamsList';
import BackHeaderButton from '../components/BackHeaderButton';
import PrimaryActionButton from '../components/PrimaryActionButton';
import classes from './DraftPage.module.css';
import { useUser, useAuth } from '@clerk/clerk-react';
import {
  setPickOrder,
  incrementPickIndex,
  setDraftComplete,
  resetDraft,
  setCurrentPickIndex,
} from '../state/draftSlice';
import { clearAllPlayersTeams, storePoolAsync, setUserId, setPool } from '../state/poolSlice';

export default function DraftPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useUser();
  const { getToken } = useAuth();
  const pool = useSelector((state) => state.pool);
  const draft = useSelector((state) => state.draft);
  const players = useMemo(() => pool.players || [], [pool.players]);
  const [lastPicksCount, setLastPicksCount] = useState(0);
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  // Reset draft state when pool context changes to avoid stale persisted data
  useEffect(() => {
    // If a draft is already initialized and pool context changes, reset it
    if (draft?.pickOrder?.length) {
      dispatch(resetDraft());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool.league, players.length]);

  // Define createDraftOrder for exactly 10 players
  // Returns an array of player INDEXES (not player objects)
  const createDraftOrder = (players) => {
    if (!players || players.length !== 10) {
      console.warn('Draft requires exactly 10 players');
      return [];
    }

    // Shuffle function to randomize player positions
    const shuffle = (arr) => {
      const a = arr.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };

    // Draft order for 10 players (30 total picks)
    const draftOrderByPosition = {
      1: [1, 20, 26],
      2: [2, 16, 29],
      3: [3, 13, 30],
      4: [4, 18, 25],
      5: [5, 15, 27],
      6: [6, 19, 22],
      7: [7, 11, 28],
      8: [8, 17, 21],
      9: [9, 14, 23],
      10: [10, 12, 24],
    };

    // Build the complete 30-pick schedule
    const draftSchedule = new Array(30);
    for (const [pos, picks] of Object.entries(draftOrderByPosition)) {
      const pos0 = Number(pos) - 1;
      picks.forEach((pickNum) => {
        draftSchedule[pickNum - 1] = pos0; // Convert to 0-based pick number
      });
    }

    // Create shuffled player indices [0,1,2,3,4,5,6,7,8,9]
    const playerIndices = Array.from({ length: 10 }, (_, i) => i);
    const shuffledIndices = shuffle(playerIndices);

    // Map each draft pick to the actual player index
    const pickOrderIndices = draftSchedule.map((pos0) => shuffledIndices[pos0]);

    return pickOrderIndices;
  };

  // Use pickOrder from Redux; initialize it after mount to avoid dispatching during render
  const pickOrder = draft.pickOrder || [];

  useEffect(() => {
    if (
      (!draft.pickOrder || draft.pickOrder.length === 0) &&
      players.length === 10
    ) {
      const newPickOrder = createDraftOrder(players);
      dispatch(setPickOrder(newPickOrder));
    }
  }, [draft.pickOrder, players, dispatch]);

  // We use draft.currentPickIndex directly from Redux; no local sync needed

  const totalPicksTarget = 30;

  // Derived state
  const totalPicksMade = useMemo(() => {
    return players.reduce((sum, p) => sum + (p.teams?.length || 0), 0);
  }, [players]);

  const draftComplete = totalPicksMade >= totalPicksTarget;

  // Update Redux when draft completion status changes
  useEffect(() => {
    if (draftComplete !== draft.draftComplete) {
      dispatch(setDraftComplete(draftComplete));
    }
  }, [draftComplete, draft.draftComplete, dispatch]);

  const currentPlayerIndex = pickOrder.length
    ? pickOrder[draft.currentPickIndex % pickOrder.length]
    : 0;
  const currentPlayer = players[currentPlayerIndex];

  // When the number of picks increases in the pool state, advance to next player
  useEffect(() => {
    if (totalPicksMade > lastPicksCount && !draftComplete) {
      dispatch(incrementPickIndex());
      setLastPicksCount(totalPicksMade);
    } else if (totalPicksMade > lastPicksCount) {
      setLastPicksCount(totalPicksMade);
    }
    // Open completion modal at or beyond 30 picks (3 rounds for 10 players)
    if (totalPicksMade >= 30 && !completeModalOpen) {
      setCompleteModalOpen(true);
    }
  }, [
    totalPicksMade,
    draftComplete,
    lastPicksCount,
    dispatch,
    completeModalOpen,
  ]);

  const handleFinish = async () => {
    try {
      // Attach user id, persist pool, then navigate to pool home
      dispatch(setUserId(user.id));
      const token = await getToken();
      const storedPool = await dispatch(storePoolAsync({ token })).unwrap();
      dispatch(setPool(storedPool));

      localStorage.setItem('activePoolId', pool.id);
      localStorage.setItem('userId', user.id);

      // Optional: clean up draft state after successful store
      dispatch(resetDraft());

      navigate('/pool-home');
    } catch (err) {
      console.error('Failed to store pool from DraftPage: ', err);
    }
  };

  const handleResetDraft = () => {
    setResetConfirmOpen(true);
  };

  const handleConfirmReset = () => {
    // Clear selected teams from all players
    dispatch(clearAllPlayersTeams());
    // Reset draft progress to start
    dispatch(setDraftComplete(false));
    dispatch(setCurrentPickIndex(0));
    setLastPicksCount(0);
    setCompleteModalOpen(false);
    setResetConfirmOpen(false);
  };

  const handleCancelReset = () => {
    setResetConfirmOpen(false);
  };

  // Close reset modal on Escape key
  useEffect(() => {
    if (!resetConfirmOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setResetConfirmOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [resetConfirmOpen]);

  return (
    <div className={classes['draft-page']}>
      <div className={classes['page-title']}>
        <BackHeaderButton path="/choose-assignment-method" />
        <div className={classes['page-title-center']}>
          <h1>NFL Wins Pool Draft</h1>
          <p className={classes['subtitle']}>Draft teams for each player.</p>
        </div>
        <button
          type="button"
          className={classes.resetButton}
          onClick={handleResetDraft}
        >
          Reset Draft
        </button>
      </div>

      <div className={classes['content']}>
        {/* Left: Players list with current picker highlighted */}
        <section className={`${classes['card']} ${classes['players-column']}`}>
          <h3 className={classes['card-title']}>Players</h3>
          <ul className={classes['players-list']}>
            {/* Show a rolling 10-pick window starting from the current pick */}
            {pickOrder.length > 0 &&
              Array.from({ length: 10 }, (_, offset) => {
                const orderIdx =
                  (draft.currentPickIndex + offset) % pickOrder.length;
                const playerIdx = pickOrder[orderIdx];
                const p = players[playerIdx];
                if (!p) return null;

                const pickNumber = draft.currentPickIndex + offset + 1; // global 1-based pick number
                const isCurrent = offset === 0 && !draftComplete;
                const isNext = offset === 1 && !draftComplete;

                return (
                  <li
                    key={`pick-${pickNumber}-${p.id || playerIdx}`}
                    className={`${classes['player']} ${isCurrent ? classes['current'] : ''} ${isNext ? classes['next-player'] : ''} ${isCurrent || isNext ? classes['has-status'] : ''}`}
                  >
                    {/* Status indicator above player info */}
                    {isCurrent && (
                      <span className={classes['player-status']}>
                        Currently Picking
                      </span>
                    )}
                    {isNext && (
                      <span className={classes['player-status']}>Up Next</span>
                    )}

                    <div className={classes['player-draft-container']}>
                      <div className={classes['player-left']}>
                        <img
                          src={`./wizpool-trophy-icon-512x512.png`}
                          alt="trophy"
                        />
                        <span className={classes['player-name']}>
                          {p.name || `Player ${playerIdx + 1}`}
                        </span>
                      </div>
                      <span className={classes['player-meta']}>
                        Pick #{pickNumber}
                      </span>
                    </div>
                  </li>
                );
              })}
          </ul>
        </section>

        {/* Middle: Available teams to pick */}
        <section className={`${classes['card']} ${classes['teams-column']}`}>
          <h3 className={classes['card-title']}>Available Teams</h3>
          <div className={classes['teams-list-wrap']}>
            {/* Only render TeamsList when a league is selected to avoid API errors */}
            {pool.league ? (
              <MockDraftTeamsList playerIndex={currentPlayerIndex} />
            ) : (
              <div className={classes['empty-state']}>
                <p>Please choose a league first to load available teams.</p>
              </div>
            )}
          </div>
        </section>

        {/* Right: Draft results per player */}
        <section className={`${classes['card']} ${classes['results-column']}`}>
          <h3 className={classes['card-title']}>Draft Board</h3>
          <div className={classes['results-list']}>
            {players.map((p, idx) => {
              // Calculate pick numbers for this player
              const playerPickNumbers = pickOrder
                .map((playerIdx, pickIdx) => ({
                  playerIdx,
                  pickNumber: pickIdx + 1,
                }))
                .filter((pick) => pick.playerIdx === idx)
                .map((pick) => pick.pickNumber);

              return (
                <div key={p.id} className={classes['result-player']}>
                  <div className={classes['result-player-header']}>
                    <div className={classes['result-player-name']}>
                      {p.name || `Player ${idx + 1}`}
                      {playerPickNumbers.length > 0 && (
                        <span className={classes['player-picks']}>
                          picks {playerPickNumbers.join(', ')}
                        </span>
                      )}
                    </div>
                  </div>
                  <ul className={classes['result-teams']}>
                    {(players[idx]?.teams || []).map((t) => (
                      <li key={t.key}>
                        {t.city} {t.name}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div
          className={classes.modalBackdrop}
          role="presentation"
          onClick={handleCancelReset}
        >
          <div
            className={classes.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={classes.modalClose}
              aria-label="Close"
              onClick={handleCancelReset}
            >
              ×
            </button>
            <h3 id="reset-title" className={classes.modalTitle}>
              Reset Draft?
            </h3>
            <p className={classes.modalBody}>
              This will clear all teams selected so far and reset the draft back
              to the first pick. This action cannot be undone.
            </p>
            <div className={classes.modalActions}>
              <button
                type="button"
                className={classes.modalSecondary}
                onClick={handleCancelReset}
              >
                Cancel
              </button>
              <PrimaryActionButton
                text="Reset"
                handleClick={handleConfirmReset}
              />
            </div>
          </div>
        </div>
      )}

      {/* Completion Modal */}
      {completeModalOpen && (
        <div className={classes.modalBackdrop} role="presentation">
          <div
            className={classes.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="complete-title"
          >
            <h3 id="complete-title" className={classes.modalTitle}>
              Draft Complete!{' '}
            </h3>
            <p className={classes.modalBody}>
              Each player has selected 3 teams. You may not head over to the
              standings page.
            </p>
            <div className={classes.modalActions}>
              <PrimaryActionButton
                text="Complete Draft"
                handleClick={handleFinish}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
