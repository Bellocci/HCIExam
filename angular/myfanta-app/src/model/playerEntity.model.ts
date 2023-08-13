import { Team } from "src/decorator/team.model";
import { TEAM_DATA, TeamEntity } from "./teamEntity.model";
import { ROLE_PLAYER_DATA } from "./rolePlayerEntity.model";
import { RolePlayer } from "src/decorator/role-player.model";

export interface PlayerEntity {
    playerId:number;
    playerName:string;
    team:Team;
    cost:number;
    role:RolePlayer;
    age:number;
    matchPlayed:number;
    active:boolean;
    description:string;
}

const description:string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const PLAYER_DATA_SERIE_A:PlayerEntity[] = [
    {
        playerId : 1,
        playerName : 'Musso',
        team : new Team(TEAM_DATA[0]),
        cost : 12,
        role : new RolePlayer(ROLE_PLAYER_DATA[0]),
        age : 27,
        matchPlayed : 34,
        active: true,
        description: description
    },
    {
        playerId : 2,
        playerName : 'Toloi',
        team : new Team(TEAM_DATA[0]),
        cost : 8,
        role : new RolePlayer(ROLE_PLAYER_DATA[1]),
        age : 31,
        matchPlayed : 16,
        active: true,
        description: description
    },
    {
        playerId : 3,
        playerName : 'Malinovskyi',
        team : new Team(TEAM_DATA[0]),
        cost : 22,
        role : new RolePlayer(ROLE_PLAYER_DATA[2]),
        age : 28,
        matchPlayed : 22,
        active: true,
        description: description
    },
    {
        playerId : 4,
        playerName : 'Pasalic',
        team : new Team(TEAM_DATA[0]),
        cost : 28,
        role : new RolePlayer(ROLE_PLAYER_DATA[2]),
        age : 27,
        matchPlayed : 24,
        active: true,
        description: description
    },
    {
        playerId : 5,
        playerName : 'Arnautovic',
        team : new Team(TEAM_DATA[1]),
        cost : 24,
        role : new RolePlayer(ROLE_PLAYER_DATA[3]),
        age : 32,
        matchPlayed : 23,
        active: true,
        description: description
    },
    {
        playerId : 6,
        playerName : 'De Silvestri',
        team : new Team(TEAM_DATA[1]),
        cost : 14,
        role : new RolePlayer(ROLE_PLAYER_DATA[1]),
        age : 33,
        matchPlayed : 23,
        active: true,
        description: description
    },
    {
        playerId : 7,
        playerName : 'Soriano',
        team : new Team(TEAM_DATA[1]),
        cost : 10,
        role : new RolePlayer(ROLE_PLAYER_DATA[2]),
        age : 31,
        matchPlayed : 25,
        active: true,
        description: description
    },
    {
        playerId : 8,
        playerName : 'Skorupski',
        team : new Team(TEAM_DATA[1]),
        cost : 10,
        role : new RolePlayer(ROLE_PLAYER_DATA[0]),
        age : 30,
        matchPlayed : 27,
        active: true,
        description: description
    },
    {
        playerId : 9,
        playerName : 'Theate',
        team : new Team(TEAM_DATA[1]),
        cost : 12,
        role : new RolePlayer(ROLE_PLAYER_DATA[1]),
        age : 21,
        matchPlayed : 22,
        active: true,
        description: description
    },
    {
        playerId : 10,
        playerName : 'Orsolini',
        team : new Team(TEAM_DATA[1]),
        cost : 18,
        role : new RolePlayer(ROLE_PLAYER_DATA[2]),
        age : 25,
        matchPlayed : 18,
        active: true,
        description: description
    },
    {
        playerId : 11,
        playerName : 'Muriel',
        team : new Team(TEAM_DATA[0]),
        cost : 23,
        role : new RolePlayer(ROLE_PLAYER_DATA[3]),
        age : 30,
        matchPlayed : 16,
        active: true,
        description: description
    },
    {
        playerId : 12,
        playerName : 'Zapata',
        team : new Team(TEAM_DATA[0]),
        cost : 34,
        role : new RolePlayer(ROLE_PLAYER_DATA[3]),
        age : 30,
        matchPlayed : 17,
        active: true,
        description: description
    },
    {
        playerId : 13,
        playerName : 'Zappacosta',
        team : new Team(TEAM_DATA[0]),
        cost : 13,
        role : new RolePlayer(ROLE_PLAYER_DATA[1]),
        age : 29,
        matchPlayed : 21,
        active: true,
        description: description
    },
    {
        playerId : 14,
        playerName : 'De Roon',
        team : new Team(TEAM_DATA[0]),
        cost : 8,
        role : new RolePlayer(ROLE_PLAYER_DATA[2]),
        age : 30,
        matchPlayed : 21,
        active: true,
        description: description
    },
    {
        playerId : 15,
        playerName : 'Boga',
        team : new Team(TEAM_DATA[0]),
        cost : 8,
        role : new RolePlayer(ROLE_PLAYER_DATA[3]),
        age : 25,
        matchPlayed : 16,
        active: true,
        description: description
    }
]

