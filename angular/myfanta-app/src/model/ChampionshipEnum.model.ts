
export interface Championship {
    id:number;
    description:string;
}

export class ChampionshipEnum {
    
    // ITALIA
    static readonly IT_CHAMP:Championship = {
        id: 1,
        description : "Campionato italiano"
    };

    // INGHILTERRA
    static readonly EN_CHAMP:Championship = {
        id: 2,
        description : "Campionato inglese"
    };

    // STATI UNITI D'AMERICA
    static readonly USA_CHAMP:Championship = {
        id: 3,
        description : "Campionato americano"
    };
}