import { RouterService } from "src/app/service/router.service";
import { LinkEnumVisitorWithReturnInterface } from "./LinkEnumVisitorWithReturnInterface";
import { Player } from "src/decorator/player.model";


export class LinkEnumIsCurrentPageVisitorWithReturn implements LinkEnumVisitorWithReturnInterface<boolean>  {

    constructor(private readonly routerService:RouterService) {}

    home(): boolean {
        return this.routerService.currentPageIsHome();
    }
    createTeam(): boolean {
        return this.routerService.currentPageIsMyTeam() || this.routerService.currentPageIsFavoritList() || this.routerService.currentPageIsBlacklist();
    }

    myTeam(): boolean {
        return this.routerService.currentPageIsMyTeam();
    }

    playerList(): boolean {
        return this.routerService.currentPageIsPlayerList();
    }

    favoriteList(): boolean {
        return this.routerService.currentPageIsFavoritList();
    }

    blackList(): boolean {
        return this.routerService.currentPageIsBlacklist();
    }

    userProfile(): boolean {
        return this.routerService.currentPageIsMyProfile();
    }

    options(): boolean {
        return this.routerService.currentPageIsOptions();
    }
    
    playerProfile(player: Player): boolean {
        return this.routerService.currentPageIsPlayerProfile(player);
    }
}