import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { commentsInterface } from "../pages/games/GameInterface";
import $api from ".";
import { URL_SERVER_API } from "../URLS";

class Comments {
    comments: commentsInterface[] = null;
    constructor() {
        makeAutoObservable(this)
    }
    async getByGame(game: string) {
        const response = (await axios.get(`${URL_SERVER_API}comments/${game}`)).data
        runInAction(() => {
            //@ts-ignore
            this.comments = response
        })
    }

    async post(data: commentsInterface) {
        await $api.post(`${URL_SERVER_API}comments/`, data)
        console.log(data)
        await this.getByGame(String(data.game))
    }
    async change(id: number, text: string, game: number, user_id: number) {
        await $api.put(`${URL_SERVER_API}comments/${id}`, {
            text: text,
            user_id: user_id
        })
        await this.getByGame(String(game))
    }
    async delete(id: number, game: number) {
        console.log(id, game)
        await $api.delete(`${URL_SERVER_API}comments/${id}`)
        await this.getByGame(String(game))
    }
}

export default new Comments()