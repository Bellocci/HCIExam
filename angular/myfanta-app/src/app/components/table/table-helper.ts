import { TeamDataService } from "../../service/team-data.service";
import { BehaviorSubject, Observable } from "rxjs";
import { RouterService } from "../../service/router.service";
import { SportEnum } from "src/enum/SportEnum.model";
import { ValidationProblem } from "src/utility/validation/ValidationProblem";
import { ValidationProblemBuilder } from "src/utility/validation/ValidationProblemBuilder";
import { SnackBarDataTypeEnum } from "src/enum/SnackBarDataTypeEnum.model";
import { LeagueEntity } from "src/model/leagueEntity.model";
import { PlayerEntity } from "src/model/playerEntity.model";
import { PlayerSearchRequestService } from "src/app/service/player-search-request.service";

export class TableHelper {

    private static readonly MOBILE_COLUMNS:string[] = ['name', 'team', 'role', 'expand'];
    private static readonly TEAM_COLUMNS:string[] = ['name', 'team', 'role', 'cost', 'fmv', 'remove'];
    private static readonly PLAYER_LIST_TABLE_COLUMNS:string[] = ['name', 'team', 'role', 'cost', 'fmv', 'favorite', 'blacklist'];

    constructor(private teamDataService:TeamDataService,
        private routerService:RouterService,
        private playerSearchRequest:PlayerSearchRequestService) {}


    getDisplayedColumns(isMobileBreakpointActive:boolean) : string[] {
            if(isMobileBreakpointActive) {
                return TableHelper.MOBILE_COLUMNS;

            } else if(this.routerService.currentPageIsPlayerList()) {
                return TableHelper.PLAYER_LIST_TABLE_COLUMNS;

            } else {
                return TableHelper.TEAM_COLUMNS
            }
    }

    getPlayerList(league?:LeagueEntity | null) : Observable<PlayerEntity[]> {

        return this.routerService.currentPageIsMyTeam() ? this.teamDataService.getObservableOfMyTeam() :
            this.routerService.currentPageIsFavoritList() ? this.teamDataService.getObservableOfFavoriteList() :
            this.routerService.currentPageIsBlacklist() ? this.teamDataService.getObservableOfBlacklist() :
            this.routerService.currentPageIsPlayerList() && league != null ? new BehaviorSubject(this.playerSearchRequest.getAllPlayers(league)).asObservable() :
            new BehaviorSubject([]).asObservable();
    }

    clearList() : void {
        this.routerService.currentPageIsMyTeam() ? this.teamDataService.clearUserTeam() :
            this.routerService.currentPageIsFavoritList() ? this.teamDataService.clearFavoritList() :
            this.routerService.currentPageIsBlacklist() ? this.teamDataService.clearBlacklist() :
            null;
    }

    removePlayer(player:PlayerEntity) : ValidationProblem | null {
        return this.routerService.currentPageIsMyTeam() ? this.teamDataService.removePlayerFromUserTeam(player) :
            this.routerService.currentPageIsFavoritList() ? this.teamDataService.removePlayerFromFavoriteList(player) :
            this.routerService.currentPageIsBlacklist() ? this.teamDataService.removePlayerFromBlacklist(player) : 
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