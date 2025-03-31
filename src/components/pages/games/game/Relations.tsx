import { useParams } from "react-router-dom"
import relations from "../../../store/relations"
import "../../../css/Game.scss"
import checkAuthFunc from "../../../hooks/checkAuthFunc"
import { relationInterface, userInterface } from "../GameInterface"
import { memo, useState } from "react"

interface propsInterface {
    user: userInterface,
    relation?: relationInterface
}

function Relatiions({user, relation}: propsInterface) {
    const {id} = useParams()
    const [SnackBar ,checkAuth] = checkAuthFunc()
    const [select, setSelect] = useState(relation ? relation.status : '')

    function createRelation(relation: string) {
        const data = {
            game: Number(id),
            status: relation,
            user_id: user.id
        }
        relations.post(data)
    }
    return (
        <>
        {SnackBar}
        <select className={`select ${select}`} value={select} onChange={(event) => checkAuth(() => {createRelation(event.target.value); setSelect(event.target.value)})}>
            <option value="" hidden>Добавить в список</option>
            <option value="passed">Пройдено</option>
            <option value="dropped">Брошено</option>
            <option value="planned">Запланированно</option>
            <option value="play">Играю</option>
        </select>
        </>
    )
}

export default memo(Relatiions)