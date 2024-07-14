import { UserEntity } from "src/model/userEntity.model";
import { UserProfilePhotoEntity } from "src/model/UserProfilePhotoEntity.model";

export class User {

    private _entity: UserEntity;    

    // Unico modo per avere un costruttore multiplo in typescript
    constructor();
    constructor(userId: number, name: string, surname: string, username: string,
        password: string);
    constructor(... params:any[]) {        
        if(params.length == 5) {
            this._entity = new UserEntity(params[0]);
            this.entity.name = params[1];
            this.entity.surname = params[2];
            this.entity.username = params[3];
            this.entity.password = params[4];
        } else {
            this._entity = new UserEntity();
        }
    }

    public get entity(): UserEntity {
        return this._entity;
    }

    public set entity(value: UserEntity) {
        this._entity = value;
    }

    public get userId(): number | null {
        return this.entity.user_id
    }

    public get name(): string {
        return this.entity.name;
    }

    public set name(value: string) {
        this.entity.name = value;
    }

    public get surname(): string {
        return this.entity.surname;
    }

    public set surname(value: string) {
        this.entity.surname = value;
    }

    public get username(): string {
        return this.entity.username;
    }

    public set username(value: string) {
        this.entity.username = value;
    }

    public get password(): string {
        return this.entity.password;
    }

    public set password(value: string) {
        this.entity.password = value;
    }

    public get userProfilePhoto(): UserProfilePhotoEntity | null {
        return this.entity.userProfilePhoto;
    }

    public set userProfilePhoto(value: UserProfilePhotoEntity | null) {
        this.entity.userProfilePhoto = value;
    }

    // Metodi di utilità

    isUserDefined() : boolean {
        return this.userId != null;
    }

    isFakeUser() : boolean {
        return this.userId == null;
    }

    getShortUsername() : string {
        return this.username.trim().slice(0, 2).toUpperCase();
    }

    toString() : string {
        return "Id: " + this.userId + "Nome: " + this.name + " Cognome: " + this.surname + 
            " Username: " + this.username + " Password: " + this.password;
    }

    equals(other: any) : boolean {
        if(other == null) {
            return false;
        }

        if(!(other instanceof UserEntity)) {
            return false;
        }

        return this.userId == other.user_id && this.name == other.name && 
            this.surname == other.surname && this.username == other.username &&
            this.password == other.password;
    }

    toJSON(): any {
        return {
            userId: this.userId,
            name: this.name,
            surname: this.surname,
            username: this.username,
            password: this.password
        }
    }

    static fromJSON(json: any): UserEntity {
        console.log("JSON: " + json.toString());
        console.log("JSON: " + json.userId);
        console.log("JSON: " + json.name);
        console.log("JSON: " + json.surname);
        return new UserEntity(json.userId);
    }
}

export const USER_DATA: User[] = [
    new User(1, "Francesco", "Bellocci", "scon", "scon"),
    new User(3, "Caterina", "Cocchiaro", "Catescon95", "Password1?"),
    new User(4, "aaa", "aaa", "aaa", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"),
    new User(5, "Francesco", "Bellocci", "FrancescoBellocciBeb96", "scon"),
]