import classes from './SelectTeamSection.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import usePool from '../utils/usePool';
import Pool from '../utils/Pool';

const getInitialIsSelected = (player, teamName) => {
  return player.nbaTeams?.includes(teamName) ? true : false;
};

export default function SelectTeamSection(props) {
  const { pool, setPool } = usePool();
  const [isSelected, setIsSelected] = useState(
    getInitialIsSelected(pool.players[props.playerIndex], props.teamName),
  );

  const toggleSelect = (teamName) => {
    // Getting pool from localStorage because state doesn't seem to be updating
    // before the next team is selecting but the team is being added to localStorage
    const { poolName, players } = JSON.parse(localStorage.getItem('pool'));
    const updatedPool = new Pool(poolName, players);
    const playerTeams =
      updatedPool.players[props.playerIndex]['nbaTeams'] || [];
    // Check if team is already selected
    if (playerTeams.includes(teamName)) {
      // If it is already selected remove the team from the player
      updatedPool.players[props.playerIndex].nbaTeams = playerTeams.filter(
        (currentTeamName) => currentTeamName !== teamName,
      );
      // Update the isSelected value to false to update the button
      setIsSelected(false);
    } else {
      // If it isn't already selected add the team to the player
      updatedPool.players[props.playerIndex]['nbaTeams'] = [
        ...playerTeams,
        teamName,
      ];
      // Update the isSelected value to true to udpate the button
      setIsSelected(true);
    }
    // Update the pool
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
  playerIndex: PropTypes.string,
};
