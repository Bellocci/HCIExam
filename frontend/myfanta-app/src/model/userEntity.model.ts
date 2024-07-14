import { UserProfilePhotoEntity } from "./UserProfilePhotoEntity.model";

export class UserEntity {
    private _user_id: number | null = null; 
    private _name: string = "";
    private _surname: string = "";
    private _username: string = "";
    private _password: string = "";
    private _userProfilePhoto: UserProfilePhotoEntity | null = null;    

    // Unico modo per avere un costruttore multiplo in typescript
    constructor(userId?:number) {
        this._user_id = userId ? userId : null;
    }

    public get user_id(): number | null {
        return this._user_id;
    }

    private set user_id(value: number | null) {
        this._user_id = value;
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

    public get userProfilePhoto(): UserProfilePhotoEntity | null {
        return this._userProfilePhoto;
    }

    public set userProfilePhoto(value: UserProfilePhotoEntity | null) {
        this._userProfilePhoto = value;
    }
}