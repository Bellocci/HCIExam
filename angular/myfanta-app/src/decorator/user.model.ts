import { ColorEnum } from "src/enum/ColorEnum.model";
import { UserEntity } from "src/model/userEntity.model";

export class User {
    
    private userEntity!:UserEntity;
    private readonly emptyUser:UserEntity = {
        userId: -1,
        name: "",
        surname: "",
        username: "",
        password: "",
        color: ColorEnum.WHITE,
        active: true,
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

    getEntity() : UserEntity {
        return this.userEntity;
    }

    getName() : string {
        return this.userEntity.name;
    }

    getSurname() : string {
        return this.userEntity.surname;
    }

    getUsername() : string {
        return this.userEntity.username;
    }

    getPassword() : string {
        return this.userEntity.password;
    }

    getColor() : string {
        return this.userEntity.color;
    }

    isUserDefined() : boolean {
        return this.userEntity.userId != -1;
    }

    isActive() : boolean {
        return this.userEntity.active;
    }

    toString() : string {
        return "Nome: " + this.userEntity.name + " Cognome: " + this.userEntity.surname + 
            " Username: " + this.userEntity.username + " Password: " + this.userEntity.password;
    }

    equals(other: any) : boolean {
        if(other == null) {
            return false;
        }

        if(!(other instanceof User)) {
            return false;
        }

        return this.userEntity.userId == other.userEntity.userId && this.userEntity.name == other.userEntity.name && 
            this.userEntity.surname == other.userEntity.surname && this.userEntity.username == other.userEntity.username &&
            this.userEntity.password == other.userEntity.password && this.userEntity.color == other.userEntity.color;
    }
}