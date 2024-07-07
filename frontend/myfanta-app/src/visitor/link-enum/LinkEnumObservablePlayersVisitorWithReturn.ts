import { Observable, of } from "rxjs";
import { LinkEnumVisitorWithReturnInterface } from "./LinkEnumVisitorWithReturnInterface";
import { PlayerEntity } from "src/model/playerEntity.model";
import { TeamDataService } from "src/app/service/team-data.service";
import { LeagueEntity } from "src/model/leagueEntity.model";
import { PlayerSearchRequestService } from "src/app/service/player-search-request.service";

export class LinkEnumObservablePlayersVisitorWithReturn implements LinkEnumVisitorWithReturnInterface<Observable<PlayerEntity[]>> {
    
    constructor(private readonly teamDataService?:TeamDataService,
        private readonly playerSearchRequest?:PlayerSearchRequestService,
        private readonly league?:LeagueEntity) { }

    home(): Observable<PlayerEntity[]> {
        throw new Error("Method not implemented for Home page.");
    }

    createTeam(): Observable<PlayerEntity[]> {
        throw new Error("Method not implemented for Create Team page.");
    }

    myTeam(): Observable<PlayerEntity[]> {
        if(this.teamDataService == null) {
            throw new Error("Cannot search players of my team");
        }

        return this.teamDataService.getObservableOfMyTeam();
    }

    playerList(): Observable<PlayerEntity[]> {
        if(this.playerSearchRequest == null || this.league == null) {
            throw new Error("Cannot search all player");
        }

        return of(this.playerSearchRequest.getAllPlayers(this.league));
    }

    favoriteList(): Observable<PlayerEntity[]> {
        if(this.teamDataService == null) {
            throw new Error("Cannot search players of my favorite list");
        }

        return this.teamDataService.getObservableOfFavoriteList();
    }

    blackList(): Observable<PlayerEntity[]> {
        if(this.teamDataService == null) {
            throw new Error("Cannot search players of my blacklist");
        }

        return this.teamDataService.getObservableOfBlacklist();
    }

    userProfile(): Observable<PlayerEntity[]> {
        throw new Error("Method not implemented for User Profile page");
    }

    options(): Observable<PlayerEntity[]> {
        throw new Error("Method not implemented for Options page");
    }

    playerProfile(player: PlayerEntity): Observable<PlayerEntity[]> {
        throw new Error("Method not implemented for Player profile");
    }
}