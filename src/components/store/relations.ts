import { makeAutoObservable } from "mobx";
import axios from "axios";
import { relationInterface, relationArrInterface, gameInAllInterface } from "../pages/games/GameInterface";
import { toJS } from "mobx";
import $api from ".";
import { URL_SERVER_API } from "../URLS";

class Relations {
    relation: relationInterface[] = null;
    
    constructor() {
        makeAutoObservable(this)
    }
    async getByUser(user_id: string, game?: string) {
        const game_url = game ? game : ''
        //@ts-ignore
        this.relation = (await axios.get(`${URL_SERVER_API}relations/${user_id}?game=${game_url}`)).data
    }
    async post(data: relationInterface) {
        console.log(data)
        await $api.post(`http://localhost:3000/api/relations/`, data)
        await this.getByUser(String(data.user_id))
    }
    async grade(game?: number | string) {
        const response = await fetch(`${URL_SERVER_API}grades?game=${game}`)
        const data = response.json()
        return data
    }
    async gradeChange(grade: number | string, id: number, user_id: number) {
        grade == 0 ? grade = null : Number(grade)
        console.log(grade, id)
        await $api.put(`${URL_SERVER_API}relations/${id}`,
            {
                "grade": grade,
                "user_id": user_id
            }
        )
    }
    async relationGame(user_id: string, game?: string) {
        const response = await fetch(`${URL_SERVER_API}relations/${user_id}?game=${game}`)
        const data = await response.json()
        console.log(data)
        return data
    }
    async relationParse() {
        const relationsArray:relationArrInterface = {
            planned: [],
            dropped: [],
            play: [],
            passed: []
        }
        for (const e of toJS(this.relation)) {
            //@ts-ignore
            const gameInDB:gameInAllInterface = (await axios.get(`http://localhost:3000/api/gameDB/${e.game}`)).data
            //@ts-ignore
            const gameGrade = (await axios.get(`http://localhost:3000/api/grades?game=${e.game}`)).data[0].grade
            // console.log(gameGrade)
            e['name'] = gameInDB.name
            e['capsule_image'] = gameInDB.capsule_image
            e['total_reviews'] = gameInDB.total_reviews
            e['rating'] = (100 - gameInDB.total_negative / gameInDB.total_reviews * 100).toFixed(2)
            e['grade'] = e.grade
            e['gradeSite'] = gameGrade
            if (e.status == "planned") {relationsArray.planned.push(e)}
            if (e.status == "dropped") {relationsArray.dropped.push(e)}
            if (e.status == "play") {relationsArray.play.push(e)}
            if (e.status == "passed") {relationsArray.passed.push(e)}
        }
        return relationsArray
    }
}

export default new Relations()