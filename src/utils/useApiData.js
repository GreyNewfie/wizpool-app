import { useEffect, useState } from 'react';

export default function useApiData() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const nbaStandingsUrl =
    'https://api.sportsdata.io/v3/nba/scores/json/Standings/2024?key=b461640f8b2641b8bcaf42396b30ba9a';

  const fecthData = async () => {
    setLoading(true);
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
        storedData.storedDate.year === currentYear
      ) {
        // if yes, use data from localStorage
        data = storedData.data;
        console.log('Using nbaData from localStorage');
      } else {
        // if no, fetch data from API and put it in localStorage
        const response = await fetch(nbaStandingsUrl);
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
    const allTeamsData = apiData?.map((team) => {
      const teamData = {
        teamId: team.Key,
        city: team.City,
        name: team.Name,
        wins: team.Wins,
        losses: team.Losses,
        division: team.Division,
      };
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
