import PropTypes from 'prop-types';
import PrimaryLinkButton from '../components/PrimaryLinkButton';
import PlayerProfile from '../components/PlayerProfile';
import { players } from '../data';
import PageHeader from '../components/PageHeader';
import usePool from '../utils/usePool';

export default function ChoosePlayerPage() {
  const { getStoredPool } = usePool();
  const storedPool = getStoredPool();
  return (
    <div className="assign-teams-page">
      <PageHeader headerText="Assign Teams" path="/create-pool" />
      <div className="select-player">
        <h3>Select a player to assign teams</h3>
        {storedPool.players.map((player, index) => {
          return <PlayerProfile key={index} player={player} index={index} />;
        })}
      </div>
      <PrimaryLinkButton text="Next" />
    </div>
  );
}

PageHeader.propTypes = {
  header: PropTypes.string,
  pool: PropTypes.object,
};
