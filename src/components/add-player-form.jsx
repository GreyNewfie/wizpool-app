import PropTypes from 'prop-types';
import classes from './add-player-form.module.css';
import UserTextInput from './user-text-input';

export default function AddPlayer({ playerId }) {
  return (
    <form className={classes['add-player']}>
      <UserTextInput
        props={{
          id: `player-${playerId}-team-name`,
          name: `player-${playerId}-team-name`,
          placeholderText: "Player's Name",
        }}
      />
      <UserTextInput
        props={{
          id: `player-${playerId}-team-name`,
          name: `player-${playerId}-team-name`,
          placeholderText: "Player's Team Name (optional)",
        }}
      />
    </form>
  );
}

AddPlayer.propTypes = {
  playerId: PropTypes.number,
};
