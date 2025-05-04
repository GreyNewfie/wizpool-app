import classes from './ChooseDraftStylePage.module.css';
import SelectDraftStyleButtons from '../components/SelectDraftStyleButtons';

export default function ChooseDraftStylePage() {
  return (
    <div className={classes['draft-style-container']}>
      <div className="draft-style-page-header">
        <h1>Choose a Draft Style</h1>
      </div>
      <div className="instructions-container">
        <p>
          Choose a draft style to begin creating your pool. Manual draft allows
          you to assign teams to players, while live draft allows you to draft
          players in real-time.
        </p>
      </div>
      <SelectDraftStyleButtons handleSetDraftStyle={() => {}} />
    </div>
  );
}
