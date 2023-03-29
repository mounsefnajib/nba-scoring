import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApiResponse } from '../models/ApiResponse';
import { Team } from '../models/Team';
import { TeamStat } from '../models/TeamStat';

import NBAScoringService from '../services/NBAScoringService';
import TeamStatService from '../services/TeamStatService';
import { fetchTeams, fetchTeamStats, selectTeams, selectTeamsStats } from '../store/NbaScoringReducer';
import { useAppDispatch } from '../store/store';
import TeamCard from './TeamCard';

export default function Dashboard() {
  // const [teams, setTeams] = React.useState<Team[]>([]);
  const [teamSelectedId, setTeamSelectedId] = React.useState(1);
  // const [teamsStats, setTeamsStats]= React.useState<TeamStat[]>([])

  const teams = useSelector(selectTeams)
  const teamsStats = useSelector(selectTeamsStats)
  const dispatch = useAppDispatch()


  React.useEffect(() => {
    //NBAScoringService.getListTeams().then((response) => setTeams(response.data))
    dispatch(fetchTeams())
  }, [])

  const handleAddTeam = () => {
    if(teamSelectedId === 0)
      return;
    dispatch(fetchTeamStats(teamSelectedId))
    // NBAScoringService.getTeamLatestStats(teamSelectedId).then(
    //   response => {
    //     let teamStat = ({
    //           team: teams.find(team => team.id == teamSelectedId),
    //           ...TeamStatService.summarisingResult(response.data.map(
    //             teamScoring => TeamStatService.calculStats(teamSelectedId, teamScoring)
    //           ))
    //     })  as TeamStat
    //     setTeamsStats( teamsStats => ([...teamsStats, teamStat]))
    //   }
    // );
  }
  return (
    <>
    <div className="row mb-3">
      <div className="col-6" >
          <select 
          className="form-select" 
          id="teamSelect" 
          value={teamSelectedId}
          onChange={(event) => setTeamSelectedId(+event.target.value)}>
              { teams.map((team) => (
                  <option  key={team.id} value={team.id}>{team.full_name}</option>
              ))}
              
          </select>
      </div>
      <div className="col-2">
          <button type="button" className="btn btn-success" onClick={handleAddTeam} id="trackBtn">Track team</button>
      </div>
    </div>

    <div  className="row">
        {teamsStats.map(
          teamStat => (
            <div   className="col-6">
                <TeamCard teamStat={teamStat} />
            </div>
          )
          )
        }
    </div>
</>
  )
}