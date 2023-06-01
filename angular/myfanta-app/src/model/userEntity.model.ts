import { ColorEnum } from "src/enum/ColorEnum.model";

export class UserEntity {
    userId!:number;
    name!:string;
    surname!:string;
    username!:string;
    password!:string;
    color!:string;
    active!:boolean;
}

export const USER_DATA:UserEntity[] = [
    {
        userId: 1,
        name: "Francesco",
        surname: "Bellocci",
        username: "scon",
        password: "scon",
        color: ColorEnum.YELLOW,
        active: true,
    },
    {
        userId: 3,
        name: "Caterina",
        surname: "Cocchiaro",
        username: "Catescon95",
        password: "Password1?",
        color: ColorEnum.YELLOW,
        active: true,
    },
    {
        userId: 4,
        name: "aaa",
        surname: "aaa",
        username: "aaa",
        password: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        color: ColorEnum.YELLOW,
        active: true,
    }
]