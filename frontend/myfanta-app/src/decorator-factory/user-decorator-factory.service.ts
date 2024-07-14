import { Injectable } from '@angular/core';
import { User } from 'src/decorator/user';

@Injectable({
  providedIn: 'root'
})
export class UserDecoratorFactoryService {

  constructor() { }

  public createFakeUser() : User {
    return new User();
    
  }

  
}
