import PropTypes from 'prop-types';
import PrimaryLinkButton from '../components/PrimaryLinkButton';
import PlayerProfile from '../components/PlayerProfile';
import { players } from '../data';

export default function ChooseAssignTeamsPlayerPage() {
  return (
    <div className="assign-teams-page">
      <PageHeader header={'Assign Teams'} />
      <div className="select-player">
        <h3>Select a player to assign teams</h3>
        {players.map((player, index) => {
          return <PlayerProfile key={index} player={player} />;
        })}
      </div>
      <PrimaryLinkButton text={'Next'} />
    </div>
  );
}

function PageHeader({ header }) {
  return (
    <div className="page-header">
      <button className="back-btn">&#8592;</button>
      <h3>{header}</h3>
      <button className="save-btn">Save</button>
    </div>
  );
}

PageHeader.propTypes = {
  header: PropTypes.string,
};
