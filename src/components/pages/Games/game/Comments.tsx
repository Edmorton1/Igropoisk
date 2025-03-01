import ava from "../../../assets/user-placeholder.jpg"
import { useForm } from "react-hook-form"
import "../../../css/comment.scss"
import comments from "../../../store/comments"
import { Link } from "react-router-dom"
import "../../../css/Game.scss"
import { memo, useState } from "react"
import { useParams } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { userInterface } from "../GameInterface"
import { URL_PLACEHOLDER, URL_SERVER_AVATARS } from "../../../URLS"
import CheckAuthFunc from "../../../hooks/checkAuthFunc"

interface userProps {
    user: userInterface | null
}

interface commentInterface {
    id: number,
    game: number,
    text: string,
    nickname: string,
    avatar: string,
    created_at: string,
}

function Comments({user}: userProps) {
    const [visibleComments, setVisibleComments] = useState(5)
    const {id} = useParams()
    const [snackbar, checkAuth] = CheckAuthFunc()
    const [comChange, setComChange] = useState(0)
    const [text, setText] = useState<string>('')

    function createComment(text: string) {
        console.log(text)
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
        return comments.comments.slice(0, visibleComments).map((e: commentInterface, i) => (
            <div key={i} className="comment">
                <div className="com-head">
                    <Link to={`/users/${e.nickname}`}><img onError={e => e.currentTarget.src = ava} src={`${URL_SERVER_AVATARS}${e.avatar}`} /></Link>
                    <div className="name-date">
                        <Link to={`/users/${e.nickname}`}>{e.nickname}</Link>
                        <span>{e.created_at}</span>
                    </div>
                </div>
                {comChange == e.id ? <textarea style={{marginTop: "10px"}} value={text} onChange={(e) => setText(e.target.value)}></textarea> : <p>{e.text}</p>}
                {comChange != e.id && <button onClick={() => {setComChange(e.id); setText(e.text)}}>Изменить</button>}
                {comChange != e.id && <button onClick={() => comments.delete(e.id, e.game)}>Удалить</button>}
                {comChange == e.id && <button className="button-stand" onClick={() => {comments.change(e.id, text, e.game); setComChange(0)}}>Изменить</button>}
            </div>
        ))
    }

    return (
        <section className="comments">
            {snackbar}
            <h2>Комментарии</h2>
                {generateComments()}
                {comments.comments.length > visibleComments && <button className="more" onClick={() => setVisibleComments(visibleComments + 5)}>Загрузить ещё комментарии</button>}
                    {user && <form onSubmit={handleSubmit((data) => checkAuth(() => createComment(data.text)))}>
                        <h3>Оставить комментарий</h3>
                        <textarea {...register('text')}></textarea>
                        <button className="button-stand">Написать</button>
                    </form>}
        </section>
    )
}

export default memo(observer(Comments))