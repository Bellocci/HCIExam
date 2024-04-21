import { RouterService } from "src/app/service/router.service";
import { LinkEnumVisitorInterface } from "./LinkEnumVisitorInterface";
import { LinkEnum } from "src/enum/LinkEnum.model";
import { PlayerEntity } from "src/model/playerEntity.model";


export class LinkEnumNavigateToPageVisitor implements LinkEnumVisitorInterface {
    
    constructor(private readonly routerService:RouterService) { }
    
    home(): void {
        this.routerService.goToHomePage();
    }

    createTeam(): void {
        this.routerService.goToMyTeamPage();
    }

    myTeam(): void {
        this.routerService.goToMyTeamPage();
    }

    playerList(): void {
        this.routerService.goToPlayerListPage();
    }

    favoriteList(): void {
        this.routerService.goToFavoritListPage();
    }

    blackList(): void {
        this.routerService.goToBlacklistPage();
    }

    userProfile(): void {
        this.routerService.goToMyProfilePage();
    }

    options(): void {
        this.routerService.goToOptionsPage();
    }

    playerProfile(player: PlayerEntity): void {
        this.routerService.goToPlayerPage(player);
    }
}