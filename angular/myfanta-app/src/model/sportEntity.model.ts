import { Observable, of } from "rxjs";

export class SportEntity {
    sportId!:number;
    name: string = '';
    active!:boolean;
}

export const SPORT_DATA:SportEntity[] = [
    {
      sportId : 1,
      name : 'Calcio',
      active: true,
    },
    {
      sportId : 2,
      name : 'Pallavolo',
      active: true,
    },
    {
      sportId : 3,
      name : 'Basket',
      active: true,
    }
]