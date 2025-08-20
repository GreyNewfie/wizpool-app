import PropTypes from 'prop-types';
import AddPlayer from './AddPlayer';
import { useSelector } from 'react-redux';

export default function PlayersList(props) {
  const pool = useSelector((state) => state.pool);
  const poolHasName =
    !!pool?.name && pool.name.replace(/[^a-zA-Z]/g, '').length > 0;
  const firstEmptyIndex = pool.players.findIndex(
    (p) => !(p?.name && p.name.replace(/[^a-zA-Z]/g, '').length > 0),
  );
  const allPlayersHaveNameAndTeamName = pool.players.every((p) => {
    const allPlayersHaveNames =
      !!p?.name && p.name.replace(/[^a-zA-Z]/g, '').length > 0;
    const allPlayersHaveTeamNames =
      !!p?.teamName && p.teamName.replace(/[^a-zA-Z]/g, '').length > 0;
    return allPlayersHaveNames && allPlayersHaveTeamNames;
  });

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
            autoFocusPlayerName={
              poolHasName &&
              allPlayersHaveNameAndTeamName &&
              index === firstEmptyIndex
            }
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
