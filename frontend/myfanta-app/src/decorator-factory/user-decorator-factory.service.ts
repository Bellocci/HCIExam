import { Injectable } from '@angular/core';
import { UserEntity } from 'src/model/userEntity.model';

@Injectable({
  providedIn: 'root'
})
export class UserDecoratorFactoryService {

  constructor() { }

  public createFakeUser() : UserEntity {
    return new UserEntity();
    
  }

  
}
