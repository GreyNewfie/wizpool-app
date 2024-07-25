import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './UserTextInput.module.css';
import { useCallback, useState, useRef, useEffect } from 'react';
import debounce from '../utils/debounce';

export default function UserTextInput(props) {
  // localValue being used to show input value immediately
  const [localValue, setLocalValue] = useState(props.value);
  const inputClassName = classNames(
    classes['user-text-input'],
    props.className,
  );
  const inputElement = useRef(null);

  // Using debounce on handleChange to delay updating state as user enters input value
  const debounceHandleChange = useCallback(debounce(props.handleChange), [
    props.handleChange,
  ]);

  useEffect(() => {
    if (props.autoFocus && inputElement.current) {
      inputElement.current.focus();
    }
  }, [props.autoFocus]);

  const handleChange = (e) => {
    setLocalValue(e.target.value);
    debounceHandleChange(e);
  };

  return (
    <input
      ref={inputElement}
      type="text"
      id={props.id}
      name={props.name}
      value={localValue}
      className={inputClassName}
      placeholder={props.placeholderText}
      onChange={handleChange}
      autoFocus
    />
  );
}

UserTextInput.propTypes = {
  id: PropTypes.string,
  placeholderText: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
};
