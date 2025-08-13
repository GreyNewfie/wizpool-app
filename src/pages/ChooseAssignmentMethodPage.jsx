import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackHeaderButton from '../components/BackHeaderButton';
import PrimaryActionButton from '../components/PrimaryActionButton';
import classes from './ChooseAssignmentMethodPage.module.css';

export default function ChooseAssignmentMethodPage() {
  const [selectedMethod, setSelectedMethod] = useState('');
  const navigate = useNavigate();

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleNext = () => {
    if (selectedMethod === 'manual') {
      navigate('/choose-player');
    } else if (selectedMethod === 'draft') {
      // TODO: Navigate to draft setup page when implemented
      navigate('/choose-player'); // Temporary fallback
    }
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
            Manual Assignment
          </button>

          <button
            className={`${classes['method-btn']} ${selectedMethod === 'draft' ? classes['selected'] : ''}`}
            onClick={() => handleMethodSelect('draft')}
          >
            Mock Draft
          </button>
        </div>

        <PrimaryActionButton
          text="Continue"
          handleClick={handleNext}
          disabled={!selectedMethod}
        />
      </div>
    </div>
  );
}
