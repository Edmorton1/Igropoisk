import { memo, useState } from "react"
import { useUsers } from "../../hooks/useUsers"
import { userInterface } from "../games/GameInterface"
import "../../css/Users.scss"
import { Link } from "react-router-dom"
import { URL_PLACEHOLDER, URL_SERVER_AVATARS } from "../../URLS"

interface dataInterface {
    isLoading: boolean,
    data: userInterface[]
}

function Main():React.ReactNode {
    const {isLoading, data}: dataInterface =  useUsers()

    function returnUsers() {
        return data.map((e, i) => (
            <div key={i} className="user-card border-dashed">
                <span className="left-section">
                    <Link to={`/users/${e.nickname}`}><img className="avatar" onError={e => e.currentTarget.src = URL_PLACEHOLDER} src={`${URL_SERVER_AVATARS}${e.avatar}`} /></Link>
                    <div className="left-text">
                        <Link to={`/users/${e.nickname}`}>{e.nickname}</Link>
                        <span>На сайте с {e.created_at}</span>
                    </div>
                </span>
                <span className="right-section">
                    <p>Комментариев: {e.comments_count}</p>
                    <p>Оценок: {e.grade_count}</p>
                    <p>Пройдено игр: {e.games_passed}</p>
                </span>
            </div>
        ))
    }

    return (
        <main style={{paddingBottom: "2vh"}}>
            <div className="users-main">
                <h1>Все пользователи сайта</h1>
                {!isLoading && returnUsers()}
                {/* <img src= {`http://localhost:3000/avatars/1739897836878-SEVEN.png`} /> */}
            </div>
        </main>
    )
}

export default memo(Main)