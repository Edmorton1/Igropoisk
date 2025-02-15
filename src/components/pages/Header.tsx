import "../css/Header.scss"
import { observer } from "mobx-react-lite"
import logo from "../assets/logo.png"
import { Link, useNavigate } from "react-router-dom"
import Main from "./main/Main"
import Login from "./login/Login"
import Modal from "./Modal"
import { useContext, useEffect, useState } from "react"
import { Context } from "../App"
import allGames from "../store/allGames"
import { gameInAllInterface, genresInterface } from "./games/GameInterface"

function Header():React.ReactNode {
    const store = useContext(Context)
    const navigate = useNavigate()
    const genresJSON: genresInterface = require('./games/gamesList/genres.json');
    const URL = `http://localhost:5000/games`

    const [filgames, setFilgames] = useState<gameInAllInterface[]>(null)
    const [value, setValue] = useState('')
    const [modal, setModal] = useState(false)
    const [showGameList, setShowGameList] = useState(false)
    const user = store.user
    useEffect(() => {
        allGames.search('')
        // console.log('USEEFFECT')
        // console.log(genresJSON)
    }, [])

    function goTo(link: string) {
        navigate(link)
    }

    function HideModalSearch(bool: boolean) {
        setModal(bool);
        setShowGameList(bool)
    }

    function returnSearch(games: gameInAllInterface[]) {
        // console.log(games)
        return games.map((e, i) => (
            <div key={i}>
                <img src={e.capsule_image} />
                <span>
                    <p><Link onClick={() => HideModalSearch(false)} to={`http://localhost:5000/games/${e.steam_id}`}>{e.name}</Link></p>
                    <p>Год выхода: <Link onClick={() => HideModalSearch(false)} to={`${URL}?release_date=${e.release_date}`}>{e.release_date}</Link></p>
                    <p>Жанры: {e.genres.map(genre => {
                        //@ts-ignore
                        const foundGenre = genresJSON.find(g => g.id == genre)
                        return (
                        <Link onClick={() => HideModalSearch(false)} to={`${URL}?genre=${foundGenre.id}`}>{foundGenre.description}, </Link>
                        )
                    })}</p>
                    <p>Издатель: <Link onClick={() => HideModalSearch(false)} to={`${URL}?publisher=${e.publishers}`}>{e.publishers}</Link></p>
                    <p>Разработчик: <Link onClick={() => HideModalSearch(false)} to={`${URL}?developer=${e.developers}`}>{e.developers}</Link></p>
                </span>
            </div>
        ))
    }

    return (
        <>
        {modal && <Modal setModal={setModal} setShowGameList={setShowGameList}></Modal>}
        {showGameList &&
            <div className="search-game">
                {returnSearch(filgames)}
            </div>
        }
        <header>
            <Link to="/" className="img-wrapper">
                <img src= {logo} />
            </Link>
            <select onChange={(event) => goTo(event.target.value)}>
                <option value="/main">Главная</option>
                <option value="/games">Игры</option>
            </select>
            <input type="text" placeholder="Поиск..." onChange={
                async (event) => {setValue(event.target.value); setFilgames((await allGames.search(event.target.value)).slice(0, 5)); HideModalSearch(true)}
            } onClick={() => {filgames && HideModalSearch(true)}} />
            {user ? <Link to={user.nickname}>{user.nickname}</Link> : <Link to="/login">Вход</Link>}
        </header>
        </>
    )
}

export default observer(Header)