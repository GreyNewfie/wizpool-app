import classes from '../SelectedItemButton.module.css';
import PropTypes from 'prop-types';
import usePool from '../utils/usePool';

export default function SelectTeamSection(props) {
  const [pool, setPool] = usePool();
  const isSelected = selectedTeams.includes(teamName);

  const toggleSelect = (teamName) => {
    if (selectedTeams.includes(teamName)) {
      setSelectedTeams(selectedTeams.filter((team) => team !== teamName));
    } else {
      setSelectedTeams([...selectedTeams, teamName]);
      updatePlayerTeams(teamName);
    }
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
  playerId: PropTypes.number,
};
