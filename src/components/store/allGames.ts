import { makeAutoObservable, runInAction, toJS } from "mobx";
import { allGameType } from "../pages/games/GameInterface";

export type paramTypes = 'release_date' | 'popularity' | 'rating'

class allGames {
    constructor() {
        makeAutoObservable(this)
    }

    games:allGameType = []
    pages: number = null
    
    async getGet(value: any) {
        runInAction(() => {
            this.games = value.games
            this.pages = value.pages
        })
    }

    async search(value: string) {
        // console.log('СЁРЧ')
        const response = await fetch(`http://localhost:3000/api/getSearch?query=${value}`)
        const gamesArray: any = await response.json()
        return gamesArray
    }
}

export default new allGames()