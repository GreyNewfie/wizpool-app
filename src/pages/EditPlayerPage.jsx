import classes from './EditPlayerPage.module.css';
import PropTypes from 'prop-types';
import PageHeader from '../components/PageHeader';
import MobileNavMenu from './MobileNavMenu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function EditPlayerPage({ player }) {
  return (
    <div className={classes['edit-player-container']}>
      <PageHeader
        headerText="Edit Player"
        leftBtnText=<ArrowBackIcon />
        path="/manage-players"
      />
      <MobileNavMenu className={classes['bottom-menu']} />
    </div>
  );
}

EditPlayerPage.propTypes = {
  player: PropTypes.object,
};
