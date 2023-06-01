
/* Classe che espone tutti i campionati disponibili */

export class ChampionshipEnum {

    public static readonly ITA_CHAMP = new ChampionshipEnum("1", "ITA", "Campionato italiano");
    public static readonly ENG_CHAMP = new ChampionshipEnum("2", "ENG", "Campionato inglese");
    public static readonly USA_CHAMP = new ChampionshipEnum("3", "USA", "Campionato americano");

    private static championshipList:ChampionshipEnum[] = [
        this.ITA_CHAMP,
        this.ENG_CHAMP,
        this.USA_CHAMP
    ]

    private constructor(
        public readonly code: string, 
        public readonly shortDescription: string, 
        public readonly description: string) {}

    
    static getAllChampionship() : ChampionshipEnum[] {
        return [...ChampionshipEnum.championshipList];
    }

}