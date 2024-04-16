import { RouterService } from "src/app/service/router.service";
import { LinkEnumVisitorWithReturnInterface } from "./LinkEnumVisitorWithReturnInterface";
import { LinkEnum } from "src/enum/LinkEnum.model";
import { PlayerEntity } from "src/model/playerEntity.model";


export class LinkEnumIsCurrentPageVisitorWithReturn implements LinkEnumVisitorWithReturnInterface<boolean>  {

    constructor(private readonly routerService:RouterService) {}

    home(): boolean {
        return this.routerService.currentPageIsHome();
    }

    createTeam(): boolean {
        return this.routerService.currentPageIsMyTeam() || 
            this.routerService.currentPageIsFavoritList() || 
            this.routerService.currentPageIsBlacklist();
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
    
    playerProfile(player: PlayerEntity): boolean {
        return this.routerService.currentPageIsPlayerProfile(player);
    }
}