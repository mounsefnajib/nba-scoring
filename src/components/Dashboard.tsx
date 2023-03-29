import * as React from 'react';
import { useSelector } from 'react-redux';
import { fetchTeams, fetchTeamStats, selectStatus, selectTeams, selectTeamsStats } from '../store/NbaScoringReducer';
import { useAppDispatch } from '../store/store';
import TeamCard from './TeamCard';

export default function Dashboard() {
  const [teamSelectedId, setTeamSelectedId] = React.useState(1);

  const teams = useSelector(selectTeams)
  const status = useSelector(selectStatus)
  const teamsStats = useSelector(selectTeamsStats)
  const dispatch = useAppDispatch()


  React.useEffect(() => {
    if(status === 'idle')
     dispatch(fetchTeams())
     
  }, [])

  const handleAddTeam = () => {
    if(teamSelectedId === 0)
      return;
    if(teamsStats.filter(teamStat => teamStat.team.id === teamSelectedId).length > 0)
      return;
    dispatch(fetchTeamStats(teamSelectedId))
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
            <div key={teamStat.team.id}  className="col-6">
                <TeamCard teamStat={teamStat} />
            </div>
          )
          )
        }
    </div>
</>
  )
}