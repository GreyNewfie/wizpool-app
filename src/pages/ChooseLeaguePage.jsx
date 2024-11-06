import classes from './ChooseLeaguePage.module.css';
import NextHeaderButton from '../components/NextHeaderButton';
import SelectLeagueButtons from '../components/SelectLeagueButtons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLeague } from '../state/poolSlice';

export default function ChooseLeaugePage() {
  const dispatch = useDispatch();

  const [isLeagueSelected, setIsLeagueSelected] = useState(false);

  const handleSetLeague = (league) => {
    dispatch(setLeague(league));
    setIsLeagueSelected(true);
  };

  return (
    <div
      id="choose-league-container"
      className={classes['choose-league-container']}
    >
      <div className={classes['choose-league-page-header']}>
        <NextHeaderButton path="/create-pool" disabled={!isLeagueSelected} />
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
