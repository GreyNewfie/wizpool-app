import classes from './MockDraftTeamsList.module.css';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useApiData from '../utils/useApiData';
import LoadingOverlay from './LoadingOverlay';
import { addTeamToPlayer } from '../state/poolSlice';

// Return teams not yet selected by any player
const getAvailableTeams = (players, teams) => {
  const selectedKeys = new Set(
    players.flatMap((p) => (p?.teams || []).map((t) => t.key)),
  );
  return teams.filter((t) => !selectedKeys.has(t.key));
};

export default function MockDraftTeamsList({ playerIndex }) {
  const dispatch = useDispatch();
  const pool = useSelector((state) => state.pool);
  const { getAllTeams, loading } = useApiData();
  const [allTeams, setAllTeams] = useState([]);
  const fetchedLeagueRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const league = pool.league;
    if (!league) return;
    // Avoid re-fetching if we already fetched for this league and have data
    if (fetchedLeagueRef.current === league && allTeams.length) return;

    const fetchTeams = async () => {
      const teams = await getAllTeams(league);
      if (isMounted) {
        setAllTeams(teams || []);
        fetchedLeagueRef.current = league;
      }
    };
    fetchTeams();
    return () => {
      isMounted = false;
    };
    // Intentionally do not depend on getAllTeams to avoid unstable ref loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool.league, allTeams.length]);

  const availableTeams = useMemo(
    () => getAvailableTeams(pool.players, allTeams),
    [pool.players, allTeams],
  );

  // Group available teams by conference and division
  const groupedByConference = useMemo(() => {
    // First, group by conference
    const conferenceMap = new Map();
    
    for (const t of availableTeams) {
      const conf =
        t?.conference ??
        t?.conf ??
        t?.conferenceName ??
        t?.conference_name ??
        'Other';
        
      // Get or create the conference entry
      if (!conferenceMap.has(conf)) {
        conferenceMap.set(conf, new Map());
      }
      
      // Get division or use fallback
      const div = 
        t?.division ?? 
        t?.div ?? 
        t?.divisionName ?? 
        t?.division_name ?? 
        'Other';
        
      // Get or create the division entry within this conference
      const divisionMap = conferenceMap.get(conf);
      if (!divisionMap.has(div)) {
        divisionMap.set(div, []);
      }
      
      // Add team to its division
      divisionMap.get(div).push(t);
    }
    
    // Sort teams within each division by City + Name
    conferenceMap.forEach(divisionMap => {
      divisionMap.forEach(teams => {
        teams.sort((a, b) =>
          `${a.city} ${a.name}`.localeCompare(`${b.city} ${b.name}`)
        );
      });
    });
    
    // Create the final structure with preferred ordering
    const preferredOrder = ['AFC', 'NFC'];
    const divisionOrder = ['East', 'North', 'South', 'West'];
    
    // Create conference objects
    const conferences = Array.from(conferenceMap.entries()).map(([name, divisionMap]) => {
      // Create division objects within this conference
      const divisions = Array.from(divisionMap.entries()).map(([divName, teams]) => ({
        name: divName,
        teams
      }));
      
      // Sort divisions by preferred order
      divisions.sort((a, b) => {
        const ia = divisionOrder.indexOf(a.name);
        const ib = divisionOrder.indexOf(b.name);
        const ra = ia === -1 ? 999 : ia;
        const rb = ib === -1 ? 999 : ib;
        if (ra !== rb) return ra - rb;
        return a.name.localeCompare(b.name);
      });
      
      return {
        name,
        divisions
      };
    });
    
    // Sort conferences by preferred order
    conferences.sort((a, b) => {
      const ia = preferredOrder.indexOf(a.name);
      const ib = preferredOrder.indexOf(b.name);
      const ra = ia === -1 ? 999 : ia;
      const rb = ib === -1 ? 999 : ib;
      if (ra !== rb) return ra - rb;
      return a.name.localeCompare(b.name);
    });
    
    return conferences;
  }, [availableTeams]);

  if (loading) return <LoadingOverlay />;
  if (!pool.league) return null;

  const baseUrl = import.meta.env.VITE_BASE_PATH || '/wizpool-app/';

  const handleSelect = (team) => {
    dispatch(addTeamToPlayer({ team, playerIndex }));
    // The list will auto-update via Redux state + filtering
  };

  return (
    <div className={classes.container}>
      {availableTeams.length === 0 ? (
        <div className={classes.empty}>All teams have been selected.</div>
      ) : (
        groupedByConference.map((conference) => (
          <div key={conference.name} className={classes.conference}>
            {conference.divisions.map(division => (
              <div key={`${conference.name}-${division.name}`} className={classes.division}>
                <h4 className={classes.divisionTitle}>{`${conference.name} ${division.name}`}</h4>
                <ul className={classes.list}>
                  {division.teams.map((team) => {
                    const lowerKey = team.key.toLowerCase();
                    const logoSrc = `${baseUrl}${pool.league}-logos/${lowerKey}-logo.png`;
                    return (
                      <li key={team.key}>
                        <button
                          type="button"
                          className={classes.item}
                          onClick={() => handleSelect(team)}
                        >
                          <img
                            className={classes.logo}
                            src={logoSrc}
                            alt={`${team.city} ${team.name} ${pool.league} team logo`}
                            loading="lazy"
                          />
                          <span className={classes.name}>{`${team.city} ${team.name}`}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

MockDraftTeamsList.propTypes = {
  playerIndex: PropTypes.number.isRequired,
};
