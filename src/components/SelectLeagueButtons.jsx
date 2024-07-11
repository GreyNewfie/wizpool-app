import { useState } from 'react';
import classes from './SelectLeagueButtons.module.css';
import PropTypes from 'prop-types';

export default function SelectLeagueButtons({ onClick }) {
  const [selectedLeague, setSelectedLeague] = useState('');

  const handleClick = (league) => {
    setSelectedLeague(league);
    onClick(league);
    console.log('Selected league is', league);
  };

  return (
    <div className={classes['select-league-container']}>
      <button
        className={`${classes['select-league-btn']} ${selectedLeague === 'nfl' ? classes['selected'] : ''}`}
        value={'nfl'}
        onClick={() => handleClick('nfl')}
      >
        <img
          className={classes['league-logo']}
          src="../public/nfl-logos/nfl-logo.png"
          alt="National Football League shield logo"
        />
        NFL
      </button>
      <button
        className={`${classes['select-league-btn']} ${selectedLeague === 'nba' ? classes['selected'] : ''}`}
        onClick={() => handleClick('nba')}
      >
        <img
          className={classes['league-logo']}
          src="../public/nba-logos/nba-logo.png"
          alt="National Basketball Association logo"
        />
        NBA
      </button>
      <button
        className={`${classes['select-league-btn']} ${selectedLeague === 'mlb' ? classes['selected'] : ''}`}
        onClick={() => handleClick('mlb')}
      >
        <img
          className={classes['league-logo']}
          src="../public/mlb-logos/mlb-logo.png"
          alt="Major League Baseball logo"
        />
        MLB
      </button>
    </div>
  );
}

SelectLeagueButtons.propTypes = {
  onClick: PropTypes.func,
};
