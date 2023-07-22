import { Player } from "src/decorator/player.model";
import { TeamDataService } from "../../service/team-data.service";
import { BehaviorSubject, Observable } from "rxjs";
import { RouterService } from "../../service/router.service";
import { LoadDataService } from "../../service/load-data.service";
import { League } from "src/decorator/League.model";

export class TableHelper {

    private static readonly MY_TEAM_TABLE_COLUMNS:string[] = ['name', 'team', 'role', 'cost', 'remove'];
    private static readonly FAVORITE_LIST_TABLE_COLUMNS:string[] = ['name', 'team', 'role', 'cost', 'favorite', 'remove'];
    private static readonly BLACKLIST_TABLE_COLUMNS:string[] = ['name', 'team', 'role', 'cost', 'blacklist', 'remove'];
    private static readonly PLAYER_LIST_TABLE_COLUMNS:string[] = ['name', 'team', 'role', 'cost', 'favorite', 'blacklist'];
    private static readonly ALL_TABLE_COLUMNS:string[] = ['name', 'team', 'role', 'cost', 'favorite', 'blacklist', 'remove'];

    constructor(private teamDataService:TeamDataService,
        private routerService:RouterService,
        private loadDataService:LoadDataService) {}


    getDisplayedColumns() : string[] {
        return this.routerService.currentPageIsMyTeam() ? TableHelper.MY_TEAM_TABLE_COLUMNS :
            this.routerService.currentPageIsFavoritList() ? TableHelper.FAVORITE_LIST_TABLE_COLUMNS :
            this.routerService.currentPageIsBlacklist() ? TableHelper.BLACKLIST_TABLE_COLUMNS :
            this.routerService.currentPageIsPlayerList() ? TableHelper.PLAYER_LIST_TABLE_COLUMNS :
            TableHelper.ALL_TABLE_COLUMNS;
    }

    getPlayerList(league?:League) : Observable<Player[]> {
        return this.routerService.currentPageIsMyTeam() ? this.teamDataService.getObservableOfUserTeam() :
            this.routerService.currentPageIsFavoritList() ? this.teamDataService.getObservableOfFavoriteList() :
            this.routerService.currentPageIsBlacklist() ? this.teamDataService.getObservableOfBlacklist() :
            this.routerService.currentPageIsPlayerList() && league != undefined ? new BehaviorSubject(this.loadDataService.getAllPlayers(league)).asObservable() :
            new BehaviorSubject([]).asObservable();
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