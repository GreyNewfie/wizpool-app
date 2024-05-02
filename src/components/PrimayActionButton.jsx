import PropTypes from 'prop-types';
import classes from './PrimaryButton.module.css';

export default function PrimaryActionButton(props) {
  return (
    <button className={classes['primary-button']} onClick={props.handleClick}>
      <span className={classes['plus-symbol']}>{props.optionalSymbol}</span>
      <span>{props.text}</span>
    </button>
  );
}

PrimaryActionButton.propTypes = {
  text: PropTypes.string,
  handleClick: PropTypes.func,
  optionalSymbol: PropTypes.string,
};
