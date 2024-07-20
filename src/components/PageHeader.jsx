import { Link } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './PageHeader.module.css';
import Avatar from '@mui/material/Avatar';
import { StyledEngineProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <IconButton
          className={classes['icon-button']}
          onClick={handleClick}
          size="small"
          // sx={{ ml: 2 }}
          aria-controls={open ? 'pool-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <StyledEngineProvider injectFirst>
            <Tooltip title="Active Pool">
              <Avatar className={classes.avatar}>
                {stringAvatar(props.poolName)}
              </Avatar>
            </Tooltip>
          </StyledEngineProvider>
        </IconButton>
      )}{' '}
      <Menu
        className={classes.menu}
        anchorEl={anchorEl}
        id="pool-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            mt: 1,
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: '#1f201f',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <div className={classes['menu-header']}>
          <h6>Active Pool</h6>
        </div>
        <MenuItem className={classes.menuItem} onClick={handleClose}>
          <Avatar className={classes.menuItemAvatar} /> Profile
        </MenuItem>
        <div className={classes['menu-header']}>
          <h6>Other Pools</h6>
        </div>
        <MenuItem className={classes.menuItem} onClick={handleClose}>
          <Avatar className={classes.menuItemAvatar} /> My account
        </MenuItem>
        <Divider className={classes.menuDivider} />
        <MenuItem className={classes.menuItem} onClick={handleClose}>
          <ListItemIcon className={classes.menuListItemIcon}>
            <AddCircleOutlineOutlinedIcon
              className={classes.menuListItemIconAdd}
              fontSize="large"
            />
          </ListItemIcon>
          Create a new pool
        </MenuItem>
      </Menu>
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
