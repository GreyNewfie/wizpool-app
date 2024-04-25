import PropTypes from 'prop-types';
import classes from './primary-button.module.css';

export default function PrimaryActionButton({
  text,
  handleClick,
  addPlusSymbol,
}) {
  return addPlusSymbol ? (
    <button className={classes['primary-button']} onClick={handleClick}>
      <span className={classes['plus-symbol']}>&#43;</span>
      <span>{text}</span>
    </button>
  ) : (
    <button className={classes['primary-button']} onClick={handleClick}>
      {text}
    </button>
  );
}

PrimaryActionButton.propTypes = {
  text: PropTypes.string,
  handleClick: PropTypes.func,
  addPlusSymbol: PropTypes.bool,
};
