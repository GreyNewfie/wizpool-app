import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './PageHeader.module.css';
import Avatar from '@mui/material/Avatar';
import { StyledEngineProvider } from '@mui/material/styles';

const stringAvatar = (poolName) => {
  const poolInitialsArray = poolName.split(' ').map((word) => word[0]);
  const length = poolInitialsArray.length;
  // Show 1 initial for pool names with 1 word, 3 initials for names with 3 words and 2 initials for all others
  if (length === 1) {
    return poolInitialsArray[0];
  }
  if (length === 3) {
    return poolInitialsArray.join('');
  }
  return `${poolInitialsArray[0]}${poolInitialsArray[poolInitialsArray.length - 1]}`;
};

export default function PageHeader(props) {
  return (
    <div className={classes['page-header']}>
      <Link to={props.path}>
        <button className={classes['left-header-btn']}>
          {props.leftBtnText}
        </button>
      </Link>
      <h3>{props.headerText}</h3>
      <button className={classes['right-header-btn']}>
        {props.rightBtnText}
      </button>
      {/* Only show avatar if a pool name is specified to hide until pool is created */}
      {props.poolName && (
        /* Change the CSS injection order to override Material UI styles without requiring !important */
        <StyledEngineProvider injectFirst>
          <Avatar className={classes.avatar}>
            {stringAvatar(props.poolName)}
          </Avatar>
        </StyledEngineProvider>
      )}{' '}
    </div>
  );
}

PageHeader.propTypes = {
  path: PropTypes.string,
  headerText: PropTypes.string,
  rightBtnText: PropTypes.string,
  leftBtnText: PropTypes.any,
  poolName: PropTypes.string,
};
