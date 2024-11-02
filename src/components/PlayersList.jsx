import PropTypes from 'prop-types';
import AddPlayer from './AddPlayer';

export default function PlayersList(props) {
  return (
    <>
      {props.players.map((_, index) => {
        return (
          <AddPlayer
            key={index}
            playerId={index}
            playerName={props.players[index]?.playerName ?? ''}
            teamName={props.players[index]?.teamName ?? ''}
            handlePlayerNameChange={(e) =>
              props.handlePlayerNameChange(e.target.value, index)
            }
            handleTeamNameChange={(e) =>
              props.handleTeamNameChange(e.target.value, index)
            }
            autoFocusPlayerName={
              !props.players[index]?.playerName ? true : false
            }
            autoFocusTeamName={false}
          />
        );
      })}
    </>
  );
}

PlayersList.propTypes = {
  players: PropTypes.array,
  handlePlayerNameChange: PropTypes.func,
  handleTeamNameChange: PropTypes.func,
};
