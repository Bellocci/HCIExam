import { Injectable } from '@angular/core';
import { League } from 'src/decorator/League.model';
import { User } from 'src/decorator/user.model';
import { UserTeam } from 'src/decorator/userTeam.model';
import { UserTeamEntity } from 'src/model/userTeamEntity.model';
import { PlayerDecoratorFactoryService } from './player-decorator-factory.service';
import { OptionFootballSoccer } from 'src/decorator/option/optionFootballSoccer.model';
import { OptionEntity } from 'src/model/optionEntity.model';
import { Player } from 'src/decorator/player.model';

@Injectable({
  providedIn: 'root'
})
export class UserTeamDecoratorFactoryService {

  constructor(private playerDecoratorFactory:PlayerDecoratorFactoryService) { }

  createNewUserTeam(user:User, name:string, league:League, 
      team?:Player[], favoriteList?:Player[], blacklist?:Player[]) : UserTeam {
        
    let newUserTeam = new UserTeam(this.playerDecoratorFactory);
    newUserTeam.setNameTeam(name);
    newUserTeam.setUser(user);
    newUserTeam.setLeague(league);
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

  decorateList(userTeamList:UserTeamEntity[]) : UserTeam[] {
    let team:UserTeam[] = [];
    for(let userTeam of userTeamList) {
      team.push(new UserTeam(this.playerDecoratorFactory, userTeam));
    }
    return team;
  }
}
