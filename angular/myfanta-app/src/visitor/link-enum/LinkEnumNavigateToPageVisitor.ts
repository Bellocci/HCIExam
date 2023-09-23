import { RouterService } from "src/app/service/router.service";
import { LinkEnumVisitorInterface } from "./LinkEnumVisitorInterface";
import { LinkEnum } from "src/enum/LinkEnum.model";
import { PlayerEntity } from "src/model/playerEntity.model";


export class LinkEnumNavigateToPageVisitor implements LinkEnumVisitorInterface {
    
    constructor(private readonly routerService:RouterService) { }
    
    home(): void {
        this.routerService.goToHomePage(LinkEnum.HOME);
    }

    createTeam(): void {
        this.routerService.goToMyTeamPage(LinkEnum.MYTEAM);
    }

    myTeam(): void {
        this.routerService.goToMyTeamPage(LinkEnum.MYTEAM);
    }

    playerList(): void {
        this.routerService.goToPlayerListPage(LinkEnum.PLAYER_LIST);
    }

    favoriteList(): void {
        this.routerService.goToFavoritListPage(LinkEnum.FAVORIT_LIST);
    }

    blackList(): void {
        this.routerService.goToBlacklistPage(LinkEnum.BLACKLIST);
    }

    userProfile(): void {
        this.routerService.goToMyProfilePage(LinkEnum.USER_PROFILE);
    }

    options(): void {
        this.routerService.goToOptionsPage(LinkEnum.OPTIONS);
    }

    playerProfile(player: PlayerEntity): void {
        this.routerService.goToPlayerPage(player);
    }
}