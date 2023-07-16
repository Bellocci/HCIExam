import { Injectable } from '@angular/core';
import { Option } from 'src/decorator/option/option.model';
import { OptionFootballSoccer } from 'src/decorator/option/optionFootballSoccer.model';
import { SportEnum } from 'src/enum/SportEnum.model';
import { OptionFootballSoccerEnum } from 'src/enum/optionEnum/OptionFootballSoccerEnum.model';
import { OptionEntity } from 'src/model/optionEntity.model';

@Injectable({
  providedIn: 'root'
})
export class OptionDecoratorFactoryService {

  constructor() { }

  createNewOptionFootballSoccer() : Option {
    let entity = new OptionEntity();
    entity.setSport(SportEnum.FOOTBALL_SOCCER);
    entity.setMinAge(Number(OptionFootballSoccerEnum.MIN_AGE.value));
    entity.setMaxAge(Number(OptionFootballSoccerEnum.MAX_AGE.value));
    entity.setMaxCredit(Number(OptionFootballSoccerEnum.MAX_CREDIT.value));
    return new OptionFootballSoccer(entity);
  }

  createNewOption(sport:SportEnum) : Option {
    let entity = new OptionEntity();
    return new OptionFootballSoccer(entity);
  }
}
