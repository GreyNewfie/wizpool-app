import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import classes from './NextHeaderButton.module.css';
import classNames from 'classnames';

export default function NextHeaderButton({ path, disabled }) {
  const navigate = useNavigate();
  const buttonClass = classNames(classes['right-header-btn'], {
    [classes.disabled]: disabled,
  });

  const handleNextClick = () => {
    if (!disabled) {
      navigate(path);
    }
  };

  return (
    <button className={buttonClass} type="submit" onClick={handleNextClick}>
      Next
    </button>
  );
}

NextHeaderButton.propTypes = {
  path: PropTypes.string,
  disabled: PropTypes.bool,
};
