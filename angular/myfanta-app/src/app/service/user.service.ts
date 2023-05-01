import { Injectable } from '@angular/core';
import { USER_DATA, UserEntity } from 'src/model/userEntity.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user:UserEntity | undefined;

  constructor() { }

  getUser() : UserEntity | undefined {
    return this.user;
  }

  // LOGIN

  login(username:string, password:string):UserEntity | undefined {
    // Qui avverrà la comunicazione con il backend
    console.log("user : " + username + " psw: " + password);
    let result:UserEntity | undefined = USER_DATA.find(user => user.username == username && user.password == password);
    console.log(result)
    if(result != undefined) {
      this.user = result;
    }
    return result;
  }

  logout() : void {
    this.user = undefined;
  }

  isUserLogged() : boolean {
    return this.user != undefined;
  }

  // REGISTRAZIONE

  createNewUser(name:string, surname:string, username:string, password:string) : UserEntity | undefined {
    // Chiamata al backend
    const result:UserEntity[] = USER_DATA.filter(user => user.username == username);
    console.log("RESULT: " + result);
    if(result.length == 0) {
      return {
        userId : 2,
        name : name,
        surname : surname,
        username : username,
        password : password
      }
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
