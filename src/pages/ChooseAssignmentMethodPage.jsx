import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackHeaderButton from '../components/BackHeaderButton';
import classes from './ChooseAssignmentMethodPage.module.css';
import { useSelector } from 'react-redux';

export default function ChooseAssignmentMethodPage() {
  const [selectedMethod, setSelectedMethod] = useState('');
  const pool = useSelector((state) => state.pool);
  const hasTenPlayers = (pool?.players?.length ?? 0) === 10;
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedMethod === 'manual') {
      navigate('/choose-player');
    } else if (selectedMethod === 'draft' && hasTenPlayers) {
      navigate('/draft');
    }
  };

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    handleNext();
  };

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
    </div>
  );
}
