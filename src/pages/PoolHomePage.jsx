import PageHeader from '../components/PageHeader';

export default function PoolHomePage() {
  const pool = JSON.parse(localStorage.getItem('pool'));

  return (
    <div className="home-page">
      <PageHeader headerText={pool.poolName} />
    </div>
  );
}
