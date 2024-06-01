import { useEffect, useState } from 'react';

const nbaData = [
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 9,
    Key: 'BOS',
    City: 'Boston',
    Name: 'Celtics',
    Conference: 'Eastern',
    Division: 'Atlantic',
    Wins: 64,
    Losses: 18,
    Percentage: 0.78,
    ConferenceWins: 41,
    ConferenceLosses: 11,
    DivisionWins: 15,
    DivisionLosses: 2,
    HomeWins: 37,
    HomeLosses: 4,
    AwayWins: 27,
    AwayLosses: 14,
    LastTenWins: 7,
    LastTenLosses: 3,
    PointsPerGameFor: 120.57,
    PointsPerGameAgainst: 109.23,
    Streak: 2,
    GamesBack: 0.0,
    StreakDescription: 'W2',
    GlobalTeamID: 20000009,
    ConferenceRank: 0,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 6,
    Key: 'NY',
    City: 'New York',
    Name: 'Knicks',
    Conference: 'Eastern',
    Division: 'Atlantic',
    Wins: 50,
    Losses: 32,
    Percentage: 0.61,
    ConferenceWins: 35,
    ConferenceLosses: 17,
    DivisionWins: 12,
    DivisionLosses: 5,
    HomeWins: 27,
    HomeLosses: 14,
    AwayWins: 23,
    AwayLosses: 18,
    LastTenWins: 6,
    LastTenLosses: 4,
    PointsPerGameFor: 112.79,
    PointsPerGameAgainst: 108.2,
    Streak: 5,
    GamesBack: 14.0,
    StreakDescription: 'W5',
    GlobalTeamID: 20000006,
    ConferenceRank: 0,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 7,
    Key: 'PHI',
    City: 'Philadelphia',
    Name: '76ers',
    Conference: 'Eastern',
    Division: 'Atlantic',
    Wins: 47,
    Losses: 35,
    Percentage: 0.573,
    ConferenceWins: 31,
    ConferenceLosses: 21,
    DivisionWins: 8,
    DivisionLosses: 8,
    HomeWins: 25,
    HomeLosses: 16,
    AwayWins: 22,
    AwayLosses: 19,
    LastTenWins: 8,
    LastTenLosses: 2,
    PointsPerGameFor: 114.59,
    PointsPerGameAgainst: 111.54,
    Streak: 8,
    GamesBack: 17.0,
    StreakDescription: 'W8',
    GlobalTeamID: 20000007,
    ConferenceRank: 1,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 8,
    Key: 'BKN',
    City: 'Brooklyn',
    Name: 'Nets',
    Conference: 'Eastern',
    Division: 'Atlantic',
    Wins: 32,
    Losses: 50,
    Percentage: 0.39,
    ConferenceWins: 24,
    ConferenceLosses: 28,
    DivisionWins: 5,
    DivisionLosses: 11,
    HomeWins: 20,
    HomeLosses: 21,
    AwayWins: 12,
    AwayLosses: 29,
    LastTenWins: 5,
    LastTenLosses: 5,
    PointsPerGameFor: 110.36,
    PointsPerGameAgainst: 113.25,
    Streak: -2,
    GamesBack: 32.0,
    StreakDescription: 'L2',
    GlobalTeamID: 20000008,
    ConferenceRank: 1,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 10,
    Key: 'TOR',
    City: 'Toronto',
    Name: 'Raptors',
    Conference: 'Eastern',
    Division: 'Atlantic',
    Wins: 25,
    Losses: 57,
    Percentage: 0.305,
    ConferenceWins: 18,
    ConferenceLosses: 34,
    DivisionWins: 1,
    DivisionLosses: 15,
    HomeWins: 14,
    HomeLosses: 27,
    AwayWins: 11,
    AwayLosses: 30,
    LastTenWins: 2,
    LastTenLosses: 8,
    PointsPerGameFor: 112.35,
    PointsPerGameAgainst: 118.79,
    Streak: -4,
    GamesBack: 39.0,
    StreakDescription: 'L4',
    GlobalTeamID: 20000010,
    ConferenceRank: 1,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 15,
    Key: 'MIL',
    City: 'Milwaukee',
    Name: 'Bucks',
    Conference: 'Eastern',
    Division: 'Central',
    Wins: 49,
    Losses: 33,
    Percentage: 0.598,
    ConferenceWins: 34,
    ConferenceLosses: 18,
    DivisionWins: 10,
    DivisionLosses: 7,
    HomeWins: 31,
    HomeLosses: 11,
    AwayWins: 18,
    AwayLosses: 22,
    LastTenWins: 3,
    LastTenLosses: 7,
    PointsPerGameFor: 118.97,
    PointsPerGameAgainst: 116.35,
    Streak: -2,
    GamesBack: 15.0,
    StreakDescription: 'L2',
    GlobalTeamID: 20000015,
    ConferenceRank: 0,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 12,
    Key: 'CLE',
    City: 'Cleveland',
    Name: 'Cavaliers',
    Conference: 'Eastern',
    Division: 'Central',
    Wins: 48,
    Losses: 34,
    Percentage: 0.585,
    ConferenceWins: 31,
    ConferenceLosses: 21,
    DivisionWins: 11,
    DivisionLosses: 5,
    HomeWins: 26,
    HomeLosses: 15,
    AwayWins: 22,
    AwayLosses: 19,
    LastTenWins: 4,
    LastTenLosses: 6,
    PointsPerGameFor: 112.63,
    PointsPerGameAgainst: 110.21,
    Streak: -1,
    GamesBack: 16.0,
    StreakDescription: 'L1',
    GlobalTeamID: 20000012,
    ConferenceRank: 0,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 13,
    Key: 'IND',
    City: 'Indiana',
    Name: 'Pacers',
    Conference: 'Eastern',
    Division: 'Central',
    Wins: 47,
    Losses: 35,
    Percentage: 0.573,
    ConferenceWins: 32,
    ConferenceLosses: 20,
    DivisionWins: 11,
    DivisionLosses: 6,
    HomeWins: 26,
    HomeLosses: 15,
    AwayWins: 21,
    AwayLosses: 20,
    LastTenWins: 7,
    LastTenLosses: 3,
    PointsPerGameFor: 123.29,
    PointsPerGameAgainst: 120.24,
    Streak: 1,
    GamesBack: 17.0,
    StreakDescription: 'W1',
    GlobalTeamID: 20000013,
    ConferenceRank: 0,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 11,
    Key: 'CHI',
    City: 'Chicago',
    Name: 'Bulls',
    Conference: 'Eastern',
    Division: 'Central',
    Wins: 39,
    Losses: 43,
    Percentage: 0.476,
    ConferenceWins: 22,
    ConferenceLosses: 29,
    DivisionWins: 7,
    DivisionLosses: 9,
    HomeWins: 20,
    HomeLosses: 21,
    AwayWins: 19,
    AwayLosses: 22,
    LastTenWins: 5,
    LastTenLosses: 5,
    PointsPerGameFor: 112.26,
    PointsPerGameAgainst: 113.7,
    Streak: -1,
    GamesBack: 25.0,
    StreakDescription: 'L1',
    GlobalTeamID: 20000011,
    ConferenceRank: 1,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 14,
    Key: 'DET',
    City: 'Detroit',
    Name: 'Pistons',
    Conference: 'Eastern',
    Division: 'Central',
    Wins: 14,
    Losses: 68,
    Percentage: 0.171,
    ConferenceWins: 10,
    ConferenceLosses: 41,
    DivisionWins: 2,
    DivisionLosses: 14,
    HomeWins: 7,
    HomeLosses: 33,
    AwayWins: 7,
    AwayLosses: 35,
    LastTenWins: 2,
    LastTenLosses: 8,
    PointsPerGameFor: 109.87,
    PointsPerGameAgainst: 118.98,
    Streak: -1,
    GamesBack: 50.0,
    StreakDescription: 'L1',
    GlobalTeamID: 20000014,
    ConferenceRank: 1,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 5,
    Key: 'ORL',
    City: 'Orlando',
    Name: 'Magic',
    Conference: 'Eastern',
    Division: 'Southeast',
    Wins: 47,
    Losses: 35,
    Percentage: 0.573,
    ConferenceWins: 32,
    ConferenceLosses: 20,
    DivisionWins: 9,
    DivisionLosses: 7,
    HomeWins: 29,
    HomeLosses: 12,
    AwayWins: 18,
    AwayLosses: 23,
    LastTenWins: 5,
    LastTenLosses: 5,
    PointsPerGameFor: 110.46,
    PointsPerGameAgainst: 108.43,
    Streak: 1,
    GamesBack: 17.0,
    StreakDescription: 'W1',
    GlobalTeamID: 20000005,
    ConferenceRank: 0,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 4,
    Key: 'MIA',
    City: 'Miami',
    Name: 'Heat',
    Conference: 'Eastern',
    Division: 'Southeast',
    Wins: 46,
    Losses: 36,
    Percentage: 0.561,
    ConferenceWins: 32,
    ConferenceLosses: 20,
    DivisionWins: 13,
    DivisionLosses: 3,
    HomeWins: 22,
    HomeLosses: 19,
    AwayWins: 24,
    AwayLosses: 17,
    LastTenWins: 7,
    LastTenLosses: 3,
    PointsPerGameFor: 110.14,
    PointsPerGameAgainst: 108.39,
    Streak: 2,
    GamesBack: 18.0,
    StreakDescription: 'W2',
    GlobalTeamID: 20000004,
    ConferenceRank: 1,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 3,
    Key: 'ATL',
    City: 'Atlanta',
    Name: 'Hawks',
    Conference: 'Eastern',
    Division: 'Southeast',
    Wins: 36,
    Losses: 46,
    Percentage: 0.439,
    ConferenceWins: 22,
    ConferenceLosses: 30,
    DivisionWins: 8,
    DivisionLosses: 8,
    HomeWins: 21,
    HomeLosses: 20,
    AwayWins: 15,
    AwayLosses: 26,
    LastTenWins: 3,
    LastTenLosses: 7,
    PointsPerGameFor: 118.32,
    PointsPerGameAgainst: 120.51,
    Streak: -6,
    GamesBack: 28.0,
    StreakDescription: 'L6',
    GlobalTeamID: 20000003,
    ConferenceRank: 1,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 2,
    Key: 'CHA',
    City: 'Charlotte',
    Name: 'Hornets',
    Conference: 'Eastern',
    Division: 'Southeast',
    Wins: 21,
    Losses: 61,
    Percentage: 0.256,
    ConferenceWins: 14,
    ConferenceLosses: 38,
    DivisionWins: 6,
    DivisionLosses: 10,
    HomeWins: 11,
    HomeLosses: 30,
    AwayWins: 10,
    AwayLosses: 31,
    LastTenWins: 3,
    LastTenLosses: 7,
    PointsPerGameFor: 106.58,
    PointsPerGameAgainst: 116.82,
    Streak: 1,
    GamesBack: 43.0,
    StreakDescription: 'W1',
    GlobalTeamID: 20000002,
    ConferenceRank: 1,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 1,
    Key: 'WAS',
    City: 'Washington',
    Name: 'Wizards',
    Conference: 'Eastern',
    Division: 'Southeast',
    Wins: 15,
    Losses: 67,
    Percentage: 0.183,
    ConferenceWins: 11,
    ConferenceLosses: 41,
    DivisionWins: 4,
    DivisionLosses: 12,
    HomeWins: 7,
    HomeLosses: 34,
    AwayWins: 8,
    AwayLosses: 33,
    LastTenWins: 1,
    LastTenLosses: 9,
    PointsPerGameFor: 113.74,
    PointsPerGameAgainst: 123.03,
    Streak: -6,
    GamesBack: 49.0,
    StreakDescription: 'L6',
    GlobalTeamID: 20000001,
    ConferenceRank: 1,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 18,
    Key: 'OKC',
    City: 'Oklahoma City',
    Name: 'Thunder',
    Conference: 'Western',
    Division: 'Northwest',
    Wins: 57,
    Losses: 25,
    Percentage: 0.695,
    ConferenceWins: 36,
    ConferenceLosses: 16,
    DivisionWins: 12,
    DivisionLosses: 4,
    HomeWins: 33,
    HomeLosses: 8,
    AwayWins: 24,
    AwayLosses: 17,
    LastTenWins: 7,
    LastTenLosses: 3,
    PointsPerGameFor: 120.08,
    PointsPerGameAgainst: 112.67,
    Streak: 5,
    GamesBack: 0.0,
    StreakDescription: 'W5',
    GlobalTeamID: 20000018,
    ConferenceRank: 0,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 20,
    Key: 'DEN',
    City: 'Denver',
    Name: 'Nuggets',
    Conference: 'Western',
    Division: 'Northwest',
    Wins: 57,
    Losses: 25,
    Percentage: 0.695,
    ConferenceWins: 33,
    ConferenceLosses: 19,
    DivisionWins: 10,
    DivisionLosses: 6,
    HomeWins: 33,
    HomeLosses: 8,
    AwayWins: 24,
    AwayLosses: 17,
    LastTenWins: 6,
    LastTenLosses: 4,
    PointsPerGameFor: 114.85,
    PointsPerGameAgainst: 109.59,
    Streak: 1,
    GamesBack: 0.0,
    StreakDescription: 'W1',
    GlobalTeamID: 20000020,
    ConferenceRank: 0,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 16,
    Key: 'MIN',
    City: 'Minnesota',
    Name: 'Timberwolves',
    Conference: 'Western',
    Division: 'Northwest',
    Wins: 56,
    Losses: 26,
    Percentage: 0.683,
    ConferenceWins: 37,
    ConferenceLosses: 15,
    DivisionWins: 12,
    DivisionLosses: 4,
    HomeWins: 30,
    HomeLosses: 11,
    AwayWins: 26,
    AwayLosses: 15,
    LastTenWins: 6,
    LastTenLosses: 4,
    PointsPerGameFor: 112.97,
    PointsPerGameAgainst: 106.52,
    Streak: -1,
    GamesBack: 1.0,
    StreakDescription: 'L1',
    GlobalTeamID: 20000016,
    ConferenceRank: 0,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 17,
    Key: 'UTA',
    City: 'Utah',
    Name: 'Jazz',
    Conference: 'Western',
    Division: 'Northwest',
    Wins: 31,
    Losses: 51,
    Percentage: 0.378,
    ConferenceWins: 16,
    ConferenceLosses: 36,
    DivisionWins: 5,
    DivisionLosses: 11,
    HomeWins: 21,
    HomeLosses: 20,
    AwayWins: 10,
    AwayLosses: 31,
    LastTenWins: 2,
    LastTenLosses: 8,
    PointsPerGameFor: 115.65,
    PointsPerGameAgainst: 120.54,
    Streak: -1,
    GamesBack: 26.0,
    StreakDescription: 'L1',
    GlobalTeamID: 20000017,
    ConferenceRank: 1,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 19,
    Key: 'POR',
    City: 'Portland',
    Name: 'Trail Blazers',
    Conference: 'Western',
    Division: 'Northwest',
    Wins: 21,
    Losses: 61,
    Percentage: 0.256,
    ConferenceWins: 8,
    ConferenceLosses: 44,
    DivisionWins: 1,
    DivisionLosses: 15,
    HomeWins: 11,
    HomeLosses: 30,
    AwayWins: 10,
    AwayLosses: 31,
    LastTenWins: 2,
    LastTenLosses: 8,
    PointsPerGameFor: 106.36,
    PointsPerGameAgainst: 115.39,
    Streak: -5,
    GamesBack: 36.0,
    StreakDescription: 'L5',
    GlobalTeamID: 20000019,
    ConferenceRank: 1,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 28,
    Key: 'LAC',
    City: 'Los Angeles',
    Name: 'Clippers',
    Conference: 'Western',
    Division: 'Pacific',
    Wins: 51,
    Losses: 31,
    Percentage: 0.622,
    ConferenceWins: 30,
    ConferenceLosses: 22,
    DivisionWins: 9,
    DivisionLosses: 7,
    HomeWins: 25,
    HomeLosses: 16,
    AwayWins: 26,
    AwayLosses: 15,
    LastTenWins: 6,
    LastTenLosses: 4,
    PointsPerGameFor: 115.62,
    PointsPerGameAgainst: 112.34,
    Streak: -3,
    GamesBack: 6.0,
    StreakDescription: 'L3',
    GlobalTeamID: 20000028,
    ConferenceRank: 0,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 29,
    Key: 'PHO',
    City: 'Phoenix',
    Name: 'Suns',
    Conference: 'Western',
    Division: 'Pacific',
    Wins: 49,
    Losses: 33,
    Percentage: 0.598,
    ConferenceWins: 29,
    ConferenceLosses: 23,
    DivisionWins: 9,
    DivisionLosses: 9,
    HomeWins: 25,
    HomeLosses: 16,
    AwayWins: 24,
    AwayLosses: 17,
    LastTenWins: 7,
    LastTenLosses: 3,
    PointsPerGameFor: 116.24,
    PointsPerGameAgainst: 113.18,
    Streak: 3,
    GamesBack: 8.0,
    StreakDescription: 'W3',
    GlobalTeamID: 20000029,
    ConferenceRank: 0,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 27,
    Key: 'LAL',
    City: 'Los Angeles',
    Name: 'Lakers',
    Conference: 'Western',
    Division: 'Pacific',
    Wins: 47,
    Losses: 35,
    Percentage: 0.573,
    ConferenceWins: 27,
    ConferenceLosses: 25,
    DivisionWins: 7,
    DivisionLosses: 10,
    HomeWins: 28,
    HomeLosses: 14,
    AwayWins: 19,
    AwayLosses: 21,
    LastTenWins: 7,
    LastTenLosses: 3,
    PointsPerGameFor: 118.03,
    PointsPerGameAgainst: 117.43,
    Streak: 2,
    GamesBack: 10.0,
    StreakDescription: 'W2',
    GlobalTeamID: 20000027,
    ConferenceRank: 1,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 26,
    Key: 'GS',
    City: 'Golden State',
    Name: 'Warriors',
    Conference: 'Western',
    Division: 'Pacific',
    Wins: 46,
    Losses: 36,
    Percentage: 0.561,
    ConferenceWins: 26,
    ConferenceLosses: 26,
    DivisionWins: 7,
    DivisionLosses: 9,
    HomeWins: 21,
    HomeLosses: 20,
    AwayWins: 25,
    AwayLosses: 16,
    LastTenWins: 8,
    LastTenLosses: 2,
    PointsPerGameFor: 117.76,
    PointsPerGameAgainst: 115.15,
    Streak: 1,
    GamesBack: 11.0,
    StreakDescription: 'W1',
    GlobalTeamID: 20000026,
    ConferenceRank: 1,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 30,
    Key: 'SAC',
    City: 'Sacramento',
    Name: 'Kings',
    Conference: 'Western',
    Division: 'Pacific',
    Wins: 46,
    Losses: 36,
    Percentage: 0.561,
    ConferenceWins: 30,
    ConferenceLosses: 22,
    DivisionWins: 10,
    DivisionLosses: 7,
    HomeWins: 24,
    HomeLosses: 17,
    AwayWins: 22,
    AwayLosses: 19,
    LastTenWins: 4,
    LastTenLosses: 6,
    PointsPerGameFor: 116.56,
    PointsPerGameAgainst: 114.81,
    Streak: 1,
    GamesBack: 11.0,
    StreakDescription: 'W1',
    GlobalTeamID: 20000030,
    ConferenceRank: 1,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 25,
    Key: 'DAL',
    City: 'Dallas',
    Name: 'Mavericks',
    Conference: 'Western',
    Division: 'Southwest',
    Wins: 50,
    Losses: 32,
    Percentage: 0.61,
    ConferenceWins: 31,
    ConferenceLosses: 21,
    DivisionWins: 11,
    DivisionLosses: 5,
    HomeWins: 25,
    HomeLosses: 16,
    AwayWins: 25,
    AwayLosses: 16,
    LastTenWins: 7,
    LastTenLosses: 3,
    PointsPerGameFor: 117.85,
    PointsPerGameAgainst: 115.64,
    Streak: -2,
    GamesBack: 7.0,
    StreakDescription: 'L2',
    GlobalTeamID: 20000025,
    ConferenceRank: 0,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 23,
    Key: 'NO',
    City: 'New Orleans',
    Name: 'Pelicans',
    Conference: 'Western',
    Division: 'Southwest',
    Wins: 49,
    Losses: 33,
    Percentage: 0.598,
    ConferenceWins: 30,
    ConferenceLosses: 22,
    DivisionWins: 9,
    DivisionLosses: 7,
    HomeWins: 21,
    HomeLosses: 19,
    AwayWins: 28,
    AwayLosses: 14,
    LastTenWins: 5,
    LastTenLosses: 5,
    PointsPerGameFor: 115.07,
    PointsPerGameAgainst: 110.65,
    Streak: -1,
    GamesBack: 8.0,
    StreakDescription: 'L1',
    GlobalTeamID: 20000023,
    ConferenceRank: 1,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 22,
    Key: 'HOU',
    City: 'Houston',
    Name: 'Rockets',
    Conference: 'Western',
    Division: 'Southwest',
    Wins: 41,
    Losses: 41,
    Percentage: 0.5,
    ConferenceWins: 28,
    ConferenceLosses: 24,
    DivisionWins: 9,
    DivisionLosses: 7,
    HomeWins: 27,
    HomeLosses: 14,
    AwayWins: 14,
    AwayLosses: 27,
    LastTenWins: 4,
    LastTenLosses: 6,
    PointsPerGameFor: 114.32,
    PointsPerGameAgainst: 113.2,
    Streak: 2,
    GamesBack: 16.0,
    StreakDescription: 'W2',
    GlobalTeamID: 20000022,
    ConferenceRank: 1,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 21,
    Key: 'MEM',
    City: 'Memphis',
    Name: 'Grizzlies',
    Conference: 'Western',
    Division: 'Southwest',
    Wins: 27,
    Losses: 55,
    Percentage: 0.329,
    ConferenceWins: 14,
    ConferenceLosses: 37,
    DivisionWins: 8,
    DivisionLosses: 8,
    HomeWins: 9,
    HomeLosses: 32,
    AwayWins: 18,
    AwayLosses: 23,
    LastTenWins: 3,
    LastTenLosses: 7,
    PointsPerGameFor: 105.81,
    PointsPerGameAgainst: 112.81,
    Streak: -5,
    GamesBack: 30.0,
    StreakDescription: 'L5',
    GlobalTeamID: 20000021,
    ConferenceRank: 1,
    DivisionRank: 0,
  },
  {
    Season: 2024,
    SeasonType: 1,
    TeamID: 24,
    Key: 'SA',
    City: 'San Antonio',
    Name: 'Spurs',
    Conference: 'Western',
    Division: 'Southwest',
    Wins: 22,
    Losses: 60,
    Percentage: 0.268,
    ConferenceWins: 14,
    ConferenceLosses: 37,
    DivisionWins: 3,
    DivisionLosses: 13,
    HomeWins: 12,
    HomeLosses: 29,
    AwayWins: 10,
    AwayLosses: 31,
    LastTenWins: 6,
    LastTenLosses: 4,
    PointsPerGameFor: 112.09,
    PointsPerGameAgainst: 118.58,
    Streak: 2,
    GamesBack: 35.0,
    StreakDescription: 'W2',
    GlobalTeamID: 20000024,
    ConferenceRank: 1,
    DivisionRank: 0,
  },
];

// Hard coded NBA data to avoid api calls during testing

const cache = {
  nbaData: nbaData,
};

export default function useApiData() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const nbaStandingsUrl =
    'https://api.sportsdata.io/v3/nba/scores/json/Standings/2024?key=b461640f8b2641b8bcaf42396b30ba9a';

  const fecthData = async () => {
    setLoading(true);
    try {
      let nbaData;
      if (cache['nbaData']) {
        nbaData = cache['nbaData'];
        console.log('nbaData successfully loaded from cache');
      } else {
        const response = await fetch(nbaStandingsUrl);
        console.log('API called from fetchData');

        if (response.status === 200) {
          nbaData = await response.json();
          cache['nbaData'] = nbaData;
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