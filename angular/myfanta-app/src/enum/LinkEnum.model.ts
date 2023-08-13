/*
Classe che racchiude label ed url dei link di navigazione
*/

import { LinkEnumVisitorInterface } from "src/visitor/link-enum/LinkEnumVisitorInterface";
import { LinkEnumVisitorWithReturnInterface } from "src/visitor/link-enum/LinkEnumVisitorWithReturnInterface";

export class LinkEnum {

    public static readonly PARENT_PATH:string = "/fantasyteam/";

    public static readonly HOME = new LinkEnum("home", "Home", this.PARENT_PATH + "home");
    public static readonly CREATE_TEAM = new LinkEnum("myTeam", "Crea squadra", this.PARENT_PATH + "myTeam");
    public static readonly MYTEAM = new LinkEnum("myTeam", "Miei giocatori", this.PARENT_PATH + "myTeam");
    public static readonly PLAYER_LIST = new LinkEnum("playerList", "Lista giocatori", this.PARENT_PATH + "playerList");
    public static readonly FAVORIT_LIST = new LinkEnum("favoritList", "Giocatori preferiti", this.PARENT_PATH + "favoriteList");
    public static readonly BLACKLIST = new LinkEnum("blacklist", "Giocatori esclusi", this.PARENT_PATH + "blacklist");
    public static readonly USER_PROFILE = new LinkEnum("profile", "Mio Profilo", this.PARENT_PATH + "myProfile");
    public static readonly OPTIONS = new LinkEnum("options", "Opzioni di ricerca", this.PARENT_PATH + "options");
    public static readonly PLAYER_PROFILE = new LinkEnum("playerProfile", "Profilo giocatore");

    private constructor(public readonly label: string, public readonly description: string, public readonly path?:string) {}

    static visit(linkEnum:LinkEnum, visitor:LinkEnumVisitorInterface) : void {
        if(LinkEnum.HOME == linkEnum) {
            visitor.home();
        } else if(LinkEnum.CREATE_TEAM == linkEnum) {
            visitor.createTeam();
        } else if(LinkEnum.MYTEAM == linkEnum) {
            visitor.myTeam();
        } else if(LinkEnum.PLAYER_LIST == linkEnum) {
            visitor.playerList();
        } else if(LinkEnum.FAVORIT_LIST == linkEnum) {
            visitor.favoriteList();
        } else if(LinkEnum.BLACKLIST == linkEnum) {
            visitor.blackList();
        } else if(LinkEnum.USER_PROFILE == linkEnum) {
            visitor.userProfile();
        } else if(LinkEnum.OPTIONS == linkEnum) {
            visitor.options();
        } else {
            throw new Error("link " + linkEnum.description + " not found");
        }
    }

    static visitAndReturn<I>(linkEnum:LinkEnum, visitor:LinkEnumVisitorWithReturnInterface<I>) : I {
        if(LinkEnum.HOME == linkEnum) {
            return visitor.home();
        } else if(LinkEnum.CREATE_TEAM == linkEnum) {
            return visitor.createTeam();
        } else if(LinkEnum.MYTEAM == linkEnum) {
            return visitor.myTeam();
        } else if(LinkEnum.PLAYER_LIST == linkEnum) {
            return visitor.playerList();
        } else if(LinkEnum.FAVORIT_LIST == linkEnum) {
            return visitor.favoriteList();
        } else if(LinkEnum.BLACKLIST == linkEnum) {
            return visitor.blackList();
        } else if(LinkEnum.USER_PROFILE == linkEnum) {
            return visitor.userProfile();
        } else if(LinkEnum.OPTIONS == linkEnum) {
            return visitor.options();
        } else {
            throw new Error("link " + linkEnum.description + " not found");
        }
    }
}