import classes from './PlayerWinsTracker.module.css';

export default function PlayerWinsTracker({ player }) {
  return (
    <div className={classes['wins-tracker-container']}>
      <span className={classes['wins-tracker']}>10 Wins</span>
    </div>
  );
}
