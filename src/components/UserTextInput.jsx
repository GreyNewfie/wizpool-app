import PropTypes from 'prop-types';
import classes from './UserTextInput.module.css';

export default function UserTextInput(props) {
  return (
    <input
      type="text"
      id={props.id}
      name={props.name}
      value={props.value}
      className={classes['user-text-input']}
      placeholder={props.placeholderText}
      onChange={props.handleChange}
    />
  );
}

UserTextInput.propTypes = {
  id: PropTypes.string,
  placeholderText: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
};
