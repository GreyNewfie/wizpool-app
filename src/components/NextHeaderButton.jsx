import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function NextHeaderButton({ handleClick, path }) {
  return (
    <Link to={path}>
      <button className="next-header-btn" type="submit" onClick={handleClick}>
        Next
      </button>
    </Link>
  );
}

NextHeaderButton.propTypes = {
  handleClick: PropTypes.func,
  path: PropTypes.string,
};
