import { Injectable } from '@angular/core';
import { RouterService } from 'src/app/service/router.service';
import { TeamDataService } from 'src/app/service/team-data.service';
import { Player } from 'src/decorator/player.model';

@Injectable({
  providedIn: 'root'
})
export class TeamValidatorService {

  constructor(private teamDataService:TeamDataService,
    private routerService:RouterService) { }

  canAddPlayerToList(player:Player | undefined) : boolean {
    if(this.routerService.currentPageIsMyTeam()) {
      return this.canAddPlayerToUserTeam(player);
    } else if(this.routerService.currentPageIsFavoritList()) {
      return this.canAddPlayerToFavoriteList(player);
    } else {
      return this.canAddPlayerToBlacklist(player);
    }
  }

  private canAddPlayerToUserTeam(player:Player | undefined) : boolean {
    return player != undefined && !this.teamDataService.userTeamHasPlayer(player);
  }

  private canAddPlayerToFavoriteList(player:Player | undefined) : boolean {
    return true;
  }

  private canAddPlayerToBlacklist(player:Player | undefined) : boolean {
    return true;
  }

}
