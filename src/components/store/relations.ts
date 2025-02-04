import { makeAutoObservable } from "mobx";
import axios from "axios";
import { relationInterface } from "../pages/games/GameInterface";

class Relations {
    relation: relationInterface = null;
    constructor() {
        makeAutoObservable(this)
    }
    async getByUser(user_id: string) {
        //@ts-ignore
        this.relation = (await axios.get(`http://localhost:3000/api/relations/${user_id}`)).data
        console.log(this.relation)
    }
    async post(data: relationInterface) {
        await axios.post(`http://localhost:3000/api/relations/`, data)
        console.log(data)
        await this.getByUser(String(data.user_id))
    }
}

export default new Relations()