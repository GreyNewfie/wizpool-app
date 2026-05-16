import { useSelector, useDispatch } from 'react-redux';
import { setTeamsPerPlayer } from '../state/poolSlice';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import classes from './LiveDraftSettingsPage.module.css';
import useIsDesktop from '../utils/useIsDesktop';
import DesktopNavHeader from '../components/DesktopNavHeader';
import PageHeader from '../components/PageHeader';

export default function LiveDraftSettingsPage() {
  const isDesktop = useIsDesktop();
  const dispatch = useDispatch();
  const pool = useSelector((state) => state.pool);

  // Calculate the options for number of teams per player
  const teamsPerPlayerOptions = (league) => {
    const numPlayers = pool.players.length;
    let numOfTeamsOptions = [];
    const totalTeams = league === 'nfl' ? 32 : 30;

    const maxTeams = Math.floor(totalTeams / numPlayers);

    for (let i = maxTeams; i > 0; i--) {
      numOfTeamsOptions.push(i);
    }

    return numOfTeamsOptions;
  };

  const numOfTeamOptions = teamsPerPlayerOptions(pool.league);

  const handleTeamsChange = (e) => dispatch(setTeamsPerPlayer(e.target.value));
  // Show the UI for selecting time for each pick
  return (
    <div className={classes['page-container']}>
      {isDesktop && <DesktopNavHeader />}
      <div className={classes['live-draft-settings']}>
        <PageHeader
          headerText="Live Draft Settings"
          leftBtnText={<ArrowBackIcon />}
          path="/choose-assignment-method"
          poolName={pool.poolName}
        />
        <div className={classes['teams-per-player-setting']}>
          <div className={classes['intro-section']}>
            <h3>Set Teams Per Player</h3>
            <p>Select the number of teams each player will draft.</p>
          </div>
          <Box className={classes['form-container']}>
            <FormControl fullWidth className={classes['form-control']}>
              <InputLabel id="teams-per-player-label">
                Teams Per Player
              </InputLabel>
              <Select
                labelId="teams-per-player-label"
                id="teams-per-player-select"
                value={pool.teamsPerPlayer || ''}
                onChange={handleTeamsChange}
                label="Teams Per Player"
                MenuProps={{
                  classes: {
                    root: classes['select-popover'],
                  },
                  // This keeps the menu pinned to the select box better
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                  },
                }}
              >
                {numOfTeamOptions.map((option) => {
                  return (
                    <MenuItem key={option} value={option}>
                      {option} {option === 1 ? 'Team' : 'Teams'}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
    </div>
  );
  // Show the UI for selecting teams per player
}
