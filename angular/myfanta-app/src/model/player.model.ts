import { Observable, of } from "rxjs";

class Player {
    playerId!:number;
    playerName!:string;
    team!:number;
    cost!:number;
    role!:string;
    age!:number;
    matchPlayed!:number;
}

export const PLAYER_DATA_SERIE_A:Player[] = [
    {
        playerId : 1,
        playerName : 'Musso',
        team : 1,
        cost : 12,
        role : 'P',
        age : 27,
        matchPlayed : 24,
    },
    {
        playerId : 2,
        playerName : 'Toloi',
        team : 1,
        cost : 8,
        role : 'D',
        age : 31,
        matchPlayed : 16,
    },
    {
        playerId : 3,
        playerName : 'Malinovskyi',
        team : 1,
        cost : 22,
        role : 'C',
        age : 28,
        matchPlayed : 22,
    },
    {
        playerId : 4,
        playerName : 'Pasalic',
        team : 1,
        cost : 28,
        role : 'C',
        age : 27,
        matchPlayed : 24,
    },
    {
        playerId : 5,
        playerName : 'Arnautovic',
        team : 2,
        cost : 24,
        role : 'A',
        age : 32,
        matchPlayed : 23,
    },
    {
        playerId : 6,
        playerName : 'De Silvestri',
        team : 2,
        cost : 14,
        role : 'D',
        age : 33,
        matchPlayed : 23,
    },
    {
        playerId : 7,
        playerName : 'Soriano',
        team : 2,
        cost : 10,
        role : 'C',
        age : 31,
        matchPlayed : 25,
    },
    {
        playerId : 8,
        playerName : 'Skorupski',
        team : 2,
        cost : 10,
        role : 'P',
        age : 30,
        matchPlayed : 27,
    },
    {
        playerId : 9,
        playerName : 'Theate',
        team : 2,
        cost : 12,
        role : 'D',
        age : 21,
        matchPlayed : 22,
    },
    {
        playerId : 10,
        playerName : 'Orsolini',
        team : 2,
        cost : 18,
        role : 'C',
        age : 25,
        matchPlayed : 18,
    },
    {
        playerId : 11,
        playerName : 'Muriel',
        team : 1,
        cost : 23,
        role : 'A',
        age : 30,
        matchPlayed : 16,
    },
    {
        playerId : 12,
        playerName : 'Zapata',
        team : 1,
        cost : 34,
        role : 'A',
        age : 30,
        matchPlayed : 17,
    },
    {
        playerId : 13,
        playerName : 'Zappacosta',
        team : 1,
        cost : 13,
        role : 'D',
        age : 29,
        matchPlayed : 21,
    },
    {
        playerId : 14,
        playerName : 'De Roon',
        team : 1,
        cost : 8,
        role : 'C',
        age : 30,
        matchPlayed : 21,
    },
    {
        playerId : 15,
        playerName : 'Boga',
        team : 1,
        cost : 8,
        role : 'A',
        age : 25,
        matchPlayed : 16,
    }
]

export const PLAYER_DATA_PREMIER_LEAGUE:Observable<Player[]> = of([

    {
        playerId : 16,
        playerName : 'Ramsdale',
        team : 3,
        cost : 17,
        role : 'P',
        age : 24,
        matchPlayed : 19,
    },
    {
        playerId : 17,
        playerName : 'Gabriel',
        team : 3,
        cost : 14,
        role : 'D',
        age : 25,
        matchPlayed : 19,
    },
    {
        playerId : 18,
        playerName : 'Thomas',
        team : 3,
        cost : 14,
        role : 'C',
        age : 29,
        matchPlayed : 17,
    },
    {
        playerId : 19,
        playerName : 'Watkins',
        team : 4,
        cost : 15,
        role : 'A',
        age : 27,
        matchPlayed : 20,
    },
    {
        playerId : 20,
        playerName : 'Traorè ',
        team : 4,
        cost : 3,
        role : 'A',
        age : 27,
        matchPlayed : 2,
    }
])

export const PLAYER_DATA_SERIE_A_FEMALE:Observable<Player[]> = of([
    {
        playerId : 21,
        playerName : 'Lippmann ',
        team : 5,
        cost : 12,
        role : 'O',
        age : 28,
        matchPlayed : 23,
    },
    {
        playerId : 22,
        playerName : 'Merlo ',
        team : 5,
        cost : 12,
        role : 'L',
        age : 28,
        matchPlayed : 2,
    },
    {
        playerId : 23,
        playerName : 'Angeloni ',
        team : 5,
        cost : 14,
        role : 'S',
        age : 32,
        matchPlayed : 23,
    },
    {
        playerId : 24,
        playerName : 'Alberti',
        team : 5,
        cost : 15,
        role : 'C',
        age : 29,
        matchPlayed : 23,
    },
    {
        playerId : 25,
        playerName : 'Malinov',
        team : 5,
        cost : 14,
        role : 'P',
        age : 26,
        matchPlayed : 23,
    }

])

export const PLAYER_DATA_NBA:Observable<Player[]> = of([
    {
        playerId : 26,
        playerName : 'Lebron',
        team : 6,
        cost : 15,
        role : 'C',
        age : 29,
        matchPlayed : 20,
    },
    {
        playerId : 27,
        playerName : 'Russell',
        team : 6,
        cost : 19.5,
        role : 'G',
        age : 32,
        matchPlayed : 16,
    },
    {
        playerId : 28,
        playerName : 'Talen',
        team : 6,
        cost : 8.5,
        role : 'G',
        age : 22,
        matchPlayed : 7,
    },
    {
        playerId : 29,
        playerName : 'Carmelo',
        team : 6,
        cost : 8.0,
        role : 'F',
        age : 38,
        matchPlayed : 15,
    },
])