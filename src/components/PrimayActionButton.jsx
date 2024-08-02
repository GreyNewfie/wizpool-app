import PropTypes from 'prop-types';
import classes from './PrimaryButton.module.css';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export default function PrimaryActionButton(props) {
  const btnClasses = classNames(classes['primary-button'], {
    [classes['has-teams']]: props.hasTeams,
  });
  return (
    <div className={classes['primary-button-container']}>
      <Link to={props.path} className={classes['primary-link']}>
        <button className={btnClasses} onClick={props.handleClick}>
          <span className={classes['plus-symbol']}>{props.optionalSymbol}</span>
          <span>{props.text}</span>
        </button>
      </Link>
    </div>
  );
}

PrimaryActionButton.propTypes = {
  text: PropTypes.string,
  handleClick: PropTypes.func,
  optionalSymbol: PropTypes.string,
  path: PropTypes.string,
  id: PropTypes.number,
  hasTeams: PropTypes.bool,
};
