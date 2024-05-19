import classes from './TeamsList.module.css';
import PropTypes from 'prop-types';
import useApi from '../utils/useApi';
import SelectTeamSection from './SelectTeamSection';

export default function TeamsList({ playerId }) {
  const { getAllNbaTeamNames } = useApi();
  const nbaTeamNames = getAllNbaTeamNames();

  return (
    <div className={classes['teams-list']}>
      {nbaTeamNames.map((teamName, index) => {
        return (
          <SelectTeamSection
            key={index}
            index={index}
            teamName={teamName}
            playerIndex={playerId}
          />
        );
      })}
    </div>
  );
}

TeamsList.propTypes = {
  playerId: PropTypes.string,
};
