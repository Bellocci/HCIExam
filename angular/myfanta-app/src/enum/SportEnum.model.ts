
/* Classe che espone tutti gli sport disponibili */

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
}