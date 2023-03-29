import { Team } from "./Team";
import { TeamScoring } from "./TeamScoring";

export interface TeamStat {
    team:Team;
    stats: TeamScoring[];
    averages?: {
        avgScored: number,
        avgConceded: number
    }
}