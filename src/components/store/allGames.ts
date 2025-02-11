import { makeAutoObservable } from "mobx";
import { allGameType } from "../pages/games/GameInterface";

type paramTypes = 'release_date' | 'steam_id' | 'total_reviews' | 'total_negative' // 'total_negative' - ЭТО РЕЙТИНГ

class allGames {
    constructor() {
        makeAutoObservable(this)
    }

    games:allGameType = []

    async getAllGames() {
        const response = await fetch(`http://localhost:3000/api/getEverything`)
        const data: allGameType = await response.json()
        this.games = data.sort((a, b) => b.total_reviews - a.total_reviews)
    }

    async orderBy(param: paramTypes) {
        console.log('ОБНОВА')
        if (param == "total_negative") {
            return this.games = this.games.sort((a, b) => (b.total_reviews - b.total_negative) - (a.total_reviews - a.total_negative))
        }
        this.games = this.games.slice().sort((a, b) => Number(b[param]) - Number(a[param]))
    }
}

export default new allGames()