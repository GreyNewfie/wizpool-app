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
    </div>
  );
};

export default Landing;
