import { Injectable } from '@angular/core';
import { UserTeamEntity } from 'src/model/userTeamEntity.model';
import { PlayerDecoratorFactoryService } from './player-decorator-factory.service';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { PlayerEntity } from 'src/model/playerEntity.model';
import { UserEntity } from 'src/model/userEntity.model';
import { OptionEntity } from 'src/model/options/optionEntity.model';

@Injectable({
  providedIn: 'root'
})
export class UserTeamDecoratorFactoryService {

  constructor(private playerDecoratorFactory:PlayerDecoratorFactoryService) { }

  createNewUserTeam(user:UserEntity, name:string, league:LeagueEntity, 
      team?:PlayerEntity[], favoriteList?:PlayerEntity[], blacklist?:PlayerEntity[]) : UserTeamEntity {
        
    let newUserTeam = new UserTeamEntity(user, name, league, new OptionEntity(league.sport), true);
    if(team != undefined) {
      team.forEach(p => newUserTeam.addPlayerToTeam(p));
    }

    if(favoriteList != undefined) {
      favoriteList.forEach(p => newUserTeam.addPlayerToFavoriteList(p));
    }

    if(blacklist != undefined) {
      blacklist.forEach(p => newUserTeam.addPlayerToBlacklist(p));
    }

    return newUserTeam;
  }
}
