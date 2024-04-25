import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './primary-button.module.css';

export default function PrimaryLinkButton({ text, path }) {
  return text === 'Add another player' ? (
    <div className={classes['primary-button-container']}>
      <Link to={path}>
        <button className={classes['primary-button']}>
          <span className={classes['plus-symbol']}>&#43;</span>
          <span>{text}</span>
        </button>
      </Link>
    </div>
  ) : (
    <div className={classes['primary-button-container']}>
      <Link to={path}>
        <button className={classes['primary-button']}>{text}</button>
      </Link>
    </div>
  );
}

PrimaryLinkButton.propTypes = {
  text: PropTypes.string,
  path: PropTypes.string,
};
