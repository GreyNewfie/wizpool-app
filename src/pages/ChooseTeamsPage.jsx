import TeamsList from '../components/TeamsList';
import usePool from '../utils/usePool';
import classes from './ChooseTeamsPage.module.css';
import { useParams } from 'react-router-dom';
import BackHeaderButton from '../components/BackHeaderButton';
import DoneHeaderButton from '../components/DoneHeaderButton';
import CircularIndeterminate from '../components/Loading';

export default function ChooseTeamsPage() {
  const { id } = useParams();
  const { pool, setPool } = usePool();

  if (!pool) {
    return <CircularIndeterminate />;
  }

  return (
    <div className={classes['choose-teams-page']}>
      <div className={classes['choose-teams-page-header']}>
        <BackHeaderButton path="/choose-player" />
        <h2>Assign Teams</h2>
        <DoneHeaderButton path="/choose-player" />
      </div>
      <h3>Select teams for {pool.players[id].playerName}</h3>
      <TeamsList pool={pool} setPool={setPool} playerIndex={parseInt(id)} />
    </div>
  );
}
