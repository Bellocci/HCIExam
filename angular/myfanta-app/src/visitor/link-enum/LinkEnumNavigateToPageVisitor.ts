import { RouterService } from "src/app/service/router.service";
import { LinkEnumVisitorInterface } from "./LinkEnumVisitorInterface";
import { Player } from "src/decorator/player.model";


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

    playerProfile(player: Player): void {
        this.routerService.goToPlayerPage(player);
    }
}