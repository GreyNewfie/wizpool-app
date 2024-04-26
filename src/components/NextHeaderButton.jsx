import PropTypes from 'prop-types';

export default function NextHeaderButton({ handleClick }) {
  return (
    <button className="next-header-btn" type="submit" onClick={handleClick}>
      Next
    </button>
  );
}

NextHeaderButton.propTypes = {
  handleClick: PropTypes.func,
};
