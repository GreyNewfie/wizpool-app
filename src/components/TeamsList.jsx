import classes from './TeamsList.module.css';
import { useState } from 'react';
import { nflTeams } from '../data';

export default function TeamsList() {
  const [selectedTeams, setSelectedTeams] = useState([]);

  const toggleSelect = (teamName) => {
    if (selectedTeams.includes(teamName)) {
      setSelectedTeams(selectedTeams.filter((team) => team !== teamName));
    } else {
      setSelectedTeams([...selectedTeams, teamName]);
    }
  };

  return (
    <div className={classes['teams-list']}>
      {nflTeams.map((team, index) => {
        const isSelected = selectedTeams.includes(team.teamName);
        return (
          <div key={index} className={classes['select-team-container']}>
            <p>{team.teamName}</p>
            <button
              className={`${classes['select-btn']} ${isSelected ? classes['selected'] : ''}`}
              onClick={() => toggleSelect(team.teamName)}
            >
              {isSelected ? 'Selected' : 'Select'}
            </button>
          </div>
        );
      })}
    </div>
  );
}
