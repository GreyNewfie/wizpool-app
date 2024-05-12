import PropTypes from 'prop-types';
import classes from './PrimaryButton.module.css';
import { Link } from 'react-router-dom';

export default function PrimaryActionButton(props) {
  return (
    <div className="primary-button-container">
      <Link to={props.path}>
        <button
          className={classes['primary-button']}
          onClick={props.handleClick}
        >
          <span className={classes['plus-symbol']}>{props.optionalSymbol}</span>
          <span>{props.text}</span>
        </button>
      </Link>
    </div>
  );
}

PrimaryActionButton.propTypes = {
  text: PropTypes.string,
  handleClick: PropTypes.func,
  optionalSymbol: PropTypes.string,
  path: PropTypes.string,
  id: PropTypes.number,
};
