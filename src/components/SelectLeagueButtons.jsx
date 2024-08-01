import { useState } from 'react';
import classes from './SelectLeagueButtons.module.css';
import PropTypes from 'prop-types';
import addBasePath from '../utils/addBasePath';

export default function SelectLeagueButtons({ handleSetLeague }) {
  const [selectedLeague, setSelectedLeague] = useState('');

  const setLeague = (selectedLeague) => {
    setSelectedLeague(selectedLeague);
    handleSetLeague(selectedLeague);
  };

  return (
    <div className={classes['select-league-container']}>
      <button
        className={`${classes['select-league-btn']} ${selectedLeague === 'nfl' ? classes['selected'] : ''}`}
        onClick={() => setLeague('nfl')}
      >
        <img
          className={classes['league-logo']}
          src={addBasePath('/nfl-logos/nfl-logo.png')}
          alt="National Football League shield logo"
        />
        NFL
      </button>
      <button
        className={`${classes['select-league-btn']} ${selectedLeague === 'nba' ? classes['selected'] : ''}`}
        onClick={() => setLeague('nba')}
      >
        <img
          className={classes['league-logo']}
          src={addBasePath('/nba-logos/nba-logo.png')}
          alt="National Basketball Association logo"
        />
        NBA
      </button>
      <button
        className={`${classes['select-league-btn']} ${selectedLeague === 'mlb' ? classes['selected'] : ''}`}
        onClick={() => setLeague('mlb')}
      >
        <img
          className={classes['league-logo']}
          src={addBasePath('/mlb-logos/mlb-logo.png')}
          alt="Major League Baseball logo"
        />
        MLB
      </button>
    </div>
  );
}

SelectLeagueButtons.propTypes = {
  handleSetLeague: PropTypes.func,
};
