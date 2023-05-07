import { UserEntity } from "src/model/userEntity.model";

export class User {
    
    private userEntity!:UserEntity;
    private emptyUser:UserEntity = {
        userId: -1,
        name: "",
        surname: "",
        username: "",
        password: ""
    }
    
    // Unico modo per avere un costruttore multiplo in typescript
    constructor();    
    constructor(entity:UserEntity);
    constructor(...params:any[]) {
        if(params.length == 0) {
            this.userEntity = this.emptyUser;
        } else if(params.length == 1) {
            this.userEntity = params[0];
        }
    }

    getName() : string {
        return this.userEntity?.name;
    }

    getSurname() : string {
        return this.userEntity?.surname;
    }

    getUsername() : string {
        return this.userEntity?.username;
    }

    getPassword() : string {
        return this.userEntity?.password;
    }

    isUserDefined() : boolean {
        return this.userEntity.userId != -1;
    }
}