import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './UserTextInput.module.css';

export default function UserTextInput(props) {
  const inputClassName = classNames(
    classes['user-text-input'],
    props.className,
  );

  return (
    <input
      type="text"
      id={props.id}
      name={props.name}
      value={props.value}
      className={inputClassName}
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
  className: PropTypes.string,
};
