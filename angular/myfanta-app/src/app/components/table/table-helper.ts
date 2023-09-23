import { TeamDataService } from "../../service/team-data.service";
import { BehaviorSubject, Observable, Observer } from "rxjs";
import { RouterService } from "../../service/router.service";
import { LoadDataService } from "../../service/load-data.service";
import { SportEnum } from "src/enum/SportEnum.model";
import { LinkEnum } from "src/enum/LinkEnum.model";
import { ValidationProblem } from "src/utility/validation/ValidationProblem";
import { ValidationProblemBuilder } from "src/utility/validation/ValidationProblemBuilder";
import { SnackBarDataTypeEnum } from "src/enum/SnackBarDataTypeEnum.model";
import { LeagueEntity } from "src/model/leagueEntity.model";
import { PlayerEntity } from "src/model/playerEntity.model";

export class TableHelper {

    private static readonly MY_TEAM_TABLE_COLUMNS:string[] = ['name', 'team', 'role', 'cost', 'remove'];
    private static readonly FAVORITE_LIST_TABLE_COLUMNS:string[] = ['name', 'team', 'role', 'cost', 'remove'];
    private static readonly BLACKLIST_TABLE_COLUMNS:string[] = ['name', 'team', 'role', 'cost', 'remove'];
    private static readonly PLAYER_LIST_TABLE_COLUMNS:string[] = ['name', 'team', 'role', 'cost', 'favorite', 'blacklist'];
    private static readonly ALL_TABLE_COLUMNS:string[] = ['name', 'team', 'role', 'cost', 'favorite', 'blacklist', 'remove'];

    constructor(private teamDataService:TeamDataService,
        private routerService:RouterService,
        private loadDataService:LoadDataService) {}


    getDisplayedColumns() : string[] {
        return this.routerService.currentPageIsMyTeam(LinkEnum.MYTEAM) ? TableHelper.MY_TEAM_TABLE_COLUMNS :
            this.routerService.currentPageIsFavoritList(LinkEnum.FAVORIT_LIST) ? TableHelper.FAVORITE_LIST_TABLE_COLUMNS :
            this.routerService.currentPageIsBlacklist(LinkEnum.BLACKLIST) ? TableHelper.BLACKLIST_TABLE_COLUMNS :
            this.routerService.currentPageIsPlayerList(LinkEnum.PLAYER_LIST) ? TableHelper.PLAYER_LIST_TABLE_COLUMNS :
            TableHelper.ALL_TABLE_COLUMNS;
    }

    getPlayerList(league?:LeagueEntity | null) : Observable<PlayerEntity[]> {
        return this.routerService.currentPageIsMyTeam(LinkEnum.MYTEAM) ? this.teamDataService.getObservableOfUserTeam() :
            this.routerService.currentPageIsFavoritList(LinkEnum.FAVORIT_LIST) ? this.teamDataService.getObservableOfFavoriteList() :
            this.routerService.currentPageIsBlacklist(LinkEnum.BLACKLIST) ? this.teamDataService.getObservableOfBlacklist() :
            this.routerService.currentPageIsPlayerList(LinkEnum.PLAYER_LIST) && league != null ? new BehaviorSubject(this.loadDataService.getAllPlayers(league)).asObservable() :
            new BehaviorSubject([]).asObservable();
    }

    clearList() : void {
        this.routerService.currentPageIsMyTeam(LinkEnum.MYTEAM) ? this.teamDataService.clearUserTeam() :
            this.routerService.currentPageIsFavoritList(LinkEnum.FAVORIT_LIST) ? this.teamDataService.clearFavoritList() :
            this.routerService.currentPageIsBlacklist(LinkEnum.BLACKLIST) ? this.teamDataService.clearBlacklist() :
            null;
    }

    removePlayer(player:PlayerEntity) : ValidationProblem | null {
        return this.routerService.currentPageIsMyTeam(LinkEnum.MYTEAM) ? this.teamDataService.removePlayerFromUserTeam(player) :
            this.routerService.currentPageIsFavoritList(LinkEnum.FAVORIT_LIST) ? this.teamDataService.removePlayerFromFavoriteList(player) :
            this.routerService.currentPageIsBlacklist(LinkEnum.BLACKLIST) ? this.teamDataService.removePlayerFromBlacklist(player) : 
            new ValidationProblemBuilder()
                .withValidationType(SnackBarDataTypeEnum.ERROR_TYPE)
                .withMessage("Impossibile rimuovere il giocatore " + player.playerName + " dalla lista")
                .build();
    }


    getNumberOfMatches(sport:SportEnum) : number {
        return SportEnum.visitAndReturn(sport, {
            footballSoccer() : number {
                return 38;
            },

            volleyball() : number {
                return 0;
            },

            basketball() : number {
                return 0
            },
        })
    }
}