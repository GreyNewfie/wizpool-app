import styles from './FeaturesList.module.css';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import GroupsIcon from '@mui/icons-material/Groups';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SendIcon from '@mui/icons-material/Send';

const FeaturesList = () => {
  const propositions = [
    {
      icon: <SportsBaseballIcon />,
      title: 'Multi-League Support',
      description: 'Create pools for MLB, NBA, or NFL seasons',
    },
    {
      icon: <GroupsIcon />,
      title: 'Easy Team Management',
      description: 'Add players and assign teams with just a few clicks',
    },
    {
      icon: <LeaderboardIcon />,
      title: 'Live Standings',
      description: 'Track wins and standings updated in real-time',
    },
    {
      icon: <AssessmentIcon />,
      title: 'Season Stats',
      description: 'Access current or most recently completed season stats',
    },
    {
      icon: <SendIcon />,
      title: 'Share Your Pool',
      description: 'Invite friends to view and follow your pool progress',
    },
  ];

  return (
    <div className={styles.propositionsContainer}>
      {propositions.map((prop, index) => (
        <div key={index} className={styles.propositionItem}>
          <div className={styles.icon}>{prop.icon}</div>
          <div className={styles.content}>
            <h3>{prop.title}</h3>
            <p>{prop.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturesList;
