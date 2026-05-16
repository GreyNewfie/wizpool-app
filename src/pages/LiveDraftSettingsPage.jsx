import { useSelector, useDispatch } from 'react-redux';
import { setTeamsPerPlayer } from '../state/poolSlice';
import { setTimePerPick } from '../state/draftSlice';
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
  const { timePerPick } = useSelector((state) => state.draft);

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
  const handleTimeChange = (e) => dispatch(setTimePerPick(e.target.value));

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
            <h3>Teams Per Player</h3>
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
        <div className={classes['time-per-pick-setting']}>
          <div className={classes['intro-section']}>
            <h3>Draft Timer</h3>
            <p>
              Choose how much time each player will have to select their team.
            </p>
          </div>
          <Box className={classes['form-container']}>
            <FormControl fullWidth className={classes['form-control']}>
              <InputLabel id="teams-per-player-label">Time Per Pick</InputLabel>
              <Select
                labelId="time-per-pick-label"
                id="time-per-pick-select"
                value={timePerPick}
                onChange={handleTimeChange}
                label="Time Per Pick"
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
                <MenuItem value={15}>15 Seconds</MenuItem>
                <MenuItem value={30}>30 Seconds</MenuItem>
                <MenuItem value={60}>1 Minute</MenuItem>
                <MenuItem value={90}>1.5 Minutes</MenuItem>
                <MenuItem value={120}>2 Minutes</MenuItem>
                <MenuItem value={300}>5 Minutes</MenuItem>
                <MenuItem value={0}>No Limit</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
    </div>
  );
}
