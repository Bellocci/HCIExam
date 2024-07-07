import { PlayerEntity } from "src/model/playerEntity.model";

export interface LinkEnumVisitorInterface {

    home() : void;

    createTeam() : void;

    myTeam() : void;

    playerList() : void;

    favoriteList() : void;

    blackList() : void;

    userProfile() : void;

    options() : void;

    playerProfile(player:PlayerEntity) : void;
}