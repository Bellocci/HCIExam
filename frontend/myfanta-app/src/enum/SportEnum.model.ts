
/* Classe che espone tutti gli sport disponibili */

import { SportEnumVisitor } from "src/visitor/sport-enum/SportEnumVisitor";
import { SportEnumVisitorWithReturn } from "src/visitor/sport-enum/SportEnumVisitorWithReturn";

export class SportEnum {
    public static readonly SOCCER = new SportEnum("SOCCER", "Calcio", "assets/images/football icon.jpeg");
    public static readonly VOLLEYBALL = new SportEnum("VOLLEYBALL", "Pallavolo", "assets/images/volleyball icon.jpeg");
    public static readonly BASKETBALL = new SportEnum("BASKETBALL", "Basket", "assets/images/basketball icon.jpeg");

    // Lista per ridurre il tempo di computazione quando dobbiamo restituire tutti gli sport
    private static readonly sportList:SportEnum[] = [
        this.SOCCER,
        this.VOLLEYBALL,
        this.BASKETBALL
    ]

    // Mappa statica che associa il nome dello Sport al suo enumerato
    private static readonly sportMap:Map<string, SportEnum> = new Map<string, SportEnum>([
        [SportEnum.SOCCER.name, SportEnum.SOCCER],
        [SportEnum.VOLLEYBALL.name, SportEnum.VOLLEYBALL],
        [SportEnum.BASKETBALL.name, SportEnum.BASKETBALL]
    ]);

    private constructor(public readonly name: string, 
        public readonly description: string,
        public readonly icon:string) {}

    static getAllSport() : SportEnum[] {
        return [...SportEnum.sportList]
    }

    static getSport(name:string) : SportEnum | undefined {
        return this.sportMap.get(name);
    }

    static getIcon(name:string):string {
        let sport:SportEnum | undefined = this.getSport(name);
        if(sport != undefined) {
            return sport.icon;
        }
        return "";
    }

    static equals(sport1:SportEnum, sport2:SportEnum) : boolean {
        return sport1.description == sport2.description &&
            sport1.name == sport2.name;
    }

    static visit(sport:SportEnum, visitor:SportEnumVisitor) : void {
        if(sport.description == SportEnum.SOCCER.description) {
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
        if(sport.description == SportEnum.SOCCER.description) {
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
            name : this.name,
            description : this.description,
        }
    }

    static fromJSON(json : any) : SportEnum {
        return new SportEnum(json.name, json.description, "");
    }
}