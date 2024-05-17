import classes from './TeamsList.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { nflTeams } from '../data';
import usePool from '../utils/usePool';
import Pool from '../utils/Pool';
import useApi from '../utils/useApi';

export default function TeamsList({ playerId }) {
  const [selectedTeams, setSelectedTeams] = useState([]);
  const { pool, setPool } = usePool();
  const { getAllNbaTeamNames } = useApi();
  const nbaTeamNames = getAllNbaTeamNames().sort();

  const toggleSelect = (teamName) => {
    if (selectedTeams.includes(teamName)) {
      setSelectedTeams(selectedTeams.filter((team) => team !== teamName));
    } else {
      setSelectedTeams([...selectedTeams, teamName]);
    }
  };

  function copyPool(pool) {
    const copyOfPool = new Pool('', []);
    copyOfPool.updatePool(pool);
    return copyOfPool;
  }

  const updatePlayerTeams = () => {
    const updatedPool = copyPool(pool);
    updatedPool.players[playerId] = {
      ...updatedPool.players[playerId],
      playerTeams: selectedTeams,
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
