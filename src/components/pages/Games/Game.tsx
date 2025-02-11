import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import steam from "../../store/steam"
import { Context } from "../../App"
import { toJS } from "mobx"
import { useForm } from "react-hook-form"
import SnackBar from "../Snackbar"
import comments from "../../store/comments"
import { gameInterface } from "./GameInterface"
import { observer } from "mobx-react-lite"
import relations from "../../store/relations"
import "../../css/comment.scss"
import ava from "../../assets/user-placeholder.jpg"
import { Link } from "react-router-dom"
import "../../css/Game.scss"
import left from "../../assets/left.png"
import right from "../../assets/right.png"
import Modal from "./Modal"

function Game(): React.ReactNode {
    const store = useContext(Context)
    const user = toJS(store.user)
    const coms = toJS(comments.comments)

    const [modal, setModal] = useState(false)
    const [showSnackBar, setShowSnackBar] = useState(false)
    const [load, setLoad] = useState(false)
    const [game, setGame] = useState<gameInterface>(null)
    const {id} = useParams()
    const [visibleComments, setVisibleComments] = useState(5)
    const [fullDescription, setFullDescription] = useState(false)
    const [transform, setTransform] = useState(0)
    const [screenshot, setScreenshot] = useState(null)

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

    function createRelation(relation: string) {
        const data = {
            game: id,
            status: relation,
            user_id: user.id
        }
        //@ts-ignore
        relations.post(data)
    }
    function createComment(text: string) {
        const data = {
            game: id,
            text: text,
            user_id: user.id,
        }
        //@ts-ignore
        comments.post(data)
    }
    const {register, handleSubmit} = useForm()

    function generateComments():React.ReactNode {
        return comments.comments.slice(0, visibleComments).map((e, i) => (
            <div key={i} className="comment">
                <div className="com-head">
                    <img src={ava} />
                    <div className="name-date">
                        <Link to={`/${e.nickname}`}>{e.nickname}</Link>
                        <span>{e.created_at}</span>
                    </div>
                </div>
                <p>{e.text}</p>
            </div>
        ))
    }

    function snackBar() {
        setShowSnackBar(true)

        setTimeout(() => {
            setShowSnackBar(false)
        }, 4000)
    }
    
    function checkAuth(func: () => any) {
        try {
            func()
        } catch {
            return snackBar()
        }
    }

    function transformHandler(value: number) {
        if (transform + value> 0) {
            return setTransform(0)
        }
        const maxWidth = document.getElementsByClassName('slider-img')[0].clientWidth * (game.screenshots.length - window.innerWidth / 541)
        if (transform + value < -maxWidth) {
            return setTransform(-maxWidth)
        }
        setTransform(transform + value)
    }
    if (load) {
        //@ts-ignore
        console.log(game.genres.map(e => (e.id)))
        return (
            <main>
                {showSnackBar && <SnackBar />}
                {modal && <Modal setModal={setModal}><img src={screenshot} className="screenshot" /></Modal>}
                <h1><strong>{game.name}</strong></h1>
                <section className="game-information">
                    <div>
                        <img src={game.header_image} />

                        <select onChange={(event) => {checkAuth(() => createRelation(event.target.value))}}>
                            <option value="passed">Пройдено</option>
                            <option value="dropped">Брошено</option>
                            <option value="planned">Запланированно</option>
                            <option value="play">Играю</option>
                        </select>
                    </div>
                    <div>
                        <p>Дата релиза: {game.release_date.date}</p>
                        <p>Жанр: {game.genres.map(e => <Link to={`/${e.description}`}>{e.description}, </Link>)}</p>
                        <p>Категории: {game.categories.map(e => <Link to={`/${e.description}`}>{e.description}, </Link>)}</p>
                        <p>Разработчик: {...game.developers}</p>
                        <p>Издатель: {...game.publishers}</p>
                        {game.metacritic && <p>Оценка на Metacritic: {game.metacritic.score}</p>}
                        <p>Короткое описание: {game.short_description}</p>
                        {/* <div dangerouslySetInnerHTML={{__html: game.detailed_description}} /> */}
                        <button onClick={() => setFullDescription(!fullDescription)} className="more">Открыть полное описание</button>
                        {fullDescription && <div dangerouslySetInnerHTML={{__html: game.detailed_description}} />}
                        <p>Скриншоты:</p>
                        <div className="slider">
                                <img src={right} className="slider-but right" onClick={() => transformHandler(-500)}/>
                                <img src={left} className="slider-but left" onClick={() => transformHandler(500)}/>
                            {game.screenshots.map((e, i) => (<img className="slider-img" style={{transform: `translateX(${transform}px)`}} src={e.path_thumbnail} onClick={() => {setScreenshot(e.path_full); setModal(true)}} />))}
                            {/* <img src={right} className="slider-next" /> */}
                        </div>
                    </div>
                </section>

                <section>
                    <h2>Комментарии</h2>
                    {generateComments()}
                    {comments.comments.length > visibleComments && <button className="more" onClick={() => setVisibleComments(visibleComments + 5)}>Загрузить ещё комментарии</button>}
                    <h3>Оставить комментарий</h3>
                    {user && <form onSubmit={handleSubmit((data) => checkAuth(() => createComment(data.text)))}>
                        <textarea {...register('text')}></textarea>
                        <button>Написать</button>
                    </form>}
                </section>

            </main>
        )
    } else {
        <div>Загрузка</div>
    }
}

export default observer(Game)