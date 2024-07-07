
/* Classe che espone tutti gli sport disponibili */

import { SportEnumVisitor } from "src/visitor/sport-enum/SportEnumVisitor";
import { SportEnumVisitorWithReturn } from "src/visitor/sport-enum/SportEnumVisitorWithReturn";

export class SportEnum {
    public static readonly FOOTBALL_SOCCER = new SportEnum("1" , "FOOTBALL_SOCCER", "Calcio");
    public static readonly VOLLEYBALL = new SportEnum("2", "VOLLEYBALL", "Pallavolo");
    public static readonly BASKETBALL = new SportEnum("3", "BASKETBALL", "Basket");

    // Lista per ridurre il tempo di computazione quando dobbiamo restituire tutti gli sport
    private static readonly sportList:SportEnum[] = [
        this.FOOTBALL_SOCCER,
        this.VOLLEYBALL,
        this.BASKETBALL
    ]

    private constructor(public readonly code:string, 
        public readonly label: string, 
        public readonly description: string) {}

    static getAllSport() : SportEnum[] {
        return [...SportEnum.sportList]
    }

    static equals(sport1:SportEnum, sport2:SportEnum) : boolean {
        return sport1.code == sport2.code && sport1.description == sport2.description &&
            sport1.label == sport2.label;
    }

    static visit(sport:SportEnum, visitor:SportEnumVisitor) : void {
        if(sport.description == SportEnum.FOOTBALL_SOCCER.description) {
            visitor.footballSoccer();
        } else if(sport.description == SportEnum.VOLLEYBALL.description) {
            visitor.volleyball();
        } else if(sport.description == SportEnum.BASKETBALL.description) {
            visitor.basketball();
        } else {
            throw new Error("Unknow sport " + sport);
        }
    }

    static visitAndReturn<I>(sport:SportEnum, visitor:SportEnumVisitorWithReturn<I>) : I {
        if(sport.description == SportEnum.FOOTBALL_SOCCER.description) {
            return visitor.footballSoccer();
        } else if(sport.description == SportEnum.VOLLEYBALL.description) {
            return visitor.volleyball();
        } else if(sport.description == SportEnum.BASKETBALL.description) {
            return visitor.basketball();
        } else {
            throw new Error("Unknow sport " + sport);
        }
    }

    toJSON() : any {
        return {
            code : this.code,
            label : this.label,
            description : this.description,
        }
    }

    static fromJSON(json : any) : SportEnum {
        return new SportEnum(json.code, json.label, json.description);
    }
}