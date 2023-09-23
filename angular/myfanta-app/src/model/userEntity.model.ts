import { ColorEnum } from "src/enum/ColorEnum.model";

export class UserEntity {
    private _userId: number;    
    private _name: string;
    private _surname: string;
    private _username: string;
    private _password: string;
    private _color: string;
    private _active: boolean;    

    // Unico modo per avere un costruttore multiplo in typescript
    constructor();
    constructor(userId: number, name: string, surname: string, username: string,
        password: string, color: string, active: boolean);
    constructor(... params:any[]) {
        if(params.length == 7) {
            this._userId = params[0];
            this._name = params[1];
            this._surname = params[2];
            this._username = params[3];
            this._password = params[4];
            this._color = params[5];
            this._active = params[6];
        } else {
            this._userId = -1;
            this._name = "";
            this._surname = "";
            this._username = "";
            this._password = "";
            this._color = "";
            this._active = true;
        }        
    }

    public get userId(): number {
        return this._userId;
    }

    private set userId(value: number) {
        this._userId = value;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get surname(): string {
        return this._surname;
    }

    public set surname(value: string) {
        this._surname = value;
    }

    public get username(): string {
        return this._username;
    }

    public set username(value: string) {
        this._username = value;
    }

    public get password(): string {
        return this._password;
    }

    public set password(value: string) {
        this._password = value;
    }

    public get color(): string {
        return this._color;
    }

    public set color(value: string) {
        this._color = value;
    }

    public get active(): boolean {
        return this._active;
    }

    public set active(value: boolean) {
        this._active = value;
    }

    // Metodi di utilità

    isUserDefined() : boolean {
        return this.userId != -1;
    }

    toString() : string {
        return "Nome: " + this.name + " Cognome: " + this.surname + 
            " Username: " + this.username + " Password: " + this.password;
    }

    equals(other: any) : boolean {
        if(other == null) {
            return false;
        }

        if(!(other instanceof UserEntity)) {
            return false;
        }

        return this.userId == other.userId && this.name == other.name && 
            this.surname == other.surname && this.username == other.username &&
            this.password == other.password && this.color == other.color;
    }

    toJSON(): any {
        return {
            userId: this.userId,
            name: this.name,
            surname: this.surname,
            username: this.username,
            password: this.password,
            color: this.color,
            active: this.active
        }
    }

    static fromJSON(json: any): UserEntity {
        return new UserEntity(json.userId, json.name, json.surname, json.username, json.passwod, json.color, json.active);
    }
}

export const USER_DATA: UserEntity[] = [
    new UserEntity(1, "Francesco", "Bellocci", "scon", "scon", ColorEnum.YELLOW, true),
    new UserEntity(3, "Caterina", "Cocchiaro", "Catescon95", "Password1?", ColorEnum.GREEN, true),
    new UserEntity(4, "aaa", "aaa", "aaa", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        ColorEnum.RED, true)
]