import { makeAutoObservable, runInAction, toJS } from "mobx";
import { allGameType } from "../pages/games/GameInterface";

export type paramTypes = 'release_date' | 'steam_id' | 'total_reviews' | 'total_negative' // 'total_negative' - ЭТО РЕЙТИНГ

interface filterInterface {
    order?: string,
    genre?: any,
    developer?: string,
    publisher?: string,
    release_date?: string
}

class allGames {
    constructor() {
        makeAutoObservable(this)
    }

    games:allGameType = []

    async getAllGames(order?: any, genre?: any) {
        console.log(`http://localhost:3000/api/getEverything?order=${order}&genre=${genre}`)
        const response = await fetch(`http://localhost:3000/api/getEverything?order=${order}&genre=${genre}`)
        const data: allGameType = await response.json()
        return this.games = data
    }

    async orderBy(param: paramTypes) {
        console.log('ОБНОВА')
        this.games = this.games.slice().sort((a, b) => Number(b[param]) - Number(a[param]))
    }
    // async orderBy(param: paramTypes) {
    //     console.log(param)
    //     const response = await fetch(`http://localhost:3000/api/getEverything?order=${param}`)
    //     const data: allGameType = await response.json()
    //     this.games = data
    // }
    async filter(values: filterInterface) {
        const {order, genre, developer, publisher, release_date} = values
        console.log(order, genre, developer, publisher, release_date)
        const response = await fetch(`http://localhost:3000/api/getEverything?genre=${genre}&order=${order}&developer=${developer}&publisher=${publisher}&release_date=${release_date}`)
        const data: allGameType = await response.json()
        runInAction(() => {
            return this.games = data
        })
    }

    async search(value: string) {
        const response = await fetch(`http://localhost:3000/api/getEverything`)
        const gamesArray: allGameType = await response.json()
        const total = gamesArray.filter(e => (e.name).toLocaleLowerCase().includes(value))
        return total
    }
}

export default new allGames()