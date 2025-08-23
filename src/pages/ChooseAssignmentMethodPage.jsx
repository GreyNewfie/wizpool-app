import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackHeaderButton from '../components/BackHeaderButton';
import classes from './ChooseAssignmentMethodPage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setDraftOrder } from '../state/draftSlice';

export default function ChooseAssignmentMethodPage() {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const pool = useSelector((state) => state.pool);
  const draftOrder = useSelector((state) => state.draft.draftOrder || 'random');
  const hasTenPlayers = (pool?.players?.length ?? 0) === 10;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    if (method === 'manual') {
      navigate('/choose-player');
    } else if (method === 'draft') {
      if (hasTenPlayers) {
        setOrderModalOpen(true);
      }
    }
  };

  const handleStartDraft = () => {
    if (!hasTenPlayers) return;
    navigate('/draft');
  };

  const handleCloseModal = () => setOrderModalOpen(false);

  // Close modal on Escape
  useEffect(() => {
    if (!orderModalOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOrderModalOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [orderModalOpen]);

  return (
    <div className={classes['assignment-method-container']}>
      <div className={classes['assignment-method-header']}>
        <BackHeaderButton path="/create-pool" />
        <h1>Choose Assignment Method</h1>
      </div>

      <div className={classes['assignment-method-content']}>
        <p className={classes['page-description']}>
          How would you like to assign teams to players?
        </p>

        <div className={classes['method-selection-container']}>
          <button
            className={`${classes['method-btn']} ${selectedMethod === 'manual' ? classes['selected'] : ''}`}
            onClick={() => handleMethodSelect('manual')}
          >
            Manually Assign
          </button>

          <button
            className={`${classes['method-btn']} ${selectedMethod === 'draft' ? classes['selected'] : ''}`}
            onClick={() => handleMethodSelect('draft')}
            disabled={!hasTenPlayers}
          >
            Draft
          </button>
          {!hasTenPlayers && (
            <p className={classes['disabled-note']}>
              Draft is only available for pools with 10 players
            </p>
          )}
        </div>
      </div>

      {/* Draft Order Modal */}
      {orderModalOpen && (
        <div
          className={classes.modalBackdrop}
          role="presentation"
          onClick={handleCloseModal}
        >
          <div
            className={classes.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={classes.modalClose}
              aria-label="Close"
              onClick={handleCloseModal}
            >
              ×
            </button>
            <h3 id="order-title" className={classes.modalTitle}>
              Choose Draft Order
            </h3>

            <div className={classes['order-options']}>
              <label
                className={`${classes['option-card']} ${draftOrder === 'random' ? classes['selected'] : ''}`}
              >
                <input
                  className={classes['option-radio']}
                  type="radio"
                  name="draftOrder"
                  value="random"
                  checked={draftOrder === 'random'}
                  onChange={() => dispatch(setDraftOrder('random'))}
                />
                <div className={classes['option-content']}>
                  <span className={classes['option-title']}>Random</span>
                  <span className={classes['option-subtitle']}>
                    The order will be randomized
                  </span>
                </div>
              </label>

              <label
                className={`${classes['option-card']} ${draftOrder === 'pool' ? classes['selected'] : ''}`}
              >
                <input
                  className={classes['option-radio']}
                  type="radio"
                  name="draftOrder"
                  value="pool"
                  checked={draftOrder === 'pool'}
                  onChange={() => dispatch(setDraftOrder('pool'))}
                />
                <div className={classes['option-content']}>
                  <span className={classes['option-title']}>Pool Order</span>
                  <span className={classes['option-subtitle']}>
                    The order will be based on the pool order
                  </span>
                </div>
              </label>
            </div>

            <div className={classes.modalActions}>
              <button
                type="button"
                className={classes.modalSecondary}
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className={classes.modalPrimary}
                onClick={handleStartDraft}
                disabled={!hasTenPlayers}
              >
                Start Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
