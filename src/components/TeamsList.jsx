import classes from './TeamsList.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import usePool from '../utils/usePool';
import useApi from '../utils/useApi';

export default function TeamsList({ playerId }) {
  const [selectedTeams, setSelectedTeams] = useState([]);
  const { pool, setPool, copyPool } = usePool();
  const { getAllNbaTeamNames } = useApi();
  const nbaTeamNames = getAllNbaTeamNames();
  const playerIndex = playerId;

  const toggleSelect = (teamName) => {
    if (selectedTeams.includes(teamName)) {
      setSelectedTeams(selectedTeams.filter((team) => team !== teamName));
    } else {
      setSelectedTeams([...selectedTeams, teamName]);
      updatePlayerTeams(teamName);
    }
  };

  const updatePlayerTeams = (teamName) => {
    const updatedPool = copyPool(pool);
    updatedPool.players[playerIndex]['nbaTeams'] = {
      ...updatedPool.players[playerId]['nbaTeams'],
      teamName,
    };
    setPool(updatedPool);
  };

  return (
    <div className={classes['teams-list']}>
      {nbaTeamNames.map((teamName, index) => {
        const isSelected = selectedTeams.includes(teamName);
        return (
          <div key={index} className={classes['select-team-container']}>
            <p>{teamName}</p>
            <button
              className={`${classes['select-btn']} ${isSelected ? classes['selected'] : ''}`}
              onClick={() => toggleSelect(teamName)}
            >
              {isSelected ? 'Selected' : 'Select'}
            </button>
          </div>
        );
      })}
    </div>
  );
}

TeamsList.propTypes = {
  playerId: PropTypes.string,
};
