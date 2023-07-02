import { Player } from "src/decorator/player.model";
import { TeamDataService } from "../service/team-data.service";
import { Observable } from "rxjs";
import { RouterService } from "../service/router.service";
import { LoadDataService } from "../service/load-data.service";
import { League } from "src/decorator/League.model";

export class TableHelper {

    constructor(private teamDataService:TeamDataService,
        private routerService:RouterService,
        private loadDataService:LoadDataService) {}


    getDisplayedColumns() : string[] {
        return this.routerService.currentPageIsMyTeam() ? ['name', 'team', 'role', 'cost', 'remove'] :
            this.routerService.currentPageIsFavoritList() ? ['name', 'team', 'role', 'cost', 'favorite', 'remove'] :
            this.routerService.currentPageIsBlacklist() ? ['name', 'team', 'role', 'cost', 'blacklist', 'remove'] :
            this.routerService.currentPageIsPlayerList() ? ['name', 'team', 'role', 'cost', 'favorite', 'blacklist'] :
            ['name', 'team', 'role', 'cost', 'favorite', 'blacklist', 'remove'];
    }


    getPlayerList(league?:League) : Observable<Player[]> | Player[] {
        return this.routerService.currentPageIsMyTeam() ? this.teamDataService.getObservableOfUserTeam() :
            this.routerService.currentPageIsFavoritList() ? this.teamDataService.getObservableOfFavoriteList() :
            this.routerService.currentPageIsBlacklist() ? this.teamDataService.getObservableOfBlacklist() :
            this.routerService.currentPageIsPlayerList() && league != undefined ? this.loadDataService.getAllPlayers(league) :
            [];
    }

    clearList() : void {
        this.routerService.currentPageIsMyTeam() ? this.teamDataService.clearUserTeam() :
            this.routerService.currentPageIsFavoritList() ? this.teamDataService.clearFavoritList() :
            this.routerService.currentPageIsBlacklist() ? this.teamDataService.clearBlacklist() :
            null;
    }

    removePlayer(player:Player) : boolean {
        return this.routerService.currentPageIsMyTeam() ? this.teamDataService.removePlayerFromUserTeam(player) :
            this.routerService.currentPageIsFavoritList() ? this.teamDataService.removePlayerFromFavoriteList(player) :
            this.routerService.currentPageIsBlacklist() ? this.teamDataService.removePlayerFromBlacklist(player) : false;
    }
}