import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <img
          className="nav-logo"
          src="./wizpool-wordmark-230x70.png"
          alt="WizPool logo"
        />
        <button className="nav-button" onClick={() => navigate('/dashboard')}>
          Go to App
        </button>
      </nav>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Discover the magic of WizPool</h1>
          <p>Track your season long wins pool with ease.</p>
          <button className="cta-button" onClick={() => navigate('/dashboard')}>
            Go to WizPool
          </button>
        </div>
      </section>
      <section className="standings-section">
        <div className="standings-container">
          <div className="standings-image">
            <img
              src="standing-board.png"
              alt="WizPool Standings Board showing player rankings"
            />
          </div>
          <div className="standings-content">
            <h2>Current Standings Board</h2>
            <p>
              The league standings board tracks each players' total wins and
              displays how players compare to each other. Team win loss records
              are updated automatically for effortless tracking.
            </p>
          </div>
        </div>
      </section>
      <section className="teams-section">
        <div className="teams-container">
          <div className="teams-content">
            <h2>View Players' Teams</h2>
            <p>
              See the teams each player selected with their current season wins
              loss record. This allows players to see which teams are
              contributing to their total wins.
            </p>
          </div>
          <div className="teams-image">
            <img
              src="players-teams.png"
              alt="WizPool Player Teams display showing team selections and records"
            />
          </div>
        </div>
      </section>

      <section className="picks-section">
        <div className="picks-container">
          <div className="picks-image">
            <img
              src="league-picks.png"
              alt="WizPool Team Selection List showing teams and their records"
            />
          </div>
          <div className="picks-content">
            <h2>Team Selection List</h2>
            <p>
              See each team that has been selected and the player who selected the teams.
              This list is shown from best to worst record, so players can see which
              players have the teams with the best records.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
