import PageHeader from '../components/PageHeader';
import TeamsList from '../components/TeamsList';
import usePool from '../utils/usePool';
import classes from './ChooseTeamsPage.module.css';
import { useParams } from 'react-router-dom';

export default function ChooseTeamsPage() {
  const { id } = useParams();
  const { pool } = usePool();
  const player = pool.players[id];
  console.log(player);

  return (
    <div className={classes['choose-teams']}>
      <PageHeader headerText="Choose Teams" path="/choose-player" />
      <h3>Select Teams for {pool.players[id].playerName}</h3>
      <TeamsList playerId={id} />
    </div>
  );
}
