import classes from './ChooseLeaguePage.module.css';
import NextHeaderButton from '../components/NextHeaderButton';
import SelectLeagueButtons from '../components/SelectLeagueButtons';

export default function ChooseLeaugePage() {
  return (
    <div
      id="choose-league-container"
      className={classes['choose-league-container']}
    >
      <div className={classes['choose-league-page-header']}>
        <NextHeaderButton path="/create-pool" />
        <h1>Choose a League</h1>
      </div>

      <div className={classes['instructions-container']}>
        <p>Choose MLB, NBA or NFL to begin creating your pool</p>
      </div>
      <SelectLeagueButtons />
    </div>
  );
}
