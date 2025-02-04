import { useEffect, useState } from "react"
import relations from "../../store/relations"
import { useParams } from "react-router-dom"
import axios from "axios"
import { userInterface } from "../games/GameInterface"
import { toJS } from "mobx"

function Profile():React.ReactNode {
    const [load, setLoad] = useState(false)
    const [user, setUser] = useState<userInterface>(null)
    const {nickname} = useParams()

    useEffect(() => {
        async function fetchData() {
            //@ts-ignore
            const data = (await axios.get(`http://localhost:3000/api/users/${nickname}`)).data[0]
            await relations.getByUser(data.id)
            setUser(data)
            console.log(data)
            console.log(toJS(relations.relation))
            setLoad(true)
        }

        fetchData()
    }, [])

    if (load) {
        return (
            <main>
                {user.nickname}
            </main>
        )
    } else {
        <div>Загрузка</div>
    }
}

export default Profile