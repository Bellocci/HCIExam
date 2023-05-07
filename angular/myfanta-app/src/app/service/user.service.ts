import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/decorator/user.model';
import { USER_DATA, UserEntity } from 'src/model/userEntity.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user:BehaviorSubject<User> = new BehaviorSubject(new User());
  private currentUser:Observable<User> = this.user.asObservable();

  constructor() { }

  getUser() : Observable<User> {
    return this.currentUser;
  }

  private setUser(user:User) {
    this.user.next(user);
  }

  // LOGIN

  login(username:string, password:string) : void {
    // Qui avverrà la comunicazione con il backend
    console.log("user : " + username + " psw: " + password);
    let result:UserEntity | undefined = USER_DATA.find(user => user.username == username && user.password == password);
    !result ? this.setUser(new User()) : this.setUser(new User(result));
  }

  logout() : void {
    this.setUser(new User());
  }

  // REGISTRAZIONE

  createNewUser(name:string, surname:string, username:string, password:string) : User | undefined {
    // Chiamata al backend
    const result:UserEntity[] = USER_DATA.filter(user => user.username == username);
    if(result.length == 0) {
      const entity:UserEntity = {
        userId : USER_DATA.length,
        name : name,
        surname : surname,
        username : username,
        password : password
      };
      USER_DATA.push(entity)
      return new User(entity);
    }
    return undefined;
  }

  // RECUPERO PASSWORD

  recoveryPassword(name:string, surname:string, username:string) : string | undefined {
    // Chiamata al backend
    const result:UserEntity[] = USER_DATA.filter(user => 
      user.name == name && user.surname == surname && user.username == username);
    
    return result.length == 1 ? result[0].password : undefined;
  }
}
