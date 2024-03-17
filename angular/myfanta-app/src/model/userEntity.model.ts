export class UserEntity {

    private _userId: number; 
    private _name: string;
    private _surname: string;
    private _username: string;
    private _password: string;

    // Unico modo per avere un costruttore multiplo in typescript
    constructor();
    constructor(userId: number, name: string, surname: string, username: string,
        password: string);
    constructor(... params:any[]) {
        if(params.length == 5) {
            this._userId = params[0];
            this._name = params[1];
            this._surname = params[2];
            this._username = params[3];
            this._password = params[4];
        } else {
            this._userId = -1;
            this._name = "";
            this._surname = "";
            this._username = "";
            this._password = "";
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

    // Metodi di utilità

    isUserDefined() : boolean {
        return this.userId != -1;
    }

    isFakeUser() : boolean {
        return this.userId == -1;
    }

    getShortUsername() : string {
        return this.username.trim().slice(0, 2).toUpperCase();
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
        return new UserEntity(json.userId, json.name, json.surname, json.username, json.passwod);
    }
}

export const USER_DATA: UserEntity[] = [
    new UserEntity(1, "Francesco", "Bellocci", "scon", "scon"),
    new UserEntity(3, "Caterina", "Cocchiaro", "Catescon95", "Password1?"),
    new UserEntity(4, "aaa", "aaa", "aaa", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
]