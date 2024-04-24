import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function PrimaryLinkButton({ text, path }) {
  return text === 'Add another player' ? (
    <div className="primary-button-container">
      <Link to={path}>
        <button className="primary-button">
          <span className="plus-symbol">&#43;</span>
          <span>{text}</span>
        </button>
      </Link>
    </div>
  ) : (
    <div className="primary-button-container">
      <Link to={path}>
        <button className="primary-button">{text}</button>
      </Link>
    </div>
  );
}

PrimaryLinkButton.propTypes = {
  text: PropTypes.string,
  path: PropTypes.string,
};
