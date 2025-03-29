import { useNavigate } from 'react-router-dom';
import classes from './AboutPage.module.css';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className={classes['about-page']}>
      {/* Header copied from Landing.jsx */}
      <nav className={classes['nav']}>
        <img
          className={classes['nav-logo']}
          src="./wizpool-wordmark-230x70.png"
          alt="WizPool logo"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        />
        <button
          className={classes['nav-button']}
          onClick={() => navigate('/dashboard')}
        >
          Go to App
        </button>
      </nav>

      {/* Hero section similar to Landing page */}
      <section className={classes['hero-section']}>
        <div className={classes['hero-content']}>
          <h1>About WizPool</h1>
          <p className={classes['about-description']}>
            WizPool is an app that allows you to track your season-long wins
            pool and see which player&apos;s teams will accumulate the most
            wins. It automatically tracks the win-loss record of each team,
            calculates the total wins of each player&apos;s chosen teams, and
            displays a standings board of who is in the lead at any given point.
          </p>
        </div>
      </section>

      <h2 className={classes['sections-heading']}>How to Create Your League</h2>

      {/* Guide sections with consistent left text, right image layout */}
      <section className={classes['guide-section']}>
        <div className={classes['guide-container']}>
          <div className={classes['guide-content']}>
            <h3>1. Choose Your League</h3>
            <p>
              Start by selecting which professional sports league you want to
              track: NFL, NBA, or MLB. Each league has its own season schedule
              and team structure.
            </p>
          </div>
          <div className={classes['guide-image']}>
            <img src="./select-league.png" alt="Select your league" />
          </div>
        </div>
      </section>

      <section className={classes['guide-section']}>
        <div className={classes['guide-container']}>
          <div className={classes['guide-content']}>
            <h3>2. Enter League Details</h3>
            <p>
              <strong>Name your league:</strong> Give your pool a unique name
              that represents your group.
            </p>
            <p>
              <strong>Enter players:</strong> Add the names of all participants
              in your pool. Player names are required, but team names are
              optional and can be added for fun.
            </p>
          </div>
          <div className={classes['guide-image']}>
            <img src="./manage-players.png" alt="Enter league details" />
          </div>
        </div>
      </section>

      <section className={classes['guide-section']}>
        <div className={classes['guide-container']}>
          <div className={classes['guide-content']}>
            <h3>3. Select Teams for Each Player</h3>
            <p>
              Assign NBA, NFL, or MLB teams to each player in your pool. The
              distribution of teams depends on your pool&apos;s rules and the
              number of participants.
            </p>
          </div>
          <div className={classes['guide-image']}>
            <img src="./manage-player-teams.png" alt="Add teams to players" />
          </div>
        </div>
      </section>

      <h2 className={classes['sections-heading']}>
        WizPool Takes Care of the Rest
      </h2>

      <section className={classes['features-section']}>
        <div className={classes['features-list']}>
          <ul>
            <li>Create your league dashboard</li>
            <li>Track wins and losses for all teams in real-time</li>
            <li>Calculate standings based on cumulative wins</li>
            <li>Update the leaderboard throughout the season</li>
          </ul>
        </div>
      </section>

      <section className={classes['wizpool-features']}>
        <div className={classes['feature-item']}>
          <h3 className={classes['feature-title']}>
            Creates Your Standings Dashboard
          </h3>
          <div className={classes['feature-row']}>
            <div className={classes['feature-image']}>
              <img
                src="./standing-board.png"
                alt="WizPool Standings Board showing player rankings"
              />
            </div>
            <div className={classes['feature-description']}>
              <p>
                Get the total wins for each player and creates a standings board
                with current league stats. The league standings board tracks
                each player&apos;s total wins and displays how players compare
                to each other. Team win-loss records are updated automatically
                for effortless tracking.
              </p>
            </div>
          </div>
        </div>

        <div className={classes['feature-item']}>
          <h3 className={classes['feature-title']}>
            Creates a Players&apos; Teams List
          </h3>
          <div className={classes['feature-row']}>
            <div className={classes['feature-image']}>
              <img
                src="./players-teams.png"
                alt="WizPool Player Teams display showing team selections and records"
              />
            </div>
            <div className={classes['feature-description']}>
              <p>
                Builds a list of pool players with the ability to view each
                individual player&apos;s teams with current win-loss records.
                This allows players to see which teams are contributing to their
                total wins throughout the season.
              </p>
            </div>
          </div>
        </div>

        <div className={classes['feature-item']}>
          <h3 className={classes['feature-title']}>
            Creates a Selected Teams List
          </h3>
          <div className={classes['feature-row']}>
            <div className={classes['feature-image']}>
              <img
                src="./league-picks.png"
                alt="WizPool Player's Picks List showing teams ordered by record"
              />
            </div>
            <div className={classes['feature-description']}>
              <p>
                Displays a list of the teams chosen in order from best to worst
                records, along with the player that picked each team. This gives
                everyone a clear view of which teams are performing best and who
                selected them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className={classes['cta-container']}>
        <button
          className={classes['cta-button']}
          onClick={() => navigate('/dashboard')}
        >
          Start Your League Now
        </button>
      </div>

      <footer className={classes['footer']}>
        <div className={classes['footer-content']}>
          <div className={classes['footer-left']}>
            <a href="/about" className={classes['footer-link']}>
              About
            </a>
            <a
              href="https://github.com/GreyNewfie/wizpool-backend"
              target="_blank"
              rel="noopener noreferrer"
              className={classes['footer-link']}
            >
              WizPool Backend
            </a>
          </div>
          <div className={classes['footer-right']}>
            <div className={classes['footer-author']}>
              <span>Built by Danny Simms</span>
            </div>
            <div className={classes['footer-social']}>
              <a
                href="https://github.com/GreyNewfie"
                target="_blank"
                rel="noopener noreferrer"
                className={classes['footer-link']}
              >
                <img
                  src="github-mark-white.svg"
                  alt="GitHub"
                  className={classes['footer-icon']}
                />
              </a>
              <a
                href="https://www.linkedin.com/in/danny-simms-2a14631a4/"
                target="_blank"
                rel="noopener noreferrer"
                className={classes['footer-link']}
              >
                <img
                  src="linkedin.svg"
                  alt="LinkedIn"
                  className={classes['footer-icon']}
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
