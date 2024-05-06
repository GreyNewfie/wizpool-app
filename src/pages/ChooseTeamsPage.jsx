import PageHeader from '../components/PageHeader';
import TeamsList from '../components/TeamsList';
import classes from './ChooseTeamsPage.module.css';

export default function ChooseTeamsPage() {
  return (
    <div className={classes['choose-teams']}>
      <PageHeader headerText="Choose Teams" path="/choose-player" />
      <TeamsList />
    </div>
  );
}
