import "../css/Header.scss"
import { observer } from "mobx-react-lite"
import logo from "../assets/logo.png"
import { Link, useNavigate } from "react-router-dom"
import Main from "./main/Main"
import Login from "./login/Login"
import { useContext } from "react"
import { Context } from "../App"

function Header():React.ReactNode {
    const store = useContext(Context)
    const navigate = useNavigate()
    const user = store.user

    function goTo(link: string) {
        navigate(link)
    }

    return (
        <header>
            <Link to="/" className="img-wrapper">
                <img src= {logo} />
            </Link>
            <select onChange={(event) => goTo(event.target.value)}>
                <option value="/main">Главная</option>
                <option value="/games">Игры</option>
            </select>
            <input type="text" placeholder="Поиск..." />
            {user ? <Link to={user.nickname}>{user.nickname}</Link> : <Link to="/login">Вход</Link>}
        </header>
    )
}

export default observer(Header)