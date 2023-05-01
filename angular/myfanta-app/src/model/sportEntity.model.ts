import { Observable, of } from "rxjs";

export class SportEntity {
    sportId!:number;
    name: string = '';
}

export const SPORT_DATA:SportEntity[] = [
    {
      sportId : 1,
      name : 'Calcio'
    },
    {
      sportId : 2,
      name : 'Pallavolo'
    },
    {
      sportId : 3,
      name : 'Basket'
    }
]