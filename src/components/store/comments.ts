import { makeAutoObservable } from "mobx";
import axios from "axios";
import { commentsInterface } from "../pages/games/GameInterface";

class Comments {
    comments: commentsInterface[] = null;
    constructor() {
        makeAutoObservable(this)
    }
    async getByGame(game: string) {
        //@ts-ignore
        this.comments = (await axios.get(`http://localhost:3000/api/comments/${game}`)).data
    }

    async post(data: commentsInterface) {
        await axios.post(`http://localhost:3000/api/comments/`, data)
        console.log(data)
        await this.getByGame(String(data.game))
    }
}

export default new Comments()