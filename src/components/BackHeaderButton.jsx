import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PropTypes from 'prop-types';
import classes from './BackHeaderButton.module.css';

export default function BackHeaderButton({ path }) {
  return (
    <Link to={path}>
      <button className={classes['back-btn']}>
        <ArrowBackIcon fontSize="medium" />
      </button>
    </Link>
  );
}

BackHeaderButton.propTypes = {
  path: PropTypes.string,
};
