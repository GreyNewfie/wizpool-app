import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './PageHeader.module.css';
import Avatar from '@mui/material/Avatar';
import { StyledEngineProvider } from '@mui/material/styles';

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
      {/* Change the CSS injection order to override Material UI styles without requiring !important */}
      <StyledEngineProvider injectFirst>
        <Avatar className={classes.avatar}>TPL</Avatar>
      </StyledEngineProvider>
    </div>
  );
}

PageHeader.propTypes = {
  path: PropTypes.string,
  headerText: PropTypes.string,
  rightBtnText: PropTypes.string,
  leftBtnText: PropTypes.any,
};
