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
    </div>
  );
};

export default Landing;
