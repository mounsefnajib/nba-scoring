import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {  selectTeamStatByteamAbbreviation } from '../store/NbaScoringReducer';
import { RootState } from '../store/store';

export default function Result() {

  const { teamAbbreviation } = useParams();
  const teamStat = useSelector((state: RootState) => selectTeamStatByteamAbbreviation(state, teamAbbreviation || ''))
  const navigate = useNavigate();



  return (
    teamStat?(
    <div className="card mb-4 col-6 rounded-3 shadow-sm" >
            
     <div className="card-header py-3">

        <h4 className="my-0 fw-normal">{teamStat.team.full_name } [{teamStat.team.abbreviation}]</h4>
        <span>{teamStat.team.conference} conference</span>
        
      </div>
      <div className="card-body">
        <div className="row">
            <div className="col-12">
                <ul className="list-unstyled  ">
                    <li className="text-small font-size-8">Scores of past 12 days :</li>
                    
                      { teamStat.stats.map(
                        (teamScoring, index) => (
                          <li key={teamScoring.home_team.abbreviation+index}>
                          <b>{teamScoring.home_team.abbreviation} </b><span>{teamScoring.home_team_score} </span>
                          -<span> {teamScoring.visitor_team_score} </span><b>{teamScoring.visitor_team.abbreviation} </b>
                          </li>
                        )
                      )}
                </ul>
            </div>
            
        </div>
        <div className="row">
            <div className="col-6">
                <button id="backBtn" type="button" className="w-100 btn btn-lg btn-success" onClick={()=>navigate(-1)}>
                {'<<'} Back to all team stats
                </button>
            </div>
        </div>
      </div>
</div>): <div></div>



  )
}