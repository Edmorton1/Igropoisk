import { useParams } from "react-router-dom"
import relations from "../../../store/relations"
import "../../../css/Game.scss"
//@ts-ignore
import checkAuthFunc from "../../../hooks/checkAuthFunc"
import { relationInterface, userInterface } from "../GameInterface"
import { useState } from "react"
// import SnackBar from "../../Snackbar"

interface propsInterface {
    user: userInterface,
    relation?: relationInterface
}

function Relatiions({user, relation}: propsInterface) {
    const {id} = useParams()
    const [SnackBar ,checkAuth] = checkAuthFunc()
    const [select, setSelect] = useState(relation ? relation.status : 'passed')
    // console.log(SnackBar, checkAuth)

    function createRelation(relation: string) {
        const data = {
            game: id,
            status: relation,
            user_id: user.id
        }
        //@ts-ignore
        relations.post(data)
    }

    return (
        <>
        {SnackBar}
        <select value={select} onChange={(event) => checkAuth(() => {createRelation(event.target.value); setSelect(event.target.value)})}>
            <option value="passed">Пройдено</option>
            <option value="dropped">Брошено</option>
            <option value="planned">Запланированно</option>
            <option value="play">Играю</option>
        </select>
        </>
    )
}

export default Relatiions