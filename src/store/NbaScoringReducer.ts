import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TeamStat } from '../models/TeamStat'
import { Team } from '../models/Team'
import NBAScoringService from '../services/NBAScoringService'
import TeamStatService from '../services/TeamStatService'
import { RootState } from './store'

export interface NBAScoringState {
  teamsStats: TeamStat[],
  teams: Team[]
}

const initialState: NBAScoringState = {
  teamsStats: [],
  teams: []
}


export const fetchTeams = createAsyncThunk<Team[]>(
  'nbaScoring/fetchTeams',
  async () => {
    const response = await NBAScoringService.getListTeams();
    return response.data
  }
)

export const fetchTeamStats = createAsyncThunk<{teamId: number, teamStat: TeamStat}, number>(
  'nbaScoring/fetchTeamStats',
  async (teamId) => {
    const response = await NBAScoringService.getTeamLatestStats(teamId);
    let teamStat = ({
      ...TeamStatService.summarisingResult(response.data.map(
        teamScoring => TeamStatService.calculStats(teamId, teamScoring)
      ))
    })  as TeamStat
    return ({ teamId,teamStat})
  }
)


export const nbaScoringSlice = createSlice({
  name: 'nbaScoring',
  initialState,
  reducers: {
    deleteTeam: (state, action: PayloadAction<number>) => {
      state.teamsStats = state.teamsStats.filter(
        teamStat => teamStat.team.id !== action.payload
      )
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTeams.fulfilled, (state, action) => {
      state.teams = action.payload
    })
    builder.addCase(fetchTeamStats.fulfilled, (state, action) => {
      state.teamsStats = [
        ...state.teamsStats,
        {
        ...action.payload.teamStat,
        team: state.teams.find(team => team.id === action.payload.teamId)!
      }
    ]
    })
  },
})

// Action creators are generated for each case reducer function
export const { deleteTeam } = nbaScoringSlice.actions

export const selectTeams = (state: RootState) => state.nbaScoringReducer.teams
export const selectTeamsStats = (state: RootState) => state.nbaScoringReducer.teamsStats
export const selectTeamStatById = (state: RootState, teamId: number) => (
                                      state.nbaScoringReducer.teamsStats.find(
                                        teamStat => teamStat.team.id === teamId
                                        )
                                    )


export default nbaScoringSlice.reducer