import classes from './AvatarAndMenu.module.css';
import Avatar from '@mui/material/Avatar';
import { StyledEngineProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useState } from 'react';
import PropTypes from 'prop-types';
import usePool from '../utils/usePool';
import useStoredPools from '../utils/useStoredPools';

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

export default function AvatarAndMenu({ poolName }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { createNewPool, changePool } = usePool();
  const { getNonActivePools } = useStoredPools();
  const nonActivePools = getNonActivePools();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateNewPool = () => {
    createNewPool();
    handleClose();
  };

  const handleChangePool = (poolId) => {
    changePool(poolId);
    handleClose();
  };

  return (
    <>
      <IconButton
        className={classes['icon-button']}
        onClick={handleClick}
        size="small"
        sx={{ ml: 3 }}
        aria-controls={open ? 'pool-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        {/* Change the CSS injection order to override Material UI styles without requiring !important */}
        <StyledEngineProvider injectFirst>
          <Tooltip title="Active Pool">
            <Avatar className={classes.avatar}>{stringAvatar(poolName)}</Avatar>
          </Tooltip>
        </StyledEngineProvider>
      </IconButton>
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
              right: 20,
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
          <ListItemIcon className={classes.menuListItemIcon}>
            <img
              className={classes['menu-list-icon-custom']}
              src="./public/wizpool-trophy-no-bg-750x750.png"
              alt="WizPool trophy logo"
            />
          </ListItemIcon>{' '}
          {poolName}
        </MenuItem>
        {nonActivePools.length > 0 && (
          <div className={classes['menu-header']}>
            <h6>Other Pools</h6>
          </div>
        )}
        {nonActivePools.map((pool) => {
          return (
            <MenuItem
              key={pool.id}
              className={classes.menuItem}
              onClick={() => handleChangePool(pool.id)}
            >
              <ListItemIcon className={classes.menuListItemIcon}>
                <img
                  className={classes['menu-list-icon-custom']}
                  src="./public/wizpool-trophy-no-bg-750x750.png"
                  alt="WizPool trophy logo"
                />
              </ListItemIcon>
              {pool.poolName}
            </MenuItem>
          );
        })}
        <Divider className={classes.menuDivider} />
        <MenuItem className={classes.menuItem} onClick={handleCreateNewPool}>
          <ListItemIcon className={classes.menuListItemIcon}>
            <AddCircleOutlineOutlinedIcon
              className={classes.menuListItemIconAdd}
              fontSize="large"
            />
          </ListItemIcon>
          Create a new pool
        </MenuItem>
      </Menu>
    </>
  );
}

AvatarAndMenu.propTypes = {
  poolName: PropTypes.string,
};
