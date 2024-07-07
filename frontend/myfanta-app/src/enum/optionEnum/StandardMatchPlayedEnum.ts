
export class StandardMatchPlayedEnum {
    
    public static readonly ALL_PLAYERS = new StandardMatchPlayedEnum("Tutti", 0);
    public static readonly TWO_THIRDS_MATCH = new StandardMatchPlayedEnum(">75%", 75);
    public static readonly ONE_HALF_MATCH = new StandardMatchPlayedEnum(">50%", 50);
    public static readonly ONE_THIRDS_MATCH = new StandardMatchPlayedEnum(">25%", 25);

    private constructor(public readonly label:string, public readonly value:number) {} 

    public static getValues() : StandardMatchPlayedEnum[] {
        return [StandardMatchPlayedEnum.ALL_PLAYERS, StandardMatchPlayedEnum.TWO_THIRDS_MATCH, 
            StandardMatchPlayedEnum.ONE_HALF_MATCH, StandardMatchPlayedEnum.ONE_THIRDS_MATCH]
    }
}