import classes from './SelectTeamSection.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import usePool from '../utils/usePool';
import Pool from '../utils/Pool';

const isTeamSelected = (player, team) => {
  return player.nbaTeams?.some((playerTeam) => playerTeam.name === team.name)
    ? true
    : false;
};

export default function SelectTeamSection(props) {
  const { pool, setPool } = usePool();
  const [isSelected, setIsSelected] = useState(
    isTeamSelected(pool.players[props.playerIndex], props.team),
  );

  const toggleSelect = (team) => {
    // Getting pool from localStorage because state doesn't seem to be updating
    // before the next team is selecting but the team is being added to localStorage

    //*** Q2 Error that usePool() is not a func ***/
    // const updatedPool = pool.usePool();

    const { poolName, players } = JSON.parse(localStorage.getItem('pool'));
    const updatedPool = new Pool(poolName, players);

    /*** Q3 Issue to using pool object trying to update player ****/
    // const updatedPool = new Pool(pool.name, pool.players);

    const playerTeams =
      updatedPool.players[props.playerIndex]['nbaTeams'] || [];
    // Check if team is already selected, and if so, remove it from the player
    if (isTeamSelected(updatedPool.players[props.playerIndex], team)) {
      updatedPool.players[props.playerIndex].nbaTeams = playerTeams.filter(
        (currentTeam) => currentTeam.name !== team.name,
      );
      // Update the isSelected value to false to update the button
      setIsSelected(false);
    } else {
      // If it isn't already selected add the team to the player
      updatedPool.players[props.playerIndex]['nbaTeams'] = [
        ...playerTeams,
        team,
      ];
      // Update the isSelected value to true to udpate the button
      setIsSelected(true);
    }
    setPool(updatedPool);
  };

  return (
    <div key={props.teamIndex} className={classes['select-team-container']}>
      <p>{`${props.team.city} ${props.team.name}`}</p>
      <button
        className={`${classes['select-btn']} ${isSelected ? classes['selected'] : ''}`}
        onClick={() => toggleSelect(props.team)}
      >
        {isSelected ? 'Selected' : 'Select'}
      </button>
    </div>
  );
}

SelectTeamSection.propTypes = {
  team: PropTypes.object,
  teamIndex: PropTypes.number,
  playerIndex: PropTypes.string,
};
