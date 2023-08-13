import { StandardOptionEnum } from "./StandardOptionEnum.model";

export class OptionFootballSoccerEnum {

    public static readonly TEAMS = new OptionFootballSoccerEnum("Selected Teams", StandardOptionEnum.ALL.value);
    public static readonly PLAYERS = new OptionFootballSoccerEnum("Selected Players",StandardOptionEnum.ALL.value);
    public static readonly MIN_AGE = new OptionFootballSoccerEnum("Eta minima", 18);
    public static readonly MAX_AGE = new OptionFootballSoccerEnum("Eta massima", 50);    
    public static readonly MAX_CREDIT = new OptionFootballSoccerEnum("Numero crediti massimo", 250);
    public static readonly MAX_GOALKEEPER_PLAYERS = new OptionFootballSoccerEnum("Portieri", 3, "P");
    public static readonly MAX_DEFENDER_PLAYERS = new OptionFootballSoccerEnum("Difensori", 8, "D");
    public static readonly MAX_MIDFIELDER_PLAYERS = new OptionFootballSoccerEnum("Centrocampisti", 8, "C");
    public static readonly MAX_STRAIKERS_PLAYERS = new OptionFootballSoccerEnum("Attaccanti", 6, "A");
    public static readonly TOTAL_MATCH = new OptionFootballSoccerEnum("Partite di campionato", 38);

    private constructor(public readonly label:string, 
        public readonly value: string | number, 
        public readonly shortName?:string) {}
}