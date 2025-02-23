import { useContext, useEffect, useState } from "react"
import relationStore from "../../store/relations"
import { useParams } from "react-router-dom"
import axios from "axios"
import { relationArrInterface, userInterface, relationStatus } from "../games/GameInterface"
import "../../css/Profile.scss"
import { Link } from "react-router-dom"
import dragDropStore from "../../store/portals/dragDropStore"
import DragDrop from "./DragDrop"
import { URL_PLACEHOLDER, URL_SERVER_AVATARS } from "../../URLS"
import { observer } from "mobx-react-lite"
import { Context } from "../../App"
import { toJS } from "mobx"

function Profile():React.ReactNode {
    const [load, setLoad] = useState(false)
    const [user, setUser] = useState<userInterface>(null)
    const [relations, setRelations] = useState<relationArrInterface>(null)
    const [grade, setGrade] = useState(-1)
    const {nickname} = useParams()
    // console.log(storeUser)

    useEffect(() => {
        async function fetchData() {
            //@ts-ignore
            const data = (await axios.get(`http://localhost:3000/api/users?nickname=${nickname}`)).data[0]
            await relationStore.getByUser(data.id)
            setUser(data)
            setRelations(await relationStore.relationParse())
            setLoad(true)
        }

        fetchData()
    }, [])

    function limitCheck(value: string) {
        let total = Number(value)
        if (total > 10) {
            return '10'
        } else if (total < 1) {
            return '0'
        } else {
            return String(total)
        }
    }
    
    function generateRelations(name: relationStatus): React.ReactNode {
        return (
            <ol>{relations[name].map((e, i) => (
                <li key={i} className="game">
                    <Link to={`/games/${e.game}`}><img src={e.capsule_image} className="image-game" /></Link>
                    <span className="head-inside">
                        <Link to={`/games/${e.game}`}><span>{e.name}</span></Link>
                        <span onMouseEnter={() => setGrade(e.id)} onFocus={() => setGrade(e.id)} onBlur={() => setGrade(-1)}>
                            {grade == e.id ? 
                                        <input type="number" onChange={(event) => {event.target.value = limitCheck(event.target.value); relationStore.gradeChange(event.target.value, e.id); e.grade = event.target.value == '0' ? 'Нет оценки' : event.target.value}} /> 
                                        : e.grade ? e.grade : 'Нет оценки'}
                        </span>
                        <span>{e.gradeSite ? e.gradeSite : 'Нет отзывов'}</span>
                        <span>{e.rating}</span>
                    </span>
                    
                </li>
            ))}</ol>
        )
    }
    // dragDropStore.open()
    const headerSection =
    <span className="head-section">
        <span>Название</span>
        <span>Оценка</span>
        <span>Рейтинг на Igropoisk</span>
        <span>Рейтинг STEAM</span>
    </span> 

    const store = useContext(Context)
    const storeToJS = toJS(useContext(Context)).user
    console.log(storeToJS)
    
    const checkUser = () => {
        return storeToJS ? store && storeToJS.nickname == nickname : false
    }

    if (load) {
        return (
            <>
            <DragDrop/>
            <main>
                <div className="about-user">
                    <img onError={e => e.currentTarget.src = URL_PLACEHOLDER} className="avatar-large" src={`${URL_SERVER_AVATARS}${user.avatar}`}/>
                    {checkUser() && <button onClick={() => dragDropStore.open()}>Загрузить аватурку</button>}
                    <h1>{nickname}</h1>
                    <p>{`На сайте с ${user.created_at}, Комментариев: ${user.comments_count}, Отзывов: ${user.grade_count}`}</p>
                    <div>Запланировано: {relations.planned.length} / Играю: {relations.play.length} / Пройдено: {relations.passed.length} / Брошено: {relations.dropped.length} </div>
                    {checkUser() && <button onClick={() => store.logout()}>Выйти</button>}
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

export default observer(Profile)