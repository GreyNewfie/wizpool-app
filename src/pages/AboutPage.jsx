import { useNavigate, Link } from 'react-router-dom';
import classes from './AboutPage.module.css';
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

const AboutPage = () => {
  const navigate = useNavigate();

  // State for mobile detection
  const [isMobile, setIsMobile] = useState(false);

  // State for hamburger menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleGoToApp = () => {
    handleMenuClose();
    navigate('/dashboard');
  };

  return (
    <div className={classes['about-page']}>
      <nav className={classes['nav']}>
        <img
          className={classes['nav-logo']}
          src="./wizpool-wordmark-690x210.png"
          alt="WizPool logo"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        />
        {isMobile ? (
          <div>
            <IconButton
              aria-label="menu"
              aria-controls="mobile-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
              size="large"
              className={classes['hamburger-button']}
              sx={{ color: 'var(--text-color)' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="mobile-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              MenuListProps={{
                'aria-labelledby': 'mobile-menu-button',
              }}
              PaperProps={{
                sx: {
                  backgroundColor: 'var(--main-bg-color)',
                  color: 'var(--text-color)',
                  borderRadius: '8px',
                  border: '1px solid rgba(103, 104, 169, 0.3)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                  minWidth: '150px',
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate('/');
                }}
                sx={{
                  '&:hover': { backgroundColor: 'rgba(103, 104, 169, 0.2)' },
                  padding: '10px 16px',
                  fontSize: '1rem',
                }}
              >
                Home
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate('/about');
                }}
                sx={{
                  '&:hover': { backgroundColor: 'rgba(103, 104, 169, 0.2)' },
                  padding: '10px 16px',
                  fontSize: '1rem',
                }}
              >
                About
              </MenuItem>
              <MenuItem
                onClick={handleGoToApp}
                sx={{
                  '&:hover': { backgroundColor: 'rgba(103, 104, 169, 0.2)' },
                  padding: '10px 16px',
                  fontSize: '1rem',
                }}
              >
                Go to App
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div className={classes['nav-links']}>
            <Link to="/" className={classes['nav-link']}>
              Home
            </Link>
            <Link to="/about" className={classes['nav-link']}>
              About
            </Link>
            <button
              className={classes['nav-button']}
              onClick={() => navigate('/dashboard')}
            >
              Go to App
            </button>
          </div>
        )}
      </nav>
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
            <img
              src="./setup-choose-league-530x600.png"
              alt="Select your league"
            />
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
            <img
              src="./setup-create-league-530x600.png"
              alt="Enter league details"
            />
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
            <img
              src="./setup-assign-teams-530x600.png"
              alt="Add teams to players"
            />
          </div>
        </div>
      </section>

      <h2 className={classes['sections-heading']}>
        WizPool Takes Care of the Rest
      </h2>

      <section className={classes['features-section']}>
        <div className={classes['features-list']}>
          <ul>
            <li>Creating your standings board</li>
            <li>Tracking team records automatically</li>
            <li>Updating standings based in real-time</li>
            <li>Providing reliable season long tracking</li>
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
