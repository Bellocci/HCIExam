import { Injectable } from '@angular/core';
import { League } from 'src/decorator/League.model';
import { LeagueEntity } from 'src/model/leagueEntity.model';

@Injectable({
  providedIn: 'root'
})
export class LeagueDecoratorFactoryService {

  constructor() { }

  decorate(leagueEntity:LeagueEntity) : League {
    return new League(leagueEntity);
  }

  decorateList(leagueEntityList:LeagueEntity[]) : League[] {
    let decoratedList:League[] = [];
    leagueEntityList.forEach(entity => decoratedList.push(new League(entity)));
    return decoratedList;
  }
}
