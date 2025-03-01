import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { commentsInterface } from "../pages/games/GameInterface";

class Comments {
    comments: commentsInterface[] = null;
    constructor() {
        makeAutoObservable(this)
    }
    async getByGame(game: string) {
        const response = (await axios.get(`http://localhost:3000/api/comments/${game}`)).data
        runInAction(() => {
            //@ts-ignore
            this.comments = response
        })
    }

    async post(data: commentsInterface) {
        await axios.post(`http://localhost:3000/api/comments/`, data)
        console.log(data)
        await this.getByGame(String(data.game))
    }
    async change(id: number, text: string, game: number) {
        await axios.put(`http://localhost:3000/api/comments/${id}`, {
            text: text
        })
        await this.getByGame(String(game))
    }
    async delete(id: number, game: number) {
        console.log(id, game)
        await axios.delete(`http://localhost:3000/api/comments/${id}`)
        await this.getByGame(String(game))
    }
}

export default new Comments()