import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './PrimaryLinkButton.module.css';

export default function PrimaryLinkButton({ text, path, handleClick }) {
  return text === 'Add another player' ? (
    <div className={classes['primary-button-container']}>
      <Link to={path}>
        <button className={classes['primary-button']}>
          <span className={classes['plus-symbol']} onClick={handleClick}>
            &#43;
          </span>
          <span>{text}</span>
        </button>
      </Link>
    </div>
  ) : path ? (
    <div className={classes['primary-button-container']}>
      <Link to={path}>
        <button className={classes['primary-button']}>{text}</button>
      </Link>
    </div>
  ) : (
    <div className={classes['primary-button-container']}>
      <button className={classes['primary-button']} onClick={handleClick}>
        {text}
      </button>
    </div>
  );
}

PrimaryLinkButton.propTypes = {
  text: PropTypes.string,
  path: PropTypes.string,
  handleClick: PropTypes.func,
};
