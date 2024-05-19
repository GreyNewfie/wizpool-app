import classes from './SelectTeamSection.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import usePool from '../utils/usePool';
import Pool from '../utils/Pool';

export default function SelectTeamSection(props) {
  const { pool, setPool, copyPool, getPoolFromStorage } = usePool();
  const [isSelected, setIsSelected] = useState(false);
  const player = pool.players[props.playerIndex];

  const toggleSelect = (teamName) => {
    if (player['nbaTeams']?.includes(teamName)) {
      setIsSelected(true);
    }
  };

  const updatePlayerTeams = (teamName) => {
    // Getting pool from localStorage because state doesn't seem to be updating
    // before the next team is selecting but the team is being added to localStorage
    const { poolName, players } = getPoolFromStorage();
    const updatedPool = new Pool(poolName, players);

    // Log for debugging
    console.log(
      'Before update:',
      updatedPool.players[props.playerIndex]['nbaTeams'],
    );

    updatedPool.updatePlayerNbaTeams(teamName, props.playerIndex);

    // Log for debugging
    console.log(
      'After update:',
      updatedPool.players[props.playerIndex]['nbaTeams'],
    );

    setPool(updatedPool);
    toggleSelect(teamName);
  };

  return (
    <div key={props.index} className={classes['select-team-container']}>
      <p>{props.teamName}</p>
      <button
        className={`${classes['select-btn']} ${isSelected ? classes['selected'] : ''}`}
        onClick={() => updatePlayerTeams(props.teamName)}
      >
        {isSelected ? 'Selected' : 'Select'}
      </button>
    </div>
  );
}

SelectTeamSection.propTypes = {
  teamName: PropTypes.string,
  index: PropTypes.number,
  playerIndex: PropTypes.string,
};
