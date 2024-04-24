import PropTypes from 'prop-types';
import classes from './user-text-input.module.css';

export default function UserTextInput({ placeholderText, inputId }) {
  return (
    <input
      type="text"
      id={inputId}
      name={`player-${inputId}-name`}
      className={classes['user-text-input']}
      placeholder={placeholderText}
    />
  );
}

UserTextInput.propTypes = {
  placeholderText: PropTypes.string,
  inputId: PropTypes.string,
};
