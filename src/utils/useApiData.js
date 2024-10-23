import { useEffect, useState } from 'react';
import usePool from './usePool';

export default function useApiData() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { pool } = usePool();

  useEffect(() => {
    getApiData();
  }, []);

  const fetchData = async (url) => {
    setLoading(true);
    let data;

    try {
      const response = await fetch(url);
      console.log('Backend API called from fetchData');
      if (response.status === 200) {
        data = await response.json();
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log('Error:', error);
      setError(error);
    } finally {
      setLoading(false);
    }

    return data;
  };

  const getUpdatedUrl = (league, season) => {
    const url = `http://localhost:3030/api/${league}_data`;
    if (season === 2024) {
      return url;
    } else {
      console.log('Season needs to be updated');
      return url;
    }
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
    // check if day and month are later than MLB's and NFL's approximate season start date
    if (
      currentDay >= approxSeasonStartDay &&
      currentMonth >= approxSeasonStartMonth &&
      league !== 'nba'
    ) {
      // if yes, set season to current year, get url, fetch data and check that data array is not empty
      season = currentDate.getFullYear();
      url = getUpdatedUrl(league, season);
      data = await fetchData(url);
      console.log('fetchData called in getLeagueData');

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
    // check if day and month are later than the NBA's approximate season start date
    if (
      currentDay >= approxSeasonStartDay &&
      currentMonth >= approxSeasonStartMonth &&
      league === 'nba'
    ) {
      // if yes, set season to next year (API works differently for NBA)
      season = currentDate.getFullYear() + 1;
    } else {
      // if no, set season to current year
      season = currentDate.getFullYear();
    }

    url = getUpdatedUrl(league, season);
    data = await fetchData(url);
    console.log('fetchData called in getLeagueData');
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
    // Check if stored data and was stored today
    if (
      storedData?.data?.length > 0 &&
      storedData.storedDate.day === currentDay &&
      storedData.storedDate.month === currentMonth &&
      storedData.storedDate.year === currentYear &&
      storedData.sportsLeague === league
    ) {
      // If yes, use data from localStorage
      data = storedData.data;
    } else {
      // If no, fetch updated data from API
      data = await getLeagueData(league);
      // Store data with time stamp in localStorage
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

  const getAllTeams = async (league) => {
    // Set api url based on league
    const url = `http://localhost:3030/api/${league}_data`;

    // If not storedData, fetch league's teams names and store in localStorage
    const leagueData = await fetchData(url);
    if (leagueData) {
      // Get list of team names
      const teamsList = leagueData?.map((team) => ({
        teamId: team.key,
        city: team.city,
        name: team.name,
      }));

      return teamsList;
    }
  };

  return {
    apiData,
    loading,
    error,
    getAllTeams,
  };
}
