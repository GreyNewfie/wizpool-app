import classes from './SelectTeamSection.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  setPool,
  addTeamToPlayer,
  removeTeamFromPlayer,
} from '../state/poolSlice';

const isTeamSelected = (player, team) => {
  return player.teams?.some((playerTeam) => playerTeam.name === team.name)
    ? true
    : false;
};

export default function SelectTeamSection(props) {
  const dispatch = useDispatch();
  const pool = useSelector((state) => state.pool);
  const [isSelected, setIsSelected] = useState(
    isTeamSelected(pool.players[props.playerIndex], props.team),
  );
  const lowerCaseTeamId = props.team.teamId.toLowerCase();
  const baseUrl = import.meta.env.VITE_BASE_PATH || '/wizpool-app/';

  const toggleSelect = (pool, team, playerIndex, setIsSelected) => {
    // Check if team is already selected, and if so, remove it from the player
    if (isTeamSelected(pool.players[playerIndex], team)) {
      dispatch(removeTeamFromPlayer({ team, playerIndex }));
      // Update the isSelected value to false to update the button
      setIsSelected(false);
    } else {
      // If it isn't already selected add the team to the player
      dispatch(addTeamToPlayer({ team, playerIndex }));
      // Update the isSelected value to true to udpate the button
      setIsSelected(true);
    }
  };

  return (
    <div key={props.teamIndex} className={classes['select-team-container']}>
      <div className={classes['team-info-container']}>
        <img
          className={classes['select-team-icon']}
          src={`${baseUrl}${pool.league}-logos/${lowerCaseTeamId}-logo.png`}
          alt={`${props.team.city} ${props.team.name} ${pool.league} team logo`}
        />
        <p>{`${props.team.city} ${props.team.name}`}</p>
      </div>
      <button
        className={`${classes['select-btn']} ${isSelected ? classes['selected'] : ''}`}
        onClick={() =>
          toggleSelect(pool, props.team, props.playerIndex, setIsSelected)
        }
      >
        {isSelected ? 'Selected' : 'Select'}
      </button>
    </div>
  );
}

SelectTeamSection.propTypes = {
  team: PropTypes.object,
  teamIndex: PropTypes.number,
  playerIndex: PropTypes.number,
  setTeam: PropTypes.func.isRequired,
};
