import classes from './SelectLeagueButtons.module.css';

export default function SelectLeagueButtons() {
  return (
    <div className={classes['select-league-container']}>
      <button className={classes['select-league-btn']}>
        <img
          className={classes['league-logo']}
          src="../public/nfl-logos/nfl-logo.png"
          alt="National Football League shield logo"
        />
        NFL
      </button>
      <button className={classes['select-league-btn']}>
        <img
          className={classes['league-logo']}
          src="../public/nba-logos/nba-logo.png"
          alt="National Basketball Association logo"
        />
        NBA
      </button>
      <button className={classes['select-league-btn']}>
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
