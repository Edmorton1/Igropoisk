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
}

export default new Steam()