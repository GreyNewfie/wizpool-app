import PageHeader from '../components/PageHeader';
import TeamsList from '../components/TeamsList';
import usePool from '../utils/usePool';
import classes from './ChooseTeamsPage.module.css';
import { useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ChooseTeamsPage() {
  const { id } = useParams();
  const { pool, setPool } = usePool();

  return (
    <div className={classes['choose-teams']}>
      <PageHeader
        headerText="Choose Teams"
        path="/choose-player"
        leftBtnText=<ArrowBackIcon />
      />
      <h3>Select Teams for {pool.players[id].playerName}</h3>
      <TeamsList pool={pool} setPool={setPool} playerIndex={parseInt(id)} />
    </div>
  );
}
