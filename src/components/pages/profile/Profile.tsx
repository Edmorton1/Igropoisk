import { useEffect, useState } from "react"
import relationsResponse from "../../store/relations"
import { useParams } from "react-router-dom"
import axios from "axios"
import { relationArrInterface, userInterface, relationStatus } from "../games/GameInterface"
import "../../css/Profile.scss"

function Profile():React.ReactNode {
    const [load, setLoad] = useState(false)
    const [user, setUser] = useState<userInterface>(null)
    const [relations, setRelations] = useState<relationArrInterface>(null)
    const {nickname} = useParams()

    useEffect(() => {
        async function fetchData() {
            //@ts-ignore
            const data = (await axios.get(`http://localhost:3000/api/users/${nickname}`)).data[0]
            await relationsResponse.getByUser(data.id)
            setUser(data)
            setRelations(await relationsResponse.relationParse())
            setLoad(true)
        }

        fetchData()
    }, [])
    
    function generateRelations(name: relationStatus): React.ReactNode {
        return (
            <ol>{relations[name].map((e, i) => (
                <li key={i} className="game">
                    <img src={e.capsule_image} className="image-game" />
                    <span className="head-inside">
                        <span>{e.name}</span>
                        <span>{e.grade ? e.grade : 'Нет оценки'}</span>
                        <span>{e.gradeSite ? e.gradeSite : 'Нет отзывов'}</span>
                        <span>{e.rating}</span>
                    </span>
                    
                </li>
            ))}</ol>
        )
    }

    if (load) {
        console.log(relations.planned)
        return (
            <main>
                <h1>{nickname}</h1>
                <div>Запланировано: {relations.planned.length} / Играю: {relations.play.length} / Пройдено: {relations.passed.length} / Брошено: {relations.dropped.length} </div>
                {/* <p>Список игр</p>
                <input type="text" placeholder="Поиск по названию..." /> */}
                <p>Запланировано</p>
                <span className="head-section">
                    <span>Название</span>
                    <span>Оценка</span>
                    <span>Рейтинг на Igropoisk</span>
                    <span>Рейтинг STEAM</span>
                </span>
                {generateRelations('planned')}
                <p>Играю</p>
                {generateRelations('play')}
                <p>Пройдено</p>
                {generateRelations('passed')}
                <p>Брошено</p>
                {generateRelations('dropped')}
            </main>
        )
    } else {
        <div>Загрузка</div>
    }
}

export default Profile