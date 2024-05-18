import classes from '../SelectedItemButton.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import usePool from '../utils/usePool';

export default function SelectTeamSection(props) {
  const [pool, setPool, copyPool] = usePool();
  const [isSelected, setIsSelected] = useState(false);
  const player = pool.players[props.playerIndex];

  const toggleSelect = (teamName) => {
    if (player['nbaTeams'].includes(teamName)) {
      setIsSelected(true);
    } else {
      updatePlayerTeams(teamName);
      setIsSelected(true);
    }
  };

  const updatePlayerTeams = (teamName) => {
    const updatedPool = copyPool(pool);
    updatedPool.players[props.playerIndex]['nbaTeams'] = {
      ...updatedPool.players[props.playerIndex]['nbaTeams'],
      teamName,
    };
    setPool(updatedPool);
  };

  return (
    <div key={props.index} className={classes['select-team-container']}>
      <p>{props.teamName}</p>
      <button
        className={`${classes['select-btn']} ${isSelected ? classes['selected'] : ''}`}
        onClick={() => toggleSelect(props.teamName)}
      >
        {isSelected ? 'Selected' : 'Select'}
      </button>
    </div>
  );
}

SelectTeamSection.propTypes = {
  teamName: PropTypes.string,
  index: PropTypes.number,
  playerIndex: PropTypes.number,
};
