export default function Welcome() {
  return <HeaderLogo />;
}

function HeaderLogo() {
  return (
    <div className="header-logo-container">
      <img
        className="header-logo"
        src="./public/wizpool-stacked-no-bg-750x750.png"
        alt="a trophy with a wizard hat on top"
      />
    </div>
  );
}
