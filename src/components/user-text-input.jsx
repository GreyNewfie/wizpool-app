import PropTypes from 'prop-types';
import classes from './user-text-input.module.css';

export default function UserTextInput({ props }) {
  return (
    <input
      type="text"
      id={props.id}
      name={props.name}
      className={classes['user-text-input']}
      placeholder={props.placeholderText}
    />
  );
}

UserTextInput.propTypes = {
  props: PropTypes.object,
  id: PropTypes.number,
  placeholderText: PropTypes.string,
  name: PropTypes.string,
};
