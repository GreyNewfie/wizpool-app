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
            <h2>Selected Teams List</h2>
            <p>
              See each team that has been selected and the player who selected
              them. This list is shown from best to worst record, so players can
              quickly see which players have the teams with the best and worst
              records.
            </p>
          </div>
        </div>
      </section>

      <section className="features-grid-section">
        <div className="features-grid-container">
          <div className="feature-card">
            <div className="feature-card-icon">
              <img src="invite-players.png" alt="Invite Players Feature" />
            </div>
            <div className="feature-card-content">
              <h3>Invite Players</h3>
              <p>Easily invite new players to join your pool with a simple invitation link.</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-card-icon">
              <img src="manage-players.png" alt="Manage Players Feature" />
            </div>
            <div className="feature-card-content">
              <h3>Manage Players</h3>
              <p>Add, remove, or update player information with an intuitive management interface.</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-card-icon">
              <img src="manage-player-teams.png" alt="Manage Teams Feature" />
            </div>
            <div className="feature-card-content">
              <h3>Manage Teams</h3>
              <p>Assign and reassign teams to players throughout the season as needed.</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-card-icon">
              <img src="select-league.png" alt="Select League Feature" />
            </div>
            <div className="feature-card-content">
              <h3>Select League</h3>
              <p>Choose between NFL, NBA, or MLB leagues to start your wins pool.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-left">
            <a href="https://github.com/GreyNewfie/wizpool-app" target="_blank" rel="noopener noreferrer" className="footer-link">
              About
            </a>
            <a href="https://github.com/GreyNewfie/wizpool-backend" target="_blank" rel="noopener noreferrer" className="footer-link">
              WizPool Backend
            </a>
          </div>
          <div className="footer-right">
            <div className="footer-author">
              <span>Built by Danny Simms</span>
            </div>
            <div className="footer-social">
              <a href="https://github.com/GreyNewfie" target="_blank" rel="noopener noreferrer" className="footer-link">
                <img src="github-mark-white.svg" alt="GitHub" className="footer-icon" />
              </a>
              <a href="https://www.linkedin.com/in/danny-simms-2a14631a4/" target="_blank" rel="noopener noreferrer" className="footer-link">
                <img src="linkedin.svg" alt="LinkedIn" className="footer-icon" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
