import { useState } from 'react';
import classes from './SelectLeagueButtons.module.css';
import PropTypes from 'prop-types';

export default function SelectDraftStyleButtons({ handleSetDraftStyle }) {
  const [selectedDraftStyle, setSelectedDraftStyle] = useState('');

  const setDraftStyle = (selectedDraftStyle) => {
    setSelectedDraftStyle(selectedDraftStyle);
    handleSetDraftStyle(selectedDraftStyle);
  };

  return (
    <div className={classes['select-league-container']}>
      <button
        className={`${classes['select-league-btn']} ${selectedDraftStyle === 'assign-teams' ? classes['selected'] : ''}`}
        onClick={() => setDraftStyle('manual')}
      >
        <img
          className={classes['league-logo']}
          src="./nfl-logos/nfl-logo.png"
          alt="National Football League shield logo"
        />
        Manual Draft
      </button>
      <button
        className={`${classes['select-league-btn']} ${selectedDraftStyle === 'draft-teams' ? classes['selected'] : ''}`}
        onClick={() => setDraftStyle('live')}
      >
        <img
          className={classes['league-logo']}
          src="./nba-logos/nba-logo.png"
          alt="National Basketball Association logo"
        />
        Live Draft
      </button>
    </div>
  );
}

SelectDraftStyleButtons.propTypes = {
  handleSetDraftStyle: PropTypes.func,
};
