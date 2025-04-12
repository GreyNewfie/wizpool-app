import { useNavigate, Link } from 'react-router-dom';
import classes from './LandingPage.module.css';
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

const LandingPage = () => {
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
    <div className={classes['landing-page']}>
      <nav className={classes['landing-nav']}>
        <img
          className={classes['nav-logo']}
          src="./wizpool-wordmark-230x70.png"
          alt="WizPool logo"
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
                }
              }}
            >
              <MenuItem 
                onClick={() => { handleMenuClose(); navigate('/about'); }}
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
          <h1>Discover the magic of WizPool</h1>
          <p>Track your season long wins pool with ease.</p>
          <button
            className={classes['cta-button']}
            onClick={() => navigate('/dashboard')}
          >
            Go to WizPool
          </button>
        </div>
      </section>
      <h2 className={classes['sections-heading']}>How WizPool Works</h2>
      <section className={classes['standings-section']}>
        <div className={classes['standings-container']}>
          <div className={classes['standings-image']}>
            <img
              src="standing-board.png"
              alt="WizPool Standings Board showing player rankings"
            />
          </div>
          <div className={classes['standings-content']}>
            <h2>Current Standings Board</h2>
            <p>
              The league standings board tracks each players&apos; total wins
              and displays how players compare to each other. Team win loss
              records are updated automatically for effortless tracking.
            </p>
          </div>
        </div>
      </section>
      <section className={classes['teams-section']}>
        <div className={classes['teams-container']}>
          <div className={classes['teams-content']}>
            <h2>View Players&apos; Teams</h2>
            <p>
              See the teams each player selected with their current season wins
              loss record. This allows players to see which teams are
              contributing to their total wins.
            </p>
          </div>
          <div className={classes['teams-image']}>
            <img
              src="players-teams.png"
              alt="WizPool Player Teams display showing team selections and records"
            />
          </div>
        </div>
      </section>

      <section className={classes['picks-section']}>
        <div className={classes['picks-container']}>
          <div className={classes['picks-image']}>
            <img
              src="choose-league-530x600.png"
              alt="WizPool Team Selection List showing teams and their records"
            />
          </div>
          <div className={classes['picks-content']}>
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

      <section className={classes['features-grid-section']}>
        <h2 className={classes['features-grid-header']}>WizPool Features</h2>
        <div className={classes['features-grid-container']}>
          <div className={classes['feature-card']}>
            <div className={classes['feature-card-icon']}>
              <img
                src="choose-league-530x600.png"
                alt="Select League Feature"
              />
            </div>
            <div className={classes['feature-card-content']}>
              <h3>Choose Your League</h3>
              <p>
                Choose between NFL, NBA, or MLB leagues to start your wins pool.
              </p>
            </div>
          </div>

          <div className={classes['feature-card']}>
            <div className={classes['feature-card-icon']}>
              <img src="send-invite-530x600.png" alt="Invite Players Feature" />
            </div>
            <div className={classes['feature-card-content']}>
              <h3>Invite Players</h3>
              <p>
                Easily invite players to view your pool with a simple invitation
                link.
              </p>
            </div>
          </div>

          <div className={classes['feature-card']}>
            <div className={classes['feature-card-icon']}>
              <img
                src="manage-players-530x600.png"
                alt="Manage Players Feature"
              />
            </div>
            <div className={classes['feature-card-content']}>
              <h3>Manage Players</h3>
              <p>
                Add, remove, or update player information with an intuitive
                management interface.
              </p>
            </div>
          </div>

          <div className={classes['feature-card']}>
            <div className={classes['feature-card-icon']}>
              <img src="manage-teams-530x600.png" alt="Manage Teams Feature" />
            </div>
            <div className={classes['feature-card-content']}>
              <h3>Manage Teams</h3>
              <p>
                Assign and reassign teams to players at any point, giving you
                full control of your pool.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className={classes['landing-footer']}>
        <div className={classes['footer-content']}>
          <div className={classes['footer-left']}>
            <Link to="/about" className={classes['footer-link']}>
              About
            </Link>
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

export default LandingPage;
