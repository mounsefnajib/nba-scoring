import { Team } from "./Team";


export interface TeamScoring {
    id: number;
    home_team: Team;
    home_team_score: number;
    period: number;
    season: number;
    status: string;
    time: string;
    visitor_team: Team;
    visitor_team_score: number;
    date: string;
    winLose: 'W' | 'L';
    ptsScored: number;
    ptsConceded: number;
}