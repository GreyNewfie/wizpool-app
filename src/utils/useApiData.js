import { useEffect, useState } from 'react';
import usePool from './usePool';

export default function useApiData() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { pool } = usePool();
  const league = pool.league;

  const fetchData = async (url) => {
    setLoading(true);
    let data;
    try {
      const response = await fetch(url);
      console.log('API called from fetchData');
      if (response.status === 200) {
        data = await response.json();
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log('Error:', error);
      setError(error);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
    return data;
  };

  const getUrl = (league, season) => {
    let url;
    switch (league) {
      case 'nba':
        url = `https://api.sportsdata.io/v3/nba/scores/json/Standings/${season}?key=b461640f8b2641b8bcaf42396b30ba9a`;
        break;
      case 'mlb':
        url = `https://api.sportsdata.io/v3/mlb/scores/json/Standings/${season}?key=52a40f632efb4cb5820c9dd879fbdd0d`;
        break;
      case 'nfl':
        url = `https://api.sportsdata.io/v3/nfl/scores/json/Standings/${season}?key=e51892e63199402da350f44a963a7a81`;
        break;
      default:
        throw new Error('No league specified');
    }
    return url;
  };

  const getLeagueData = async (league) => {
    let season;
    let data;
    let url;
    let approxSeasonStartDay;
    let approxSeasonStartMonth;
    // league season start dates
    switch (league) {
      case 'nba':
        approxSeasonStartDay = 10;
        approxSeasonStartMonth = 9;
        break;
      case 'mlb':
        approxSeasonStartDay = 20;
        approxSeasonStartMonth = 2;
        break;
      case 'nfl':
        approxSeasonStartDay = 9;
        approxSeasonStartMonth = 8;
        break;
      default:
        throw new Error('No league specified');
    }
    // get current month and day
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    // check if day and month are later than the leageue's approximate season start date
    if (
      currentDay >= approxSeasonStartDay &&
      currentMonth >= approxSeasonStartMonth &&
      league !== 'nba'
    ) {
      // if yes, set season to current year, get url, fetch data and check that data array is not empty
      season = currentDate.getFullYear();
      url = getUrl(league, season);
      data = await fetchData(url);
      // check that data array is not empty
      if (data && data.length > 0) {
        // if not empty, return data
        return data;
        // if empty, set season to previous year, fetch data and return data
      } else if (data && data.length === 0) {
        season = currentDate.getFullYear() - 1;
      }
      // if no, set season to last year
    } else {
      if (league === 'mlb' || league === 'nfl') {
        season = currentDate.getFullYear() - 1;
      }
    }

    if (
      currentDay >= approxSeasonStartDay &&
      currentMonth >= approxSeasonStartMonth &&
      league === 'nba'
    ) {
      season = currentDate.getFullYear() + 1;
    } else {
      season = currentDate.getFullYear();
    }

    url = getUrl(league, season);
    data = await fetchData(url);
    return data;
  };

  const getApiData = async () => {
    const league = pool.league;
    let data = [];
    const storedData = JSON.parse(localStorage.getItem('storedData'));
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    // check if stored data and was stored today
    if (
      storedData?.data?.length > 0 &&
      storedData.storedDate.day === currentDay &&
      storedData.storedDate.month === currentMonth &&
      storedData.storedDate.year === currentYear &&
      storedData.sportsLeague === league
    ) {
      // if yes, use data from localStorage
      data = storedData.data;
    } else {
      // if no, fetchn updated data from API
      data = await getLeagueData(league);
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
    }
    setApiData(data);
  };

  useEffect(() => {
    getApiData();
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
