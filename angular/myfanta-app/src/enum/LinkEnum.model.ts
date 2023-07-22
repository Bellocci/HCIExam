/*
Classe che racchiude le label dei link di navigazione delle pagine
*/

export class LinkEnum {

    public static readonly HOME = new LinkEnum("home", "Home");
    public static readonly CREATE_TEAM = new LinkEnum("myTeam", "Crea squadra");
    public static readonly MYTEAM = new LinkEnum("myTeam", "Miei giocatori");
    public static readonly PLAYER_LIST = new LinkEnum("playerList", "Lista giocatori");
    public static readonly FAVORIT_LIST = new LinkEnum("favoritList", "Giocatori preferiti");
    public static readonly BLACKLIST = new LinkEnum("blacklist", "Giocatori esclusi");
    public static readonly USER_PROFILE = new LinkEnum("profile", "Mio Profilo");
    public static readonly OPTIONS = new LinkEnum("options", "Opzioni di ricerca");

    private constructor(public readonly label: string, public readonly description: string) {}
}