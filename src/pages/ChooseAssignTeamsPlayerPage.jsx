import PropTypes from 'prop-types';
import PrimaryLinkButton from '../components/PrimaryLinkButton';
import PrimaryActioButton from '../components/PrimayActionButton';

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

function PlayerProfile({ player }) {
  return (
    <div className="player">
      <div className="player-info">
        <img className="team-icon" src={player.icon} alt="team icon" />
        <div>
          <h5>{player.name}</h5>
          <span className="profile-team-name">
            {player.teamName
              ? player.teamName
              : `${player.name}'s Awesome Team`}
          </span>
        </div>
      </div>
      <PrimaryActioButton
        props={{
          text: `Assign Teams to ${player.name}`,
          handleClick: () => console.log(player.name),
        }}
      />
    </div>
  );
}

PlayerProfile.propTypes = {
  player: PropTypes.object,
};

const players = [
  {
    name: 'John Doe',
    teamName: "John's Super Team",
    icon: './public/team-icon-1-200x200.png',
  },
  {
    name: 'Jane Smith',
    teamName: 'Great Janes',
    icon: './public/team-icon-2-200x200.png',
  },
];
