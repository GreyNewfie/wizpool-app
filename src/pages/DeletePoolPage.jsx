import usePool from '../utils/usePool';
import useStoredPools from '../utils/useStoredPools';
import classes from './DeletePoolPage.module.css';
import PageHeader from '../components/PageHeader';
import useIsDesktop from '../utils/useIsDesktop';
import MobileNavMenu from './MobileNavMenu';
import DesktopNavHeader from '../components/DesktopNavHeader';

export default function DeletePoolPage() {
  const { pool, createNewPool, deletePool, changePool } = usePool();
  const { pools, getNonActivePools } = useStoredPools();
  const nonActivePools = getNonActivePools();
  const isDesktop = useIsDesktop();
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
          {pools.map((pool) => {
            return (
              <div key={pool.id} className={classes.pool}>
                <div className={classes['pool-profile']}>
                  <img
                    className={classes['wizpool-icon']}
                    src="./public/wizpool-trophy-icon-512x512.png"
                    alt="WizPool trophy icon"
                  />
                  <h5>{pool.poolName}</h5>
                </div>
                <button className={classes['delete-btn']} onClick={deletePool}>
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
