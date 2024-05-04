import classes from './TeamsList.module.css';
import { nflTeams } from '../data';

export default function TeamsList() {
  return (
    <div className={classes['teams-list']}>
      {nflTeams.map((team, index) => {
        return (
          <div key={index} className={classes['select-team-container']}>
            <h5>{team.teamName}</h5>
            <button className={classes['select-btn']}>Select</button>
          </div>
        );
      })}
    </div>
  );
}
