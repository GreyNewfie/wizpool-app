import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './PageHeader.module.css';
import AvatarAndMenu from './AvatarAndMenu';
import useIsDesktop from '../utils/useIsDesktop';

export default function PageHeader(props) {
  const isDesktop = useIsDesktop();
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
      {props.poolName && !isDesktop && (
        <AvatarAndMenu />
      )}
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
