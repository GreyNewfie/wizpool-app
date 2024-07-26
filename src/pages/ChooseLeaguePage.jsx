import classes from './ChooseLeaguePage.module.css';
import NextHeaderButton from '../components/NextHeaderButton';
import SelectLeagueButtons from '../components/SelectLeagueButtons';
import usePool from '../utils/usePool';
import { useState } from 'react';

export default function ChooseLeaugePage() {
  const { setLeague } = usePool();
  const [isLeagueSelected, setIsLeagueSelected] = useState(false);

  const handleSetLeague = (league) => {
    setLeague(league);
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
        <p>Choose MLB, NBA or NFL to begin creating your pool</p>
      </div>
      <SelectLeagueButtons handleSetLeague={handleSetLeague} />
    </div>
  );
}
