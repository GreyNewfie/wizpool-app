import { useEffect, useState } from 'react';
import usePool from './usePool';

export default function useApiData() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { pool } = usePool();
  const league = pool.league;

  const nbaStandingsUrl =
    'https://api.sportsdata.io/v3/nba/scores/json/Standings/2024?key=b461640f8b2641b8bcaf42396b30ba9a';
  const mlbStandingsUrl =
    'https://api.sportsdata.io/v3/mlb/scores/json/Standings/2024?key=52a40f632efb4cb5820c9dd879fbdd0d';
  const nflStandingsUrl =
    'https://api.sportsdata.io/v3/nfl/scores/json/Standings/2023?key=e51892e63199402da350f44a963a7a81';

  const fecthData = async () => {
    setLoading(true);
    const league = pool.league;
    try {
      const storedData = JSON.parse(localStorage.getItem('storedData'));
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      let data;
      // check if nbaData is in localStorage and was stored today
      if (
        storedData &&
        storedData.storedDate.day === currentDay &&
        storedData.storedDate.month === currentMonth &&
        storedData.storedDate.year === currentYear &&
        storedData.sportsLeague === league
      ) {
        // if yes, use data from localStorage
        data = storedData.data;
      } else {
        let url;
        switch (league) {
          case 'nba':
            url = nbaStandingsUrl;
            break;
          case 'mlb':
            url = mlbStandingsUrl;
            break;
          case 'nfl':
            url = nflStandingsUrl;
            break;
          default:
            throw new Error('No pool league found');
        }
        // if no, fetch data from API and put it in localStorage
        const response = await fetch(url);
        console.log('API called from fetchData');

        if (response.status === 200) {
          data = await response.json();
          // store data with time stamp in localStorage
          const dataToStore = {
            data: data,
            storedDate: {
              day: currentDay,
              month: currentMonth,
              year: currentYear,
            },
            sportsLeague: league,
          };
          localStorage.setItem('storedData', JSON.stringify(dataToStore));
        } else {
          throw new Error(response.statusText);
        }
      }
      setApiData(data);
    } catch (error) {
      console.log('Error:', error);
      setError(error);
    } finally {
      // Artifical delay to test progress spinner indicator
      setTimeout(() => setLoading(false), 1000);
    }
  };

  useEffect(() => {
    fecthData();
  }, []);

  const getAllTeams = (apiData) => {
    const teamsNames = apiData?.map((team) => {
      const teamName = `${team.City} ${team.Name}`;
      return teamName;
    });
    return teamsNames;
  };

  const getAllTeamsData = (apiData) => {
    function splitTeamAndCity(fullTeamName) {
      const words = fullTeamName.split(' ');
      const teamName = words.pop();
      const city = words.join(' ');
      return { city, teamName };
    }
    const allTeamsData = apiData?.map((team) => {
      let teamData;
      if (league === 'nfl') {
        const cityAndTeamName = splitTeamAndCity(team.Name);
        teamData = {
          teamId: team.Team,
          city: cityAndTeamName.city,
          name: cityAndTeamName.teamName,
          wins: team.Wins,
          losses: team.Losses,
          division: `${team.Conference} ${team.Division}`,
        };
      } else {
        teamData = {
          teamId: team.Key,
          city: team.City,
          name: team.Name,
          wins: team.Wins,
          losses: team.Losses,
          division: team.Division,
        };
      }
      return teamData;
    });
    return allTeamsData;
  };

  return {
    apiData,
    loading,
    error,
    getAllTeams: () => getAllTeams(apiData),
    getAllTeamsData: () => getAllTeamsData(apiData),
  };
}
