import PropTypes from 'prop-types';
import classes from './add-player-form.module.css';
import UserTextInput from './user-text-input';

export default function AddPlayer({ playerId }) {
  return (
    <form className={classes['add-player']}>
      <UserTextInput
        placeholderText="Player\'s Name"
        inputId={`player-${playerId}-team-name`}
      />
      <UserTextInput
        placeholderText="Player's Team Name (optional)"
        inputId={`player-${playerId}-team-name`}
      />
    </form>
  );
}

AddPlayer.propTypes = {
  playerId: PropTypes.number,
};
