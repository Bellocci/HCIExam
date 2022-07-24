import { Observable, of } from "rxjs";

export class Championship {
    championshipId:number = -1;
    championshipName:string = '';
    sport:number = -1;
}

export const CHAMPIONSHIP_DATA:Observable<Championship[]> = of([
    {
        championshipId : 1,
        championshipName : 'Serie A',
        sport : 1
    },
    {
        championshipId : 2,
        championshipName : 'Premier League',
        sport : 1
    },
    {
        championshipId : 3,
        championshipName : 'Serie A Female',
        sport : 2
    },
    {
        championshipId : 4,
        championshipName : 'NBA',
        sport : 3
    },
])