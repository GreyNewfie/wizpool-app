import classes from './ChooseDraftStylePage.module.css';
import SelectDraftStyleButtons from '../components/SelectDraftStyleButtons';
import { useDispatch } from 'react-redux';
import { setDraftStyle } from '../state/draftSlice';
import { useNavigate } from 'react-router-dom';

export default function ChooseDraftStylePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSetDraftStyle = (draftStyle) => {
    dispatch(setDraftStyle(draftStyle));

    if (draftStyle === 'manual') {
      setTimeout(() => navigate('/create-pool', 300));
    } else {
      setTimeout(() => navigate('/setup-draft', 300));
    }
  };

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
      <SelectDraftStyleButtons handleSetDraftStyle={handleSetDraftStyle} />
    </div>
  );
}
