import classes from './DeletePoolPage.module.css';
import PageHeader from '../components/PageHeader';
import useIsDesktop from '../utils/useIsDesktop';
import MobileNavMenu from '../components/MobileNavMenu';
import DesktopNavHeader from '../components/DesktopNavHeader';
import ConfirmDialog from '../components/ConfirmDialog';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth, useUser } from '@clerk/clerk-react';
import { deletePoolAsync, setPool, fetchPoolAsync } from '../state/poolSlice';
import { fetchUserPoolsAsync } from '../state/userPoolsSlice';
import { Link, useNavigate } from 'react-router-dom';
import CircularIndeterminate from '../components/Loading';

export default function DeletePoolPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { user } = useUser();
  const { pools: userPools = [], loading } = useSelector((state) => state.userPools);
  const pool = useSelector(state => state.pool )
  const isDesktop = useIsDesktop();

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [poolIdToDelete, setPoolIdToDelete] = useState(null);
  const [poolNameToDelete, setPoolNameToDelete] = useState('');

  const handleDeletePool = async (poolId) => {
    try {
      const token = await getToken();
      await dispatch(deletePoolAsync({poolId, token})).unwrap();

      // After successful deletion, check if we have any pools left
      const response = await dispatch(fetchUserPoolsAsync({userId: user.id, token})).unwrap();
      const remainingPools = response || [];

      // If the active pool was deleted
      if (poolId === pool.id) {
        // Check if there are any remaining pools
        if (remainingPools.length > 0) {
          const nextPool = remainingPools[0];
          dispatch(setPool(nextPool));
          await dispatch(fetchPoolAsync({poolId: nextPool.id, token})).unwrap();
        } else {
          navigate('/choose-league')
      }
    }
    } catch (error) {
      console.error('Error deleting pool: ', error);
    } finally {
      handleCloseConfirmDialog();
    }
  };

  const handleOpenConfirmDialog = (poolId, poolName) => {
    setShowConfirmDialog(true);
    setPoolIdToDelete(poolId);
    setPoolNameToDelete(poolName);
  };

  const handleCloseConfirmDialog = () => {
    setShowConfirmDialog(false);
    setPoolIdToDelete(null);
    setPoolNameToDelete('');
  };

  return (
    <div className={classes['page-container']}>
      {isDesktop && (
        <DesktopNavHeader />
      )}
      <div className={classes['delete-pool']}>
        <PageHeader
          headerText={pool.name}
          poolName={pool.name}
        />
        <div className={classes['all-pools']}>
          <p>{`Select the pool that you want to delete. If you delete your only pool
        you'll automatically begin creating a new pool.`}</p>
          {loading ? (
            <CircularIndeterminate />
          ) : userPools.length === 0 ? (
            <>
            <p>No pools available</p>
            <Link to="/choose-league">
              <button className={classes['primary-button']}>Create a Pool</button>
            </Link> 
            </>           
          ) : (
            userPools.map((storedPool) => {
            return (
              <div key={storedPool.id} className={classes.pool}>
                <div className={classes['pool-profile']}>
                  <img
                    className={classes['wizpool-icon']}
                    src="./wizpool-trophy-icon-512x512.png"
                    alt="WizPool trophy icon"
                  />
                  <h4>{storedPool.name}</h4>
                </div>
                <button
                  className={classes['delete-btn']}
                  onClick={() =>
                    handleOpenConfirmDialog(storedPool.id, storedPool.name)
                  }
                >
                  Delete
                </button>
              </div>
            );
          })
          )}

        </div>

        {!isDesktop && <MobileNavMenu className={classes['bottom-menu']} />}
        <ConfirmDialog
          open={showConfirmDialog}
          onClose={handleCloseConfirmDialog}
          onConfirm={() => handleDeletePool(poolIdToDelete)}
          itemName={poolNameToDelete}
          dialogTitle="Confirm Delete Pool"
          disablePortal={false}
        />
      </div>
    </div>
  );
}
