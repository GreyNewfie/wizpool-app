import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPoolName,
  setTimePerPick,
  setIsSnakeDraft,
  setScheduledTime,
  setNumberOfPlayers,
  setDraftOrderAssignment,
} from '../state/draftSlice';
import {
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import classes from './SetupDraftPage.module.css';
import UserTextInput from '../components/UserTextInput';
import PrimaryActionButton from '../components/PrimaryActionButton';

const calculateMaxTeams = (numberOfPlayers, league) => {
  let numberOfTeams;
  switch (league) {
    case 'nfl':
      numberOfTeams = 32;
      break;
    case 'nba':
      numberOfTeams = 30;
      break;
    case 'mlb':
      numberOfTeams = 30;
      break;
    default:
      numberOfTeams = 30; // Default to 30 teams if league is undefined or not recognized
  }

  // Ensure numberOfPlayers is at least 1 to avoid division by zero
  const players = Math.max(1, numberOfPlayers);
  return Math.floor(numberOfTeams / players);
};

export default function SetupDraftPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pool = useSelector((state) => state.pool);

  const [poolName, setPoolNameLocal] = useState('');
  const [timePerPick, setTimePerPickLocal] = useState(60);
  const [isSnakeDraft, setIsSnakeDraftLocal] = useState(true);
  const [scheduledTime, setScheduledTimeLocal] = useState(null);
  const [numberOfPlayers, setNumberOfPlayersLocal] = useState(4);
  const [teamsPerPlayer, setTeamsPerPlayer] = useState(
    calculateMaxTeams(4, pool.league),
  );
  const [maxTeamsPerPlayer, setMaxTeamsPerPlayer] = useState(
    calculateMaxTeams(numberOfPlayers, pool.league),
  );
  const [draftOrderAssignment, setDraftOrderAssignmentLocal] =
    useState('manual');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const maxTeams = calculateMaxTeams(numberOfPlayers, pool.league);
    setMaxTeamsPerPlayer(Math.max(1, maxTeams));
  }, [numberOfPlayers, pool.league]);

  const handlePoolNameChange = (e) => {
    setPoolNameLocal(e.target.value);
    validateForm();
  };

  const handleTeamsPerPlayerChange = (e) => {
    setTeamsPerPlayer(e.target.value);
    validateForm();
  };

  const handleTimePerPickChange = (e) => {
    setTimePerPickLocal(e.target.value);
    validateForm();
  };

  const handleNumberOfPlayersChange = (e) => {
    setNumberOfPlayersLocal(e.target.value);
    validateForm();
  };

  const handleDraftOrderAssignmentChange = (e) => {
    setDraftOrderAssignmentLocal(e.target.value);
  };

  const handleIsSnakeDraftChange = (e) => {
    setIsSnakeDraftLocal(e.target.checked);
  };

  const handleScheduledTimeChange = (newValue) => {
    setScheduledTimeLocal(newValue);
    validateForm();
  };

  const validateForm = () => {
    const newErrors = {};

    if (!poolName.trim()) {
      newErrors.poolName = 'Pool name is required';
    }

    if (!timePerPick || timePerPick < 15) {
      newErrors.timePerPick = 'Time per pick must be at least 15 seconds';
    }

    if (!scheduledTime) {
      newErrors.scheduledTime = 'Draft date and time is required';
    } else if (scheduledTime < new Date()) {
      newErrors.scheduledTime = 'Draft time must be in the future';
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    dispatch(setPoolName(poolName));
    dispatch(setTimePerPick(timePerPick));
    dispatch(setIsSnakeDraft(isSnakeDraft));
    dispatch(setScheduledTime(scheduledTime.toISOString()));
    dispatch(setNumberOfPlayers(numberOfPlayers));
    dispatch(setTeamsPerPlayer(teamsPerPlayer));
    dispatch(setDraftOrderAssignment(draftOrderAssignment));

    navigate('/invite-players');
  };

  return (
    <div
      id="setup-draft-container"
      className={classes['setup-draft-container']}
    >
      <div className={classes['setup-draft-page-header']}>
        <h1>Set Up Your Draft</h1>
      </div>

      <div className={classes['draft-pool-name']}>
        <label
          htmlFor="pool-name"
          className={classes['page-subsection-header']}
        >
          Name your pool
        </label>
        <UserTextInput
          id="pool-name"
          name="pool-name"
          value={poolName}
          placeholderText="Pool Name"
          handleChange={(e) => handlePoolNameChange(e)}
          autoFocus={true}
        />
        {errors.poolName && (
          <span className={classes['error-text']}>{errors.poolName}</span>
        )}
      </div>

      <div className={classes['draft-settings-section']}>
        <h3 className={classes['page-subsection-header']}>Draft Settings</h3>

        <div className={classes['draft-settings-form']}>
          <div className={classes['form-group']}>
            <label className={classes['form-label']}>Number of Players</label>
            <FormControl
              fullWidth
              variant="outlined"
              className={classes['custom-select']}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  backgroundColor: 'var(--input-bg-color)',
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                  },
                  '& .MuiSelect-select': {
                    color: 'var(--input-text-color)',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'var(--input-text-color)',
                },
                '& .MuiSvgIcon-root': {
                  color: 'var(--input-text-color)',
                },
              }}
            >
              <Select
                value={numberOfPlayers}
                onChange={handleNumberOfPlayersChange}
                className={classes['select-input']}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      borderRadius: '10px',
                      backgroundColor: 'var(--input-bg-color)',
                      color: 'var(--input-text-color)',
                    },
                  },
                }}
              >
                {[3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num} players
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className={classes['form-group']}>
            <label className={classes['form-label']}>Teams per Player</label>
            <FormControl
              fullWidth
              variant="outlined"
              className={classes['custom-select']}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  backgroundColor: 'var(--input-bg-color)',
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                  },
                  '& .MuiSelect-select': {
                    color: 'var(--input-text-color)',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'var(--input-text-color)',
                },
                '& .MuiSvgIcon-root': {
                  color: 'var(--input-text-color)',
                },
              }}
            >
              <Select
                value={teamsPerPlayer}
                onChange={handleTeamsPerPlayerChange}
                className={classes['select-input']}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      borderRadius: '10px',
                      backgroundColor: 'var(--input-bg-color)',
                      color: 'var(--input-text-color)',
                    },
                  },
                }}
              >
                {Array.from({ length: maxTeamsPerPlayer }, (_, i) => i + 1).map(
                  (num) => (
                    <MenuItem key={num} value={num}>
                      {num} teams per player
                    </MenuItem>
                  ),
                )}
              </Select>
            </FormControl>
          </div>

          <div className={classes['form-group']}>
            <label className={classes['form-label']}>Time Per Pick</label>
            <FormControl
              fullWidth
              variant="outlined"
              className={classes['custom-select']}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  backgroundColor: 'var(--input-bg-color)',
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                  },
                  '& .MuiSelect-select': {
                    color: 'var(--input-text-color)',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'var(--input-text-color)',
                },
                '& .MuiSvgIcon-root': {
                  color: 'var(--input-text-color)',
                },
              }}
            >
              <Select
                value={timePerPick}
                onChange={handleTimePerPickChange}
                className={classes['select-input']}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      borderRadius: '10px',
                      backgroundColor: 'var(--input-bg-color)',
                      color: 'var(--input-text-color)',
                    },
                  },
                }}
              >
                <MenuItem value={15}>15 seconds</MenuItem>
                <MenuItem value={30}>30 seconds</MenuItem>
                <MenuItem value={60}>1 minute</MenuItem>
                <MenuItem value={120}>2 minutes</MenuItem>
                <MenuItem value={300}>5 minutes</MenuItem>
              </Select>
            </FormControl>
            {errors.timePerPick && (
              <span className={classes['error-text']}>
                {errors.timePerPick}
              </span>
            )}
          </div>

          <div className={classes['form-group']}>
            <label className={classes['form-label']}>
              Draft Order Assignment
            </label>
            <p className={classes['form-description']}>
              Choose how you want to assign the draft order
            </p>
            <FormControl
              fullWidth
              variant="outlined"
              className={classes['custom-select']}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  backgroundColor: 'var(--input-bg-color)',
                  color: 'var(--input-text-color)',
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                  },
                  '& .MuiSelect-select': {
                    color: 'var(--input-text-color)',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'var(--input-text-color)',
                },
                '& .MuiSvgIcon-root': {
                  color: 'var(--input-text-color)',
                },
              }}
            >
              <Select
                value={draftOrderAssignment}
                onChange={handleDraftOrderAssignmentChange}
                className={classes['select-input']}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      borderRadius: '10px',
                      backgroundColor: 'var(--input-bg-color)',
                      color: 'var(--input-text-color)',
                    },
                  },
                }}
              >
                <MenuItem value="manual">Assign Manually</MenuItem>
                <MenuItem value="random">Assign Randomly</MenuItem>
              </Select>
            </FormControl>
          </div>

          <FormControlLabel
            control={
              <Switch
                checked={isSnakeDraft}
                onChange={handleIsSnakeDraftChange}
              />
            }
            label="Snake Draft (draft order reverses each round)"
            className={classes['switch-label']}
          />

          <div className={classes['form-group']}>
            <label className={classes['form-label']}>Schedule Draft</label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                value={scheduledTime}
                onChange={handleScheduledTimeChange}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    className: classes['date-picker-input'],
                    error: !!errors.scheduledTime,
                    placeholder: 'Select date and time',
                  },
                }}
                minDateTime={new Date()}
              />
            </LocalizationProvider>
            {errors.scheduledTime && (
              <span className={classes['error-text']}>
                {errors.scheduledTime}
              </span>
            )}
          </div>
        </div>

        <span className="secondary-text">
          Select next when you're ready to invite players
        </span>

        <div className={classes['action-button-container']}>
          <PrimaryActionButton
            text="Continue to Invite Players"
            handleClick={handleSubmit}
            disabled={!isFormValid}
          />
        </div>
      </div>
    </div>
  );
}
