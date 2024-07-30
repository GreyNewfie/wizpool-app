import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import classes from './DoneHeaderButton.module.css';

export default function DoneHeaderButton({ path }) {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate(path);
  };

  return (
    <button
      className={classes['done-header-btn']}
      type="submit"
      onClick={handleNextClick}
    >
      Done
    </button>
  );
}

DoneHeaderButton.propTypes = {
  path: PropTypes.string,
};
