import { Player } from "src/decorator/player.model";

export interface LinkEnumVisitorInterface {

    home() : void;

    createTeam() : void;

    myTeam() : void;

    playerList() : void;

    favoriteList() : void;

    blackList() : void;

    userProfile() : void;

    options() : void;

    playerProfile(player:Player) : void;
}