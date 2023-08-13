import { RouterService } from "src/app/service/router.service";
import { LinkEnumVisitorWithReturnInterface } from "./LinkEnumVisitorWithReturnInterface";
import { Player } from "src/decorator/player.model";
import { LinkEnum } from "src/enum/LinkEnum.model";


export class LinkEnumIsCurrentPageVisitorWithReturn implements LinkEnumVisitorWithReturnInterface<boolean>  {

    constructor(private readonly routerService:RouterService) {}

    home(): boolean {
        return this.routerService.currentPageIsHome(LinkEnum.HOME);
    }

    createTeam(): boolean {
        return this.routerService.currentPageIsMyTeam(LinkEnum.MYTEAM) || 
            this.routerService.currentPageIsFavoritList(LinkEnum.FAVORIT_LIST) || 
            this.routerService.currentPageIsBlacklist(LinkEnum.BLACKLIST);
    }

    myTeam(): boolean {
        return this.routerService.currentPageIsMyTeam(LinkEnum.MYTEAM);
    }

    playerList(): boolean {
        return this.routerService.currentPageIsPlayerList(LinkEnum.PLAYER_LIST);
    }

    favoriteList(): boolean {
        return this.routerService.currentPageIsFavoritList(LinkEnum.FAVORIT_LIST);
    }

    blackList(): boolean {
        return this.routerService.currentPageIsBlacklist(LinkEnum.BLACKLIST);
    }

    userProfile(): boolean {
        return this.routerService.currentPageIsMyProfile(LinkEnum.USER_PROFILE);
    }

    options(): boolean {
        return this.routerService.currentPageIsOptions(LinkEnum.OPTIONS);
    }
    
    playerProfile(player: Player): boolean {
        return this.routerService.currentPageIsPlayerProfile(player);
    }
}