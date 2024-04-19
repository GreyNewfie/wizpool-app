export default function AssignTeams() {
  return <PageHeader header={'Assign Teams'} />;
}

function PageHeader({ header }) {
  return (
    <div className="page-header">
      <span>&#8592;</span>
      <h3>{header}</h3>
      <button className="save-btn">Save</button>
    </div>
  );
}
