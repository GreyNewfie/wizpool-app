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
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPoolAsync, setPool, deletePoolAsync } from '../state/poolSlice';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { fetchUserPoolsAsync } from '../state/userPoolsSlice';
import { useUser, useAuth } from '@clerk/clerk-react';
import CircularIndeterminate from '../components/Loading';

const stringAvatar = (poolName) => {
  if (!poolName) return '?';
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

export default function AvatarAndMenu() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pool = useSelector((state) => state.pool);
  const userPools = useSelector((state) => state.userPools.pools);
  const [otherUserPools, setOtherUserPools] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const updateUserPools = async () => {
      const token = await getToken();
    
    if (!userPools.length > 0 && user?.id) {
      dispatch(fetchUserPoolsAsync({userId: user.id, token}));
    }

    if (userPools.length > 1) {
      setOtherUserPools(
        userPools.filter((userPool) => userPool.id !== pool.id),
      );
    }
    };

  updateUserPools();
  }, [user?.id, dispatch, pool.id, userPools, getToken]);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleCreateNewPool = () => {
    dispatch(
      setPool({
        id: uuid(),
        name: '',
        league: '',
        players: [
          {
            id: uuid(),
            name: '',
            teamName: '',
            teams: [],
          },
        ],
        userId: '',
      }),
    );

    navigate('/choose-league');
    handleMenuClose();
  };

  const handleSwitchPool = async (poolId) => {
    const token = await getToken();
    dispatch(fetchPoolAsync({poolId, token}));
    localStorage.setItem('activePoolId', poolId); // Update local storage to indicate acttive pool
    handleMenuClose();
  };

  const handleDeletePool = async () => {
    try {
      const token = await getToken();
      await dispatch(deletePoolAsync({poolId: pool.id, token})).unwrap();
      await dispatch(fetchUserPoolsAsync({userId: user.id, token})).unwrap();

      // If there are other pools available, load the first one
      if (userPools && userPools.length > 0) {
        const nextPool = userPools[0];
        dispatch(setPool(nextPool));
        await dispatch(fetchPoolAsync({poolId: nextPool.id, token}))
      } else {
        navigate('/choose-league')
      }
    } catch (error) {
      console.error('Error deleting pool: ', error);
    } finally {
      handleMenuClose();
    }
  };

  return (
    <>
      <IconButton
        className={classes['icon-button']}
        onClick={handleMenuOpen}
        size="small"
        sx={{ ml: 3 }}
        aria-controls={open ? 'pool-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        {/* Change the CSS injection order to override Material UI styles without requiring !important */}
        <StyledEngineProvider injectFirst>
          <Tooltip title="Active Pool">
            <Avatar className={classes.avatar}>
              {stringAvatar(pool.name)}
            </Avatar>
          </Tooltip>
        </StyledEngineProvider>
      </IconButton>
      <Menu
        className={classes.menu}
        anchorEl={anchorEl}
        id="pool-menu"
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
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
        {userPools.loading ? (
          <CircularIndeterminate />
        ) : userPools.error ? (
          <MenuItem>Error loading pools</MenuItem>
        ) : (
          <div>
            <div className={classes['menu-header']}>
              <h6>Active Pool</h6>
            </div>
            <MenuItem className={classes.menuItem} onClick={handleMenuClose}>
              <ListItemIcon className={classes.menuListItemIcon}>
                <img
                  className={classes['menu-list-icon-custom']}
                  src="./wizpool-trophy-icon-512x512.png"
                  alt="WizPool trophy logo"
                />
              </ListItemIcon>{' '}
              {pool.name}
            </MenuItem>
            {otherUserPools?.length > 0 && (
              <div className={classes['menu-header']}>
                <h6>Other Pools</h6>
              </div>
            )}
            {otherUserPools?.map((pool) => {
              return (
                <MenuItem
                  key={pool.id}
                  className={classes.menuItem}
                  onClick={() => handleSwitchPool(pool.id)}
                >
                  <ListItemIcon className={classes.menuListItemIcon}>
                    <img
                      className={classes['menu-list-icon-custom']}
                      src="./wizpool-trophy-icon-512x512.png"
                      alt="WizPool trophy logo"
                    />
                  </ListItemIcon>
                  {pool.name}
                </MenuItem>
              );
            })}
          </div>
        )}
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
        <Link className={classes['menu-item-link']} to={'/delete-pool'}>
          <MenuItem className={classes.menuItem} onClick={handleDeletePool}>
            <ListItemIcon className={classes.menuListItemIcon}>
              <RemoveCircleOutlineIcon
                className={classes.menuListItemIconMinus}
                fontSize="large"
              />
            </ListItemIcon>
            Delete a pool
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
}
