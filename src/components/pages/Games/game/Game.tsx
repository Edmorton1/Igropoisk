import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import steam from "../../../store/steam"
import { Context } from "../../../App"
import { toJS } from "mobx"
import comments from "../../../store/comments"
import { gameInterface } from "../GameInterface"
import { observer } from "mobx-react-lite"
import Relatiions from "./Relations"
import { Link } from "react-router-dom"
import "../../../css/Game.scss"
import Comments from "./Comments"
import Slider from "./Slider"

function Game(): React.ReactNode {
    const store = useContext(Context)
    const user = toJS(store.user)

    const [load, setLoad] = useState(false)
    const [game, setGame] = useState<gameInterface>(null)
    const {id} = useParams()
    const [fullDescription, setFullDescription] = useState(false)

    useEffect(() => {
        async function fetchData() {
            const gameData = await steam.game(id)
            await comments.getByGame(id)
            //@ts-ignore
            await setGame(gameData[id].data)
            setLoad(true)
        }
        
        fetchData()
    }, [])

    if (load) {
        return (
            <main>
                <h1><strong>{game.name}</strong></h1>
                <section className="game-information">
                    <div>
                        <img src={game.header_image} />
                        <Relatiions user={user} />
                    </div>
                    <div>
                        <p>Дата релиза: {game.release_date.date}</p>
                        <p>Жанр: {game.genres.map((e, i) => <Link key={i} to={`/${e.description}`}>{e.description}, </Link>)}</p>
                        <p>Категории: {game.categories.map((e, i) => <Link key={i} to={`/${e.description}`}>{e.description}, </Link>)}</p>
                        <p>Разработчик: {...game.developers}</p>
                        <p>Издатель: {...game.publishers}</p>
                        {game.metacritic && <p>Оценка на Metacritic: {game.metacritic.score}</p>}
                        <p>Короткое описание: {game.short_description}</p>
                        {/* <div dangerouslySetInnerHTML={{__html: game.detailed_description}} /> */}
                        <button onClick={() => setFullDescription(!fullDescription)} className="more">Открыть полное описание</button>
                        {fullDescription && <div dangerouslySetInnerHTML={{__html: game.detailed_description}} />}
                    </div>
                </section>
                <Slider game={game} />
                <Comments user={user} />
            </main>
        )
    } else {
        <div>Загрузка</div>
    }
}

export default observer(Game)