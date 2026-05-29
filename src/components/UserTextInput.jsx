import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './UserTextInput.module.css';
import { useState, useRef, useEffect, useMemo } from 'react';
import debounce from '../utils/debounce';

export default function UserTextInput(props) {
  // localValue being used to show input value immediately
  const [localValue, setLocalValue] = useState(props.value);
  const inputClassName = classNames(
    classes['user-text-input'],
    props.className,
  );
  const inputElement = useRef(null);

  const handleChangeRef = useRef(props.handleChange);

  useEffect(() => {
    handleChangeRef.current = props.handleChange;
  }, [props.handleChange]);

  useEffect(() => {
    setLocalValue(props.value);
  }, [props.value]);

  // Using debounce on handleChange to delay updating state as user enters input value
  const debounceHandleChange = useMemo(
    () =>
      debounce((value) => {
        handleChangeRef.current({ target: { value } });
      }),
    [],
  );

  useEffect(() => {
    if (props.autoFocus && inputElement.current) {
      inputElement.current.focus();
    }
  }, [props.autoFocus]);

  const handleChange = (e) => {
    const val = e.target.value;
    setLocalValue(val);
    debounceHandleChange(val);
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
      autoFocus={props.autoFocus}
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
