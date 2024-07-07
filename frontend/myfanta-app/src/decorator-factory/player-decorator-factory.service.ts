import { Injectable } from '@angular/core';
import { PlayerEntity } from 'src/model/playerEntity.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerDecoratorFactoryService {

  constructor() { }

  decorateList(playerEntityList:PlayerEntity[]) : PlayerEntity[] {
    let list:PlayerEntity[] = [];
    for(let playerEntity of playerEntityList) {
      list.push(playerEntity);
    }
    return list;
  }
}
