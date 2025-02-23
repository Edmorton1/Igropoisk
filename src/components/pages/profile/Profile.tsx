import { useEffect, useState } from "react"
import relationsResponse from "../../store/relations"
import { useParams } from "react-router-dom"
import axios from "axios"
import { relationArrInterface, userInterface, relationStatus } from "../games/GameInterface"
import "../../css/Profile.scss"
import { Link } from "react-router-dom"
import dragDropStore from "../../store/portals/dragDropStore"
import DragDrop from "./DragDrop"

function Profile():React.ReactNode {
    const [load, setLoad] = useState(false)
    const [user, setUser] = useState<userInterface>(null)
    const [relations, setRelations] = useState<relationArrInterface>(null)
    const {nickname} = useParams()
    const URL = `http://localhost:3000/avatars/`

    useEffect(() => {
        async function fetchData() {
            //@ts-ignore
            const data = (await axios.get(`http://localhost:3000/api/users?nickname=${nickname}`)).data[0]
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
                    <Link to={`/games/${e.game}`}><img src={e.capsule_image} className="image-game" /></Link>
                    <span className="head-inside">
                        <Link to={`/games/${e.game}`}><span>{e.name}</span></Link>
                        <span>{e.grade ? e.grade : 'Нет оценки'}</span>
                        <span>{e.gradeSite ? e.gradeSite : 'Нет отзывов'}</span>
                        <span>{e.rating}</span>
                    </span>
                    
                </li>
            ))}</ol>
        )
    }
    dragDropStore.open()
    const headerSection =
    <span className="head-section">
        <span>Название</span>
        <span>Оценка</span>
        <span>Рейтинг на Igropoisk</span>
        <span>Рейтинг STEAM</span>
    </span> 
    
    if (load) {
        console.log(relations.planned)
        return (
            <>
            <DragDrop/>
            <main>
                <div className="about-user">
                    {user.avatar && <img className="avatar-large" src={`${URL}${user.avatar}`}/>}
                    <button onClick={() => dragDropStore.open()}>Загрузить аватурку</button>
                    <h1>{nickname}</h1>
                    <p>{`На сайте с ${user.created_at}, Комментариев: ${user.comments_count}, Отзывов: ${user.grade_count}`}</p>
                    <div>Запланировано: {relations.planned.length} / Играю: {relations.play.length} / Пройдено: {relations.passed.length} / Брошено: {relations.dropped.length} </div>
                </div>
                {/* <p>Список игр</p>
                <input type="text" placeholder="Поиск по названию..." /> */}
                <p className="border-dashed">Запланировано</p>
                {headerSection}
                {generateRelations('planned')}
                <p className="border-dashed">Играю</p>
                {headerSection}
                {generateRelations('play')}
                <p className="border-dashed">Пройдено</p>
                {headerSection}
                {generateRelations('passed')}
                <p className="border-dashed">Брошено</p>
                {headerSection}
                {generateRelations('dropped')}
            </main>
            </>
        )
    } else {
        <div>Загрузка</div>
    }
}

export default Profile