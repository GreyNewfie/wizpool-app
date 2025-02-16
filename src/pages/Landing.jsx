import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
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
