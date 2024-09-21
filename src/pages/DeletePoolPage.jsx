import usePool from '../utils/usePool';
import useStoredPools from '../utils/useStoredPools';
import classes from './DeletePoolPage.module.css';
import PageHeader from '../components/PageHeader';
import useIsDesktop from '../utils/useIsDesktop';
import MobileNavMenu from '../components/MobileNavMenu';
import DesktopNavHeader from '../components/DesktopNavHeader';
import ConfirmDialog from '../components/ConfirmDialog';
import { useState } from 'react';

export default function DeletePoolPage() {
  const { pool, createNewPool, deletePool, changePool } = usePool();
  const { storedPools, getNonActivePools, refreshStoredPools } =
    useStoredPools();
  const nonActivePools = getNonActivePools();
  const isDesktop = useIsDesktop();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [poolIdToDelete, setPoolIdToDelete] = useState(null);
  const [poolNameToDelete, setPoolNameToDelete] = useState('');

  const handleCloseConfirmDialog = () => {
    setShowConfirmDialog(false);
    setPoolIdToDelete(null);
    setPoolNameToDelete('');
  };

  const handleOpenConfirmDialog = (poolId, poolName) => {
    setShowConfirmDialog(true);
    setPoolIdToDelete(poolId);
    setPoolNameToDelete(poolName);
  };

  const handleDeletePool = () => {
    setShowConfirmDialog(false);
    deletePool(poolIdToDelete);
    refreshStoredPools();
  };

  return (
    <div className={classes['page-container']}>
      {isDesktop && (
        <DesktopNavHeader
          poolName={pool.poolName}
          createNewPool={createNewPool}
          changePool={changePool}
          nonActivePools={nonActivePools}
        />
      )}
      <div className={classes['delete-pool']}>
        <PageHeader
          headerText={pool.poolName}
          poolName={pool.poolName}
          createNewPool={createNewPool}
          changePool={changePool}
          nonActivePools={nonActivePools}
        />
        <div className={classes['all-pools']}>
          <p>{`Select the pool that you want to delete. If you delete your only pool
        you'll automatically begin creating a new pool.`}</p>
          {storedPools.map((storedPool) => {
            return (
              <div key={storedPool.id} className={classes.pool}>
                <div className={classes['pool-profile']}>
                  <img
                    className={classes['wizpool-icon']}
                    src="./wizpool-trophy-icon-512x512.png"
                    alt="WizPool trophy icon"
                  />
                  <h4>{storedPool.poolName}</h4>
                </div>
                <button
                  className={classes['delete-btn']}
                  onClick={() =>
                    handleOpenConfirmDialog(storedPool.id, storedPool.poolName)
                  }
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>

        {!isDesktop && <MobileNavMenu className={classes['bottom-menu']} />}
        <ConfirmDialog
          open={showConfirmDialog}
          onClose={handleCloseConfirmDialog}
          onConfirm={handleDeletePool}
          itemName={poolNameToDelete}
          dialogTitle="Confirm Delete Pool"
        />
      </div>
    </div>
  );
}
