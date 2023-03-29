
import { Link } from 'react-router-dom';
import { TeamStat } from '../models/TeamStat';
import { deleteTeam } from '../store/NbaScoringReducer';
import { useAppDispatch } from '../store/store';
import '../style.css'

export default function TeamCard({ teamStat}: {teamStat: TeamStat}) {
  const dispatch = useAppDispatch()

  const handleDeleteTeam = (teamId: number) => {
      dispatch(deleteTeam(teamId))
  }
  return (
        <div  className="card mb-4 rounded-3 shadow-sm" id="teamcard">
            
          <div className="card-header py-3">
            <button 
                id={`remove${teamStat.team.abbreviation}`} 
                type="button" className="btn-close close" 
                aria-label="Close"  
                onClick={() => handleDeleteTeam(teamStat.team.id)}>
            </button>
            <h4 className="my-0 fw-normal">{teamStat.team.full_name } [{teamStat.team.abbreviation}]</h4>
            <span>{teamStat.team.conference} conference</span>
            
          </div>
          <div className="card-body">
            <div className="row">
                <div className="col-6">
                    <ul className="list-unstyled  ">
                        <li className="text-small">Results of past 12 days :</li>
                        <li> 
                           { teamStat.stats.map(
                            (teamScoring, index) => (
                              <span  
                              key={teamScoring.winLose+index}
                              className={teamScoring.winLose === 'W' ? 'text-bg-success badge ml-3' : 'text-bg-danger badge ml-3'}
                             
                              >
                                {teamScoring.winLose}
                              </span>
                            )
                           )}
                            
                        </li>
                        <li>Avg pts scored: {teamStat.averages?.avgScored}</li>
                        <li>Avg pts conceded: {teamStat.averages?.avgConceded}</li>
                    </ul>
                </div>
                <div className="col-6">
                    <img src={`https://interstate21.com/nba-logos/${teamStat.team.abbreviation}.png`}
                    style={{ width: 200 }}
                   />
                   
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                <Link to ={`/results/${teamStat.team.abbreviation}`}> 
                    <button 
                    id={`results${teamStat.team.abbreviation}`}
                    type="button" 
                    className="w-100 btn btn-lg btn-success"
                    >See game results {'>>'}
                    </button>
                     </Link>
                </div>
            </div>

            
          </div>
        </div>

  )
}