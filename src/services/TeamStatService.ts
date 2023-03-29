import { TeamScoring } from "../models/TeamScoring";

class TeamStatService {

  calculStats(teamId: number, teamScoring: TeamScoring): TeamScoring{
    const ptsScored = teamScoring.home_team.id === teamId ? teamScoring.home_team_score : teamScoring.visitor_team_score;
    const ptsConceded = teamScoring.home_team.id !== teamId ? teamScoring.home_team_score : teamScoring.visitor_team_score;

    return ({
        ...teamScoring,
        ptsScored,
        ptsConceded,
        winLose: ptsScored > ptsConceded ? 'W' : 'L'

      });
  }  
    
  summarisingResult(teamScorings: TeamScoring[]){

    const avgScored = teamScorings.map(teamScoring => teamScoring.ptsScored).reduce(
        (ptsScoredAcc, ptsScored) => ptsScoredAcc + ptsScored
        ,0
        )/teamScorings.length;

    const avgConceded = teamScorings.map(teamScoring => teamScoring.ptsConceded).reduce(
          (ptsConcededAcc, ptsConceded) => ptsConcededAcc + ptsConceded
          ,0
          )/teamScorings.length;

    return ({
      stats: teamScorings,
      averages: {
        avgScored: Math.round(avgScored),
        avgConceded: Math.round(avgConceded)
      }
    })
  }
}

export default new TeamStatService()