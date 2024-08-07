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
      {/* Only show avatar if a pool name is specified to hide until pool is created */}
      {props.poolName && !isDesktop && (
        <AvatarAndMenu
          poolName={props.poolName}
          createNewPool={props.createNewPool}
          changePool={props.changePool}
          nonActivePools={props.nonActivePools}
        />
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
  createNewPool: PropTypes.func,
  changePool: PropTypes.func,
  nonActivePools: PropTypes.array,
};
