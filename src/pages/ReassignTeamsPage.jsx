import classes from './ReassignTeamsPage.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PageHeader from '../components/PageHeader';
import MobileNavMenu from './MobileNavMenu';
import PlayerHomeProfile from '../components/PlayerHomeProfile';
import TeamsList from '../components/TeamsList';
import usePool from '../utils/usePool';
import { Fragment, useState } from 'react';
import useIsDesktop from '../utils/useIsDesktop';
import DesktopNavHeader from '../components/DesktopNavHeader';

export default function ReassignTeamsPage() {
  const { pool, setPool } = usePool();
  const [playerToEdit, setPlayerToEdit] = useState(null);
  const isDesktop = useIsDesktop();

  const togglePlayerToEdit = (index) => {
    setPlayerToEdit((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className={classes['page-container']}>
      {isDesktop && <DesktopNavHeader />}
      <div className={classes['reassign-teams']}>
        <PageHeader
          headerText="Rassign Teams"
          leftBtnText=<ArrowBackIcon />
          path="/pool-settings"
        />
        <div className={classes['players-container']}>
          <p>{`Select edit to begin reassigning a player's teams`}</p>
          {pool.players.map((player, index) => {
            return (
              <Fragment key={index}>
                <div key={index} className={classes['player']}>
                  <PlayerHomeProfile player={player} playerIndex={index} />
                  <button
                    className={classes['edit-btn']}
                    onClick={() => togglePlayerToEdit(index)}
                  >
                    {playerToEdit === index ? 'Save' : 'Edit'}
                  </button>
                </div>
                {playerToEdit === index && (
                  <TeamsList
                    pool={pool}
                    setPool={setPool}
                    playerIndex={index}
                  />
                )}
              </Fragment>
            );
          })}
        </div>
        {!isDesktop && <MobileNavMenu className={classes['bottom-menu']} />}{' '}
      </div>
    </div>
  );
}
