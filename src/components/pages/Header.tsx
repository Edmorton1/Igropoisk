import "../css/Header.scss"
import { observer } from "mobx-react-lite"
import logo from "../assets/logo.png"
import { Link, useNavigate } from "react-router-dom"
import Modal from "./Modal"
import { memo, useContext, useEffect, useMemo, useState } from "react"
import { Context } from "../App"
import allGames from "../store/allGames"
import { gameInAllInterface, genresInterface } from "./games/GameInterface"
import useDebounce from "../hooks/useDebounce"
import { Navigate } from "react-router-dom"
import { URL_CLIENT_GAMES, URL_PLACEHOLDER, URL_SERVER_AVATARS } from "../URLS"
import logoshort from "../assets/logoshort.png"

function Header():React.ReactNode {
    const store = useContext(Context)
    const genresJSON: genresInterface = require('./games/gamesList/genres.json');

    const [filgames, setFilgames] = useState<gameInAllInterface[]>([])
    const [value, setValue] = useState('')
    const [modal, setModal] = useState(false)
    const [showGameList, setShowGameList] = useState(false)
    const user = useMemo(() => store.user, [store.user])
    const navigate = useNavigate()
    useEffect(() => {
        allGames.search('')
    }, [])

    function goTo(link: string) {
        navigate(link)
    }

    const HideModalSearch = useDebounce((bool: boolean) => {
        setModal(bool);
        setShowGameList(bool)
    }, 300)

    function returnSearch(games: gameInAllInterface[]) {
        return games.map((e, i) => (
            <div key={i}>
                <img src={e.capsule_image} />
                <span>
                    <p><Link onClick={() => HideModalSearch(false)} to={`http://localhost:5000/games/${e.steam_id}`}>{e.name}</Link></p>
                    <p>Год выхода: <Link onClick={() => HideModalSearch(false)} to={`${URL_CLIENT_GAMES}?release_date=${e.release_date}`}>{e.release_date}</Link></p>
                    <p>Жанры: {e.genres.map(genre => {
                        //@ts-ignore
                        const foundGenre = genresJSON.find(g => g.id == genre)
                        return (
                        <Link onClick={() => HideModalSearch(false)} to={`${URL_CLIENT_GAMES}?genre=${foundGenre.id}`}>{foundGenre.description}, </Link>
                        )
                    })}</p>
                    <p>Издатель: <Link onClick={() => HideModalSearch(false)} to={`${URL_CLIENT_GAMES}?publisher=${e.publishers}`}>{e.publishers}</Link></p>
                    <p>Разработчик: <Link onClick={() => HideModalSearch(false)} to={`${URL_CLIENT_GAMES}?developer=${e.developers}`}>{e.developers}</Link></p>
                </span>
            </div>
        ))
    }

    const searchGames = useDebounce(async (value: any) => {
        setValue(value); setFilgames((await allGames.search(value)).slice(0, 100))
    }, 500)

    return (
        <>
        {modal && <Modal setModal={setModal} setShowGameList={setShowGameList}></Modal>}
        {showGameList &&
            <div className="search-game">
                {returnSearch(filgames)}
            </div>
        }
        <header>
            <Link to="/games" className="img-wrapper">
            <picture>
                <source media="(max-width: 650px)" srcSet={logoshort} />
                <img src={logo} />
            </picture>
            </Link>
            <select onChange={(event) => goTo(event.target.value)}>
                <option value="/games">GAMES</option>
                <option value="/users">USERS</option>
            </select>
            <input type="text" placeholder="Поиск..." onChange={
                async (event) => {searchGames(event.target.value)}
            } onClick={() => {filgames && setModal(true); setShowGameList(true)}} />
            <span className="avatar-nickname">
                {user && <Link to={user.nickname}><img className="avatar br-50" onError={e => e.currentTarget.src = URL_PLACEHOLDER} src={`${URL_SERVER_AVATARS}${user.avatar}`} /></Link>}
                {user ? <Link to={user.nickname} className="avatar-nick">{user.nickname}</Link> : <Link to="/login">Вход</Link>}
            </span>
        </header>
        </>
    )
}

export default memo(observer(Header))