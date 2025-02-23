import { useParams } from "react-router-dom"
import relations from "../../../store/relations"
import "../../../css/Game.scss"
import CheckAuthFunc from "../../../hooks/CheckAuthFunc"
import SnackBar from "../../Snackbar"

function Relatiions({user}: any) {
    const {id} = useParams()
    // const {checkAuth} = useCheckAuth()

    function createRelation(relation: string) {
        try {
            const accessToken = localStorage.getItem('accessToken')
            const payload = JSON.parse(atob(accessToken.split('.')[1]))
            console.log(payload.exp * 1000 - Date.now())
            if ((payload.exp * 1000 - Date.now()) > 0) {
                const data = {
                    game: id,
                    status: relation,
                    user_id: user.id
                }
                //@ts-ignore
                relations.post(data)
            } else {
                throw new Error('ACCESS TOKEN ПРОСРОЧИЛСЯ 401')
            }
        } catch(e) {
            throw new Error('ACCESS TOKEN ПРОСРОЧИЛСЯ 401')
        }
    }

    return (
        <>
        <SnackBar link='/registration' time={4000}>Для этого действия необходима авторизация</ SnackBar>
        <select onChange={(event) => CheckAuthFunc(() => createRelation(event.target.value))}>
            <option value="passed">Пройдено</option>
            <option value="dropped">Брошено</option>
            <option value="planned">Запланированно</option>
            <option value="play">Играю</option>
        </select>
        </>
    )
}

export default Relatiions