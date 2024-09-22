import classes from './SelectTeamSection.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

const isTeamSelected = (player, team) => {
  return player.teams?.some((playerTeam) => playerTeam.name === team.name)
    ? true
    : false;
};

const toggleSelect = (
  updatedPool,
  setPool,
  team,
  playerIndex,
  setIsSelected,
) => {
  const playerTeams = updatedPool.players[playerIndex]['teams'] || [];
  // Check if team is already selected, and if so, remove it from the player
  if (isTeamSelected(updatedPool.players[playerIndex], team)) {
    updatedPool.players[playerIndex].teams = playerTeams.filter(
      (currentTeam) => currentTeam.name !== team.name,
    );
    // Update the isSelected value to false to update the button
    setIsSelected(false);
  } else {
    // If it isn't already selected add the team to the player
    updatedPool.players[playerIndex]['teams'] = [...playerTeams, team];
    // Update the isSelected value to true to udpate the button
    setIsSelected(true);
  }

  setPool(updatedPool);
};

export default function SelectTeamSection(props) {
  const [isSelected, setIsSelected] = useState(
    isTeamSelected(props.updatedPool.players[props.playerIndex], props.team),
  );
  const lowerCaseTeamId = props.team.teamId.toLowerCase();
  const baseUrl = import.meta.env.VITE_BASE_PATH || '/wizpool-app/';

  return (
    <div key={props.teamIndex} className={classes['select-team-container']}>
      <div className={classes['team-info-container']}>
        <img
          className={classes['select-team-icon']}
          src={`${baseUrl}${props.league}-logos/${lowerCaseTeamId}-logo.png`}
          alt={`${props.team.city} ${props.team.name} ${props.league} team logo`}
        />
        <p>{`${props.team.city} ${props.team.name}`}</p>
      </div>
      <button
        className={`${classes['select-btn']} ${isSelected ? classes['selected'] : ''}`}
        onClick={() =>
          toggleSelect(
            props.updatedPool,
            props.setPool,
            props.team,
            props.playerIndex,
            setIsSelected,
          )
        }
      >
        {isSelected ? 'Selected' : 'Select'}
      </button>
    </div>
  );
}

SelectTeamSection.propTypes = {
  league: PropTypes.string,
  team: PropTypes.object,
  teamIndex: PropTypes.number,
  playerIndex: PropTypes.number,
  updatedPool: PropTypes.object.isRequired,
  setPool: PropTypes.func.isRequired,
};
