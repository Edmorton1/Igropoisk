import { makeAutoObservable } from "mobx";
import axios from "axios";
import { relationInterface, relationArrInterface, gameInAllInterface } from "../pages/games/GameInterface";
import { toJS } from "mobx";

class Relations {
    relation: relationInterface[] = null;
    
    constructor() {
        makeAutoObservable(this)
    }
    async getByUser(user_id: string, game?: string) {
        const game_url = game ? game : ''
        //@ts-ignore
        this.relation = (await axios.get(`http://localhost:3000/api/relations/${user_id}?game=${game_url}`)).data
    }
    async post(data: relationInterface) {
        await axios.post(`http://localhost:3000/api/relations/`, data)
        console.log(data)
        await this.getByUser(String(data.user_id))
    }
    async grade(game?: number | string) {
        const response = await fetch(`http://localhost:3000/api/grades?game=${game}`)
        const data = response.json()
        return data
    }
    async gradeChange(grade: number | string, id: number) {
        grade == 0 ? grade = null : Number(grade)
        console.log(grade, id)
        await axios.put(`http://localhost:3000/api/relations/${id}`,
            {
                "grade": grade
            }
        )
    }
    async relationGame(user_id: string, game?: string) {
        const response = await fetch(`http://localhost:3000/api/relations/${user_id}?game=${game}`)
        const data = response.json()
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