import PrimaryLinkButton from '../components/PrimaryLinkButton';
import PageHeader from '../components/PageHeader';
import ChoosePlayerList from '../components/ChoosePlayerList';

export default function ChoosePlayerPage() {
  return (
    <div className="assign-teams-page">
      <PageHeader headerText="Assign Teams" path="/create-pool" />
      <ChoosePlayerList />
      <PrimaryLinkButton text="Next" />
    </div>
  );
}
