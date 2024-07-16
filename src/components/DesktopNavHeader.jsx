import { Link } from 'react-router-dom';
import classes from './DesktopNavHeader.module.css';

export default function DesktopNavHeader() {
  return (
    <div className={classes['desktop-nav-header']}>
      <img src="/public/wizpool-wordmark-230x70.png" alt="WizPool logo" />
      <div className={classes['nav-items']}>
        <Link to="/pool-home">Home</Link>
        <Link to="/pool-players">Players</Link>
        <Link to="/pool-picks">Picks</Link>
        <Link to="/pool-settings">Settings</Link>
      </div>
    </div>
  );
}
