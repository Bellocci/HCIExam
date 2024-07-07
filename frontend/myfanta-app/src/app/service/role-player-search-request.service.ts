import { Injectable } from '@angular/core';
import { SportEnum } from 'src/enum/SportEnum.model';
import { ROLE_PLAYER_DATA, RolePlayerEntity } from 'src/model/rolePlayerEntity.model';

@Injectable({
  providedIn: 'root'
})
export class RolePlayerSearchRequestService {

  constructor() { }

  bySport(sport:SportEnum) : RolePlayerEntity[] {
    return ROLE_PLAYER_DATA.filter(role => role.sport.code == sport.code);
  }
}
