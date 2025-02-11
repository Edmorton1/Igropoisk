import { makeAutoObservable } from "mobx"
import $api from "."

class Steam {
    constructor() {
        makeAutoObservable(this)
    }

    async game(id: string) {
        const game = await $api.get(`/game/${id}`)
        console.log(game)
        return game.data
    }

    // async allGames(data) {
    //     const allGames = await $api.get(`/`)
    // }
}

export default new Steam()