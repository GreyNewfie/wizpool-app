import classes from './UserMenu.module.css';
import CircularIndeterminate from './Loading';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPoolsAsync } from '../state/userPoolsSlice';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { setPool, fetchPoolAsync } from '../state/poolSlice';
import { useState } from 'react';
import {
  SignedOut,
  SignedIn,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';

const TrophyIcon = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    }}
  >
    <img
      src="./wizpool-trophy-icon-512x512.png"
      alt="WizPool trophy icon"
      width={20}
      height={20}
    />
  </div>
);

const AddPoolIcon = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    }}
  >
    <AddCircleOutlineIcon style={{width: '16px', height: '16px'}}/>
  </div>
)

const RemovePoolIcon = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    }}
  >
    <RemoveCircleOutlineIcon style={{width: '16px', height: '16px'}} />
  </div>
)

export default function UserMenu() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const baseURL = import.meta.env.BASE_URL || '/';
  const pool = useSelector((state) => state.pool);
  const userPools = useSelector((state) => state.userPools.pools);
  const [otherUserPools, setOtherUserPools] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const updateUserPools = async () => {
      const token = await getToken();
  
      console.log('User:', user);
      console.log('User Pools:', userPools);
      console.log('Current Pool:', pool);
  
      if (!userPools.length > 0 && user?.id) {
        dispatch(fetchUserPoolsAsync({ userId: user.id, token }));
      }
  
      if (userPools && userPools.length > 1) {
        const filteredPools = userPools.filter((userPool) => userPool.id !== pool.id);
        console.log('Filtered Pools:', filteredPools);
        setOtherUserPools(filteredPools);
      }
    };
  
    updateUserPools();
  }, [user?.id, dispatch, pool.id, userPools, getToken]);

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
  };

  const handleSwitchPool = async (poolId) => {
    const token = await getToken();
    dispatch(fetchPoolAsync({ poolId, token }));
    localStorage.setItem('activePoolId', poolId); // Update local storage to indicate acttive pool
  };

  if (!otherUserPools) return <CircularIndeterminate />;

  return (
    <>
      <SignedOut>
        <SignInButton className={classes['sign-in-btn']} />
      </SignedOut>
      <SignedIn>
        <UserButton>
          <UserButton.MenuItems>
            {userPools.loading ? (
              <CircularIndeterminate />
            ) : userPools.error ? (
              <UserButton.Link
                label="Error loading pools"
                href={`${baseURL}`}
              />
            ) : (
              <UserButton.Link
                label={`${pool.name} (Active Pool)`}
                href={`${baseURL}pool-home`}
                labelIcon={<TrophyIcon />}
              />
            )}
            {otherUserPools?.map((userPool) =>  (
              <UserButton.Action
                key={userPool.id}
                label={`Switch to ${userPool.name}`}
                labelIcon={<TrophyIcon />}
                onClick={() => handleSwitchPool(userPool.id)}
              />
            ))}
            <UserButton.Action
              label="Create a New Pool"
              labelIcon={<AddPoolIcon />}
              onClick={handleCreateNewPool}
            />
            <UserButton.Link
              label="Delete a Pool"
              href={`${baseURL}delete-pool`}
              labelIcon={<RemovePoolIcon />}
            />
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>
    </>
  );
}
