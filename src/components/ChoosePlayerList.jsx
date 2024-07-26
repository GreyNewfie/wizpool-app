import PlayerProfile from './PlayerProfile';
import classes from './ChoosePlayerList.module.css';
import PropTypes from 'prop-types';

export default function ChoosePlayerList({ poolPlayers }) {
  return (
    <div className={classes['select-player']}>
      <h3>Select a player to assign teams</h3>
      {poolPlayers.map((player, index) => {
        return <PlayerProfile key={index} player={player} index={index} />;
      })}
    </div>
  );
}

ChoosePlayerList.propTypes = {
  poolPlayers: PropTypes.array,
};
