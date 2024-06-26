import { PlayerEntity } from "src/model/playerEntity.model";


export interface LinkEnumVisitorWithReturnInterface<I> {

    home() : I;

    createTeam() : I;

    myTeam() : I;

    playerList() : I;

    favoriteList() : I;

    blackList() : I;

    userProfile() : I;

    options() : I;

    playerProfile(player:PlayerEntity) : I;
}