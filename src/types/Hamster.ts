
export interface Hamster {
    id: string
    name: string
    age: number
    imgName: string
    favFood: string
    loves: string
    games: number
    wins: number
    defeats: number
}

export interface HamsterCreate {
    id?: string
    name: string
    age: number
    imgName: string
    favFood: string
    loves: string
    games: number
    wins: number
    defeats: number
}


export interface HamsterUpdate {
    id: string
    hamster: Hamster
}
