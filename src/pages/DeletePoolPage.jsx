import usePool from '../utils/usePool';
import useStoredPools from '../utils/useStoredPools';
import classes from './DeletePoolPage.module.css';
import PageHeader from '../components/PageHeader';
import useIsDesktop from '../utils/useIsDesktop';
import MobileNavMenu from './MobileNavMenu';
import DesktopNavHeader from '../components/DesktopNavHeader';

export default function DeletePoolPage() {
  const { pool, createNewPool, deletePool, changePool } = usePool();
  const { storedPools, getNonActivePools, refreshStoredPools } =
    useStoredPools();
  const nonActivePools = getNonActivePools();
  const isDesktop = useIsDesktop();

  const handleDeletePool = (poolId) => {
    deletePool(poolId);
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
          {storedPools.map((storedpool) => {
            return (
              <div key={storedpool.id} className={classes.pool}>
                <div className={classes['pool-profile']}>
                  <img
                    className={classes['wizpool-icon']}
                    src="./public/wizpool-trophy-icon-512x512.png"
                    alt="WizPool trophy icon"
                  />
                  <h4>{storedpool.poolName}</h4>
                </div>
                <button
                  className={classes['delete-btn']}
                  onClick={() => handleDeletePool(storedpool.id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>

        {!isDesktop && <MobileNavMenu className={classes['bottom-menu']} />}
      </div>
    </div>
  );
}
