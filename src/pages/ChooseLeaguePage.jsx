import classes from './ChooseLeaguePage.module.css';
import SelectLeagueButtons from '../components/SelectLeagueButtons';
import { useDispatch } from 'react-redux';
import { setLeague } from '../state/poolSlice';
import { useNavigate } from 'react-router-dom';

export default function ChooseLeaugePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSetLeague = (league) => {
    dispatch(setLeague(league));
    setTimeout(() => navigate('/create-pool'), 300);
  };

  return (
    <div
      id="choose-league-container"
      className={classes['choose-league-container']}
    >
      <div className={classes['choose-league-page-header']}>
        <h1>Choose a League</h1>
      </div>

      <div className={classes['instructions-container']}>
        <p>
          Choose MLB, NBA or NFL to begin creating your pool. Stats will be for
          the current season, or most recently completed season.
        </p>
      </div>
      <SelectLeagueButtons handleSetLeague={handleSetLeague} />
    </div>
  );
}
