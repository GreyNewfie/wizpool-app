import PrimaryButton from '../components/primary-button';

export default function ChooseAssignTeamsPlayer() {
  return (
    <div className="assign-teams-page">
      <PageHeader header={'Assign Teams'} />
      <div className="select-player">
        <h3>Select a player to assign teams</h3>
        {players.map((player) => {
          return <PlayerProfile player={player} />;
        })}
      </div>
      <PrimaryButton text={'Next'} />
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
      <PrimaryButton text={`Assign Teams to ${player.name}`} />
    </div>
  );
}

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
