import { Injectable } from '@angular/core';
import { UserTeamEntity } from 'src/model/userTeamEntity.model';
import { PlayerDecoratorFactoryService } from './player-decorator-factory.service';
import { LeagueEntity } from 'src/model/leagueEntity.model';
import { PlayerEntity } from 'src/model/playerEntity.model';
import { UserEntity } from 'src/model/userEntity.model';
import { OptionEntity } from 'src/model/options/optionEntity.model';
import { SportEnum } from 'src/enum/SportEnum.model';
import { OptionFootballSoccerEntity } from 'src/model/options/optionFootballSoccerEntity.model';

@Injectable({
  providedIn: 'root'
})
export class UserTeamDecoratorFactoryService {

  constructor(private playerDecoratorFactory:PlayerDecoratorFactoryService) { }

  createNewUserTeam(user:UserEntity, name:string, league:LeagueEntity, 
      team?:PlayerEntity[], favoriteList?:PlayerEntity[], blacklist?:PlayerEntity[]) : UserTeamEntity {
        
    let newUserTeam = new UserTeamEntity(user, name, league, this.createNewOptionEntity(league.sport));
    if(team != undefined) {
      team.forEach(player => newUserTeam.addPlayerToTeam(player));
    }

    if(favoriteList != undefined) {
      favoriteList.forEach(player => newUserTeam.addPlayerToFavoriteList(player));
    }

    if(blacklist != undefined) {
      blacklist.forEach(player => newUserTeam.addPlayerToBlacklist(player));
    }

    return newUserTeam;
  }

  private createNewOptionEntity(sport:SportEnum) : OptionEntity {
      return SportEnum.visitAndReturn(sport, {
        basketball() {
          // FIXME: AGGIUNGERE L'OPPORTUNA ENTITY
          return new OptionFootballSoccerEntity();
        },

        volleyball() {
          // FIXME: AGGIUNGERE L'OPPORTUNA ENTITY
          return new OptionFootballSoccerEntity();
        },

        footballSoccer() {
          return new OptionFootballSoccerEntity();
        },
      })
  }
}
