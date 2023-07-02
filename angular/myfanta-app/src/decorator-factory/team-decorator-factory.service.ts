import { Injectable } from '@angular/core';
import { Team } from 'src/decorator/team.model';
import { TeamEntity } from 'src/model/teamEntity.model';

@Injectable({
  providedIn: 'root'
})
export class TeamDecoratorFactoryService {

  constructor() { }

  decorateList(teamEntityList:TeamEntity[]) : Team[] {
    let list:Team[] = [];
    teamEntityList.forEach(t => list.push(new Team(t)));
    return list;
  }
}
