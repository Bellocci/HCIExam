import { Injectable } from '@angular/core';
import { TeamEntity } from 'src/model/teamEntity.model';

@Injectable({
  providedIn: 'root'
})
export class TeamDecoratorFactoryService {

  constructor() { }

  decorateList(teamEntityList:TeamEntity[]) : TeamEntity[] {
    let list:TeamEntity[] = [];
    teamEntityList.forEach(t => list.push(t));
    return list;
  }
}
