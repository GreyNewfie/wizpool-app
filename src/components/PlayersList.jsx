import PropTypes from 'prop-types';
import AddPlayer from './AddPlayer';
import { useSelector } from 'react-redux';

export default function PlayersList(props) {
  const pool = useSelector((state) => state.pool);
  return (
    <>
      {pool.players.map((_, index) => {
        return (
          <AddPlayer
            key={index}
            playerId={index}
            playerName={pool.players[index]?.name ?? ''}
            teamName={pool.players[index]?.teamName ?? ''}
            handlePlayerNameChange={(e) =>
              props.handlePlayerNameChange(e.target.value, index)
            }
            handleTeamNameChange={(e) =>
              props.handleTeamNameChange(e.target.value, index)
            }
            autoFocusPlayerName={!pool.players[index]?.name ? true : false}
            autoFocusTeamName={false}
          />
        );
      })}
    </>
  );
}

PlayersList.propTypes = {
  handlePlayerNameChange: PropTypes.func,
  handleTeamNameChange: PropTypes.func,
};
