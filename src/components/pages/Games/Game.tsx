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

function Game(): React.ReactNode {
    const store = useContext(Context)
    const user = toJS(store.user)
    const coms = toJS(comments.comments)

    const [showSnackBar, setShowSnackBar] = useState(false)
    const [load, setLoad] = useState(false)
    const [game, setGame] = useState<gameInterface>(null)
    const {id} = useParams()
    const [visibleComments, setVisibleComments] = useState(1)
    const itemsPerPage = 5

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
    
    function loadMore() {
        
    }

    function generateComments():React.ReactNode {
        return comments.comments.map((e, i) => (
            <div key={i} className="comment">
                <div className="com-head">
                    <img src={ava} />
                    <Link to={`/${e.nickname}`}>{e.nickname}</Link>
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

    if (load) {
        console.log(game)
        return (
            <main>
                {showSnackBar && <SnackBar />}
                <h1><strong>{game.name}</strong></h1>
                <img src={game.header_image} />
                <span>{game.short_description}</span>
                <select onChange={(event) => {checkAuth(() => createRelation(event.target.value))}}>
                    <option value="passed">Пройдено</option>
                    <option value="dropped">Брошено</option>
                    <option value="planned">Запланированно</option>
                    <option value="play">Играю</option>
                </select>
                <section>
                    <h1>Комментарии</h1>
                    {user && <form onSubmit={handleSubmit((data) => checkAuth(() => createComment(data.text)))}>
                        <input {...register('text')} type="text" />
                        <button>Отправить</button>
                    </form>}
                    {generateComments()}
                </section>
            </main>
        )
    } else {
        <div>Загрузка</div>
    }
}

export default observer(Game)