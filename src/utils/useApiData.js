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
      let nbaData;
      // check if nbaData is in localStorage and was stored today
      if (
        storedData &&
        storedData.storedDate.day === currentDay &&
        storedData.storedDate.month === currentMonth &&
        storedData.storedDate.year === currentYear
      ) {
        // if yes, use data from localStorage
        nbaData = storedData.nbaData;
        console.log('Using nbaData from localStorage');
      } else {
        // if no, fetch data from API and put it in localStorage
        const response = await fetch(nbaStandingsUrl);
        console.log('API called from fetchData');

        if (response.status === 200) {
          nbaData = await response.json();
          // store data with time stamp in localStorage
          const dataToStore = {
            nbaData: nbaData,
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
      setApiData(nbaData);
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

  const getAllNbaTeams = (apiData) => {
    const nbaTeamsNames = apiData?.map((team) => {
      const teamName = `${team.City} ${team.Name}`;
      return teamName;
    });
    return nbaTeamsNames;
  };

  const getAllNbaTeamsData = (apiData) => {
    const allNbaTeamsData = apiData?.map((team) => {
      const nbaTeamData = {
        teamId: team.Key,
        city: team.City,
        name: team.Name,
        wins: team.Wins,
        losses: team.Losses,
      };
      return nbaTeamData;
    });
    return allNbaTeamsData;
  };

  return {
    apiData,
    loading,
    error,
    getAllNbaTeams: () => getAllNbaTeams(apiData),
    getAllNbaTeamsData: () => getAllNbaTeamsData(apiData),
  };
}
