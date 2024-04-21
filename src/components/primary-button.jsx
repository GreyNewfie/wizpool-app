import { Link } from 'react-router-dom';

export default function PrimaryButton({ text, path }) {
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
