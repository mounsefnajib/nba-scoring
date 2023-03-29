import { AxiosResponse } from "axios";
import { formatISO, subDays } from "date-fns";
import http from "../http-common";
import { ApiResponse } from "../models/ApiResponse";
import { Team } from "../models/Team";
import { TeamScoring } from "../models/TeamScoring";

 class NBAScoringService {

    getListTeams():  Promise<AxiosResponse<Team[]>>{
    return http.get<Team[]>("/teams");
    };

    getTeamLatestStats(teamId: number): Promise<AxiosResponse<TeamScoring[]>>{
      const options = { 
        params: { 
          'page': 0,
          'dates[]': this.getLatestTwelvesDays(),
          'team_ids[]': [teamId],
          'per_page': 12          
        } 
       };
      return http.get<TeamScoring[]>('/games',options);
    }

    getLatestTwelvesDays(): string[]{
      return [0,1,2,3,4,5,6,7,8,9,10,11].map(
        day => formatISO(subDays(new Date(), day),{ representation: 'date' })
      )
    }

}



export default new NBAScoringService();