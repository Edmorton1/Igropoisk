import { memo, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import steam from "../../../store/steam"
import { Context } from "../../../App"
import { toJS } from "mobx"
import comments from "../../../store/comments"
import { gameInterface, relationInterface, userInterface } from "../GameInterface"
import { observer } from "mobx-react-lite"
import Relatiions from "./Relations"
import { Link } from "react-router-dom"
import "../../../css/Game.scss"
import Comments from "./Comments"
import Slider from "./Slider"
import Grades from "./Grades"
import relations from "../../../store/relations"
import { URL_CLIENT_GAMES } from "../../../URLS"

function Game(): React.ReactNode {
    const store = useContext(Context)
    const user: userInterface | null = toJS(store.user)

    const [load, setLoad] = useState(false)
    const [game, setGame] = useState<gameInterface>(null)
    const [description, setDescription] = useState(false)
    const [relation, setRelation] = useState<relationInterface>(null)
    const {id} = useParams()
    const [fullDescription, setFullDescription] = useState(false)

    useEffect(() => {
        async function fetchData() {
            const gameData = await steam.game(id)
            const rel = user ? (await relations.relationGame(`${user.id}`, id))[0] : null
            await comments.getByGame(id)
            //@ts-ignore
            await setGame(gameData[id].data)
            setRelation(rel)
            setLoad(true)
        }
        
        fetchData()
    }, [id])

    if (load) {
        return (
            <main style={{paddingBottom: "2vh"}}>
                <h1><strong>{game.name}</strong></h1>
                <section className="game-information">
                    <div className="game-left">
                        <img src={game.header_image} />
                        <Relatiions user={user} relation={relation} />
                        {relation && <Grades user={user} relation={relation} />}
                    </div>
                    <div className="game-right">
                        <p>Дата релиза: <Link to={`${URL_CLIENT_GAMES}?release_date=${game.release_date.date.split(' ')[2]}`}>{game.release_date.date}</Link></p>
                        <p>Жанр: {game.genres.map((e, i) => <Link key={i} to={`/${e.description}`}>{e.description}, </Link>)}</p>
                        <p>Категории: {game.categories.map((e, i) => <span key={i}>{e.description}, </span>)}</p>
                        <p>Разработчик: {game.developers.map((e, i) => <Link key={i} to={`${URL_CLIENT_GAMES}?developer=${e}`}>{e}, </Link>)}</p>
                        <p>Издатель: {game.publishers.map((e, i) => <Link key={i} to={`${URL_CLIENT_GAMES}?publisher=${e}`}>{e}, </Link>)}</p>
                        {game.metacritic && <p>Оценка на Metacritic: {game.metacritic.score}</p>}
                        <p style={!description ? {cursor: "pointer"} : {}} onClick={() => setDescription(true)}>Короткое описание: {description ? game.short_description : game.short_description.split(' ').slice(0, 10).join(' ') + '...'}</p>
                        {/* <div dangerouslySetInnerHTML={{__html: game.detailed_description}} /> */}
                    </div>
                </section>
                <button onClick={() => setFullDescription(!fullDescription)} style={{marginTop: "10px"}} className="more">{!fullDescription ? `Открыть полное описание` : `Скрыть полное описание`}</button>
                {fullDescription && <div className="full-description" dangerouslySetInnerHTML={{__html: game.detailed_description}} />}
                <Slider game={game} />
                <Comments user={user} />
            </main>
        )
    } else {
        <div>Загрузка</div>
    }
}

export default memo(observer(Game))