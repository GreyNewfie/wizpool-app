import { useState } from 'react';
import { getApiBaseUrl } from '../config/config';
import { useAuth } from '@clerk/clerk-react';

const BASE_URL = getApiBaseUrl();

export default function useApiData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { getToken } = useAuth();

  const fetchData = async (url) => {
    setLoading(true);
    let data;

    try {
      const token = await getToken();
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Backend API called from fetchData');
      if (response.status === 200) {
        data = await response.json();
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log('Error fetching league data:', error);
      setError(error);
    } finally {
      setLoading(false);
    }

    return data;
  };

  const getAllTeams = async (league) => {
    if (!league) {
      throw new Error('League is required to get all teams');
    }

    // Set api url based on league
    const url = `${BASE_URL}/${league}_data`;

    // If not storedData, fetch league's teams names and store in localStorage
    const leagueData = await fetchData(url);
    if (leagueData) {
      // Return full team objects so consumers can access conference/division
      return leagueData;
    }
  };

  return {
    loading,
    error,
    getAllTeams,
  };
}