export const PLAYER_DATA_PREMIER_LEAGUE:PlayerEntity[] = [

    {
        playerId : 16,
        playerName : 'Ramsdale',
        team : new Team(TEAM_DATA[2]),
        cost : 17,
        role : new RolePlayer(ROLE_PLAYER_DATA[0]),
        age : 24,
        matchPlayed : 19,
        active: true,
        description: description
    },
    {
        playerId : 17,
        playerName : 'Gabriel',
        team : new Team(TEAM_DATA[2]),
        cost : 14,
        role : new RolePlayer(ROLE_PLAYER_DATA[1]),
        age : 25,
        matchPlayed : 19,
        active: true,
        description: description
    },
    {
        playerId : 18,
        playerName : 'Thomas',
        team : new Team(TEAM_DATA[2]),
        cost : 14,
        role : new RolePlayer(ROLE_PLAYER_DATA[2]),
        age : 29,
        matchPlayed : 17,
        active: true,
        description: description
    },
    {
        playerId : 19,
        playerName : 'Watkins',
        team : new Team(TEAM_DATA[3]),
        cost : 15,
        role : new RolePlayer(ROLE_PLAYER_DATA[3]),
        age : 27,
        matchPlayed : 20,
        active: true,
        description: description
    },
    {
        playerId : 20,
        playerName : 'Traorè ',
        team : new Team(TEAM_DATA[3]),
        cost : 3,
        role : new RolePlayer(ROLE_PLAYER_DATA[3]),
        age : 27,
        matchPlayed : 2,
        active: true,
        description: description
    }
]

export const PLAYER_DATA_NBA:PlayerEntity[] = [
    {
        playerId : 26,
        playerName : 'Lebron',
        team : new Team(TEAM_DATA[5]),
        cost : 15,
        role : new RolePlayer(ROLE_PLAYER_DATA[13]),
        age : 29,
        matchPlayed : 20,
        active: true,
        description: description
    },
    {
        playerId : 27,
        playerName : 'Russell',
        team : new Team(TEAM_DATA[5]),
        cost : 19.5,
        role : new RolePlayer(ROLE_PLAYER_DATA[10]),
        age : 32,
        matchPlayed : 16,
        active: true,
        description: description
    },
    {
        playerId : 28,
        playerName : 'Talen',
        team : new Team(TEAM_DATA[5]),
        cost : 8.5,
        role : new RolePlayer(ROLE_PLAYER_DATA[10]),
        age : 22,
        matchPlayed : 7,
        active: true,
        description: description
    },
    {
        playerId : 29,
        playerName : 'Carmelo',
        team : new Team(TEAM_DATA[5]),
        cost : 8.0,
        role : new RolePlayer(ROLE_PLAYER_DATA[11]),
        age : 38,
        matchPlayed : 15,
        active: true,
        description: description
    },
]