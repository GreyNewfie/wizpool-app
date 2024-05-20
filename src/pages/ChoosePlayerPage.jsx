import PrimaryLinkButton from '../components/PrimaryLinkButton';
import PageHeader from '../components/PageHeader';
import ChoosePlayerList from '../components/ChoosePlayerList';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ChoosePlayerPage() {
  return (
    <div className="assign-teams-page">
      <PageHeader
        headerText="Assign Teams"
        path="/create-pool"
        rightBtnText="Save"
        leftBtnText={<ArrowBackIcon />}
      />
      <ChoosePlayerList />
      <PrimaryLinkButton text="Next" />
    </div>
  );
}
