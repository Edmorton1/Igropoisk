import { useState } from "react"
import ava from "../../assets/user-placeholder.jpg"
import { useUsers } from "../../hooks/useUsers"
import { userInterface } from "../games/GameInterface"
import "../../css/Users.scss"
import { Link } from "react-router-dom"

interface dataInterface {
    isLoading: boolean,
    data: userInterface[]
}

function Main():React.ReactNode {
    const {isLoading, data}: dataInterface =  useUsers()
    const URL = `http://localhost:3000/avatars/`

    function returnUsers() {
        return data.map((e, i) => (
            <div className="user-card border-dashed">
                <span className="left-section">
                    <img className="avatar" src={e.avatar ? `${URL}${e.avatar}` : `../../assets/user-placeholder.jpg`} />
                    <div className="left-text">
                        <Link to={`/${e.nickname}`}>{e.nickname}</Link>
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
        <main>
            <div className="users-main">
                <h1>Все пользователи сайта</h1>
                {!isLoading && returnUsers()}
                {/* <img src= {`http://localhost:3000/avatars/1739897836878-SEVEN.png`} /> */}
            </div>
        </main>
    )
}

export default Main