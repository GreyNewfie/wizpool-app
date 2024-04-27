/* eslint-disable no-unused-vars */
const nflTeams = [
  {
    nflTeanName: 'Buffalo Bills',
    wins: 5,
    losses: 3,
    ties: 0,
    gamesPlayed: 8,
    gamesRemaining: 5,
    teamLogo: '',
  },
  {
    nflTeanName: 'Detroit Lions',
    wins: 4,
    losses: 4,
    ties: 0,
    gamesPlayed: 8,
    gamesRemaining: 5,
    teamLogo: '',
  },
  {
    nflTeanName: 'Los Angeles Rams',
    wins: 6,
    losses: 2,
    ties: 0,
    gamesPlayed: 8,
    gamesRemaining: 5,
    teamLogo: '',
  },
];

const players = [
  {
    name: 'John Doe',
    teamName: "John's Super Team",
    icon: './public/team-icon-1-200x200.png',
    playersTeams: ['Buffalo Bills', 'Detroit Lions', 'Los Angeles Rams'],
  },
  {
    name: 'Jane Smith',
    teamName: 'Great Janes',
    icon: './public/team-icon-2-200x200.png',
  },
];

const standings = [
  {
    ranking: 1,
    player: '',
  },
  {
    ranking: 2,
    player: '',
  },
];

export { nflTeams, players };
