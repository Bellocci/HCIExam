
export class UserEntity {
    userId!:number;
    name!:string;
    surname!:string;
    username!:string;
    password!:string;
}

export const USER_DATA:UserEntity[] = [
    {
        userId: 1,
        name: "Francesco",
        surname: "Bellocci",
        username: "scon",
        password: "scon"
    },
    {
        userId: 3,
        name: "Caterina",
        surname: "Cocchiaro",
        username: "Catescon95",
        password: "Password1?"
    },
    {
        userId: 4,
        name: "aaa",
        surname: "aaa",
        username: "aaa",
        password: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
]