import { makeAutoObservable } from "mobx";
import axios from "axios";
import { relationInterface, relationArrInterface } from "../pages/games/GameInterface";
import { toJS } from "mobx";

class Relations {
    relation: relationInterface[] = null;
    constructor() {
        makeAutoObservable(this)
    }
    async getByUser(user_id: string) {
        //@ts-ignore
        this.relation = (await axios.get(`http://localhost:3000/api/relations/${user_id}`)).data
    }
    async post(data: relationInterface) {
        await axios.post(`http://localhost:3000/api/relations/`, data)
        console.log(data)
        await this.getByUser(String(data.user_id))
    }
    async relationParse() {
        const relationsArray:relationArrInterface = {
            planned: [],
            dropped: [],
            play: [],
            passed: []
        }
        await toJS(this.relation).forEach(e => {
            if (e.status == "planned") {
                relationsArray.planned.push(e)
            }
            if (e.status == "dropped") {
                relationsArray.dropped.push(e)
            }
            if (e.status == "play") {
                relationsArray.play.push(e)
            }
            if (e.status == "passed") {
                relationsArray.passed.push(e)
            }
        })
        return relationsArray
    }
}

export default new Relations()