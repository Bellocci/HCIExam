import { Injectable } from '@angular/core';
import { Player } from 'src/decorator/player.model';
import { PlayerEntity } from 'src/model/playerEntity.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerDecoratorFactoryService {

  constructor() { }

  decorateList(playerEntityList:PlayerEntity[]) : Player[] {
    let list:Player[] = [];
    for(let playerEntity of playerEntityList) {
      list.push(new Player(playerEntity));
    }
    return list;
  }
}
