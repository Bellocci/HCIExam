import { Injectable } from '@angular/core';
import { League } from 'src/decorator/League.model';
import { User } from 'src/decorator/user.model';
import { UserTeam } from 'src/decorator/userTeam.model';
import { UserTeamEntity } from 'src/model/userTeamEntity.model';

@Injectable({
  providedIn: 'root'
})
export class UserTeamDecoratorFactoryService {

  constructor() { }

  createNewUserTeam(user:User, name:string, league:League) : UserTeam {
    const entity:UserTeamEntity = {
      id: -1,
      user: user,
      nameTeam: name,
      league: league,
      team: [],
      favoriteList: [],
      blacklist: [],
      active: true
    }

    return new UserTeam(entity);
  }
}
