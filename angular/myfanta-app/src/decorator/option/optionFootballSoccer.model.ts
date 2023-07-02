import { OptionEntity } from "src/model/optionEntity.model";
import { Option } from "./option.model";
import { Player } from "../player.model";
import { Team } from "../team.model";

export class OptionFootballSoccer extends Option {

    override getTeamsList(): Team[] {
        return {... this.entity.getTeamsList()};
    }

    override addTeamToList(team: Team): boolean {
        let list:Team[] = this.getTeamsList();
        if(list.find(t => t.equals(team)) == undefined) {
            list.push(team);
            this.setTeamsList(list);
            return true;
        }
        return false;
    }

    override removeTeamFromList(team: Team): boolean {
        let list:Team[] = this.getTeamsList();
        let index:number = list.findIndex(t => t.equals(team));
        if(index != -1) {
            list.splice(index, index);
            this.setTeamsList(list);
            return true;
        }
        return false;
    }

    override getPlayersToInclude(): Player[] {
        return {... this.entity.getPlayersToInclude()};
    }

    override addPlayerToInclude(player: Player): boolean {
        let list:Player[] = this.getPlayersToInclude();
        if(list.find(p => p.equals(player)) == undefined) {
            list.push(player);
            this.setPlayersToInclude(list);
            return true;
        }
        return false;
    }
    
    override removePlayerToInclude(player: Player): boolean {
        let list:Player[] = this.getPlayersToInclude();
        let index:number = list.findIndex(p => p.equals(player));
        if(index != -1) {
            list.splice(index, index);
            this.setPlayersToInclude(list);
            return true;
        }
        return false;
    }   

    override getPlayersToExclude(): Player[] {
        return {... this.entity.getPlayersToExclude()};
    }

    override addPlayerToExclude(player: Player): boolean {
        let list:Player[] = this.getPlayersToExclude();
        if(list.find(p => p.equals(player)) == undefined) {
            list.push(player);
            this.setPlayersToExclude(list);
            return true;
        }
        return false;
    }

    override removePlayerToExlude(player: Player): boolean {
        let list:Player[] = this.getPlayersToExclude();
        let index:number = list.findIndex(p => p.equals(player));
        if(index != -1) {
            list.splice(index, index);
            this.setPlayersToExclude(list);
            return true;
        }
        return false;
    }
}