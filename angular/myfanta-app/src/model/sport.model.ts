import { Observable, of } from "rxjs";

export class Sport {
    sportId:number = -1;
    sportName: string = '';
}

export const SPORT_DATA:Observable<Sport[]> = of([
    {
      sportId : 1,
      sportName : 'Football soccer'
    },
    {
      sportId : 2,
      sportName : 'Volleyball'
    },
    {
      sportId : 3,
      sportName : 'Basketball'
    }
])