import { UserEntity } from "src/model/userEntity.model";

export class User {
    
    private userEntity!:UserEntity;
    
    constructor(userEntity:UserEntity) {
        this.userEntity = userEntity;
    }
}