import { useEffect, useState } from "react"
import { allGameType, gameInAllInterface } from "../GameInterface"
import "../../../css/GameInformation.scss"
import { Link, useSearchParams  } from "react-router-dom"
import allGames from "../../../store/allGames"
import { observer } from "mobx-react-lite"
import { toJS } from "mobx"
import Pagination from "../../Pagination"
import { useUpdateParams } from "../../../hooks/useUpdateParams"
import Filter from "./Filter"

function Games(): React.ReactNode {
    const [load, setLoad] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(15)
    const [searchParams, setSearchParams] = useSearchParams();
    const newParams = new URLSearchParams(searchParams)
    const updateParams = useUpdateParams()

    const order = searchParams.get('order') || 'rating'
    const page = searchParams.get('page') || 1
    const genre = searchParams.get('genre') || ''
    
    const lastCardIndex = currentPage * perPage
    const firstCardIndex = lastCardIndex - perPage

    function returnGames():React.ReactNode {
        return allGames.games.
            slice(firstCardIndex, lastCardIndex).
            map((e: gameInAllInterface, i) => (
            <Link to={`/games/${e.steam_id}`} key={i} className="gameCard">
                <img src={e.header_image} />
                <div className="gameInfo">
                    <span>{e.name}</span>
                    <span>{e.release_date}</span>
                </div>
            </Link>
        ))
    }

    useEffect(() => {
        async function fetchData() {
            await allGames.getAllGames(order, genre)
            //@ts-ignore
            allGames.orderBy(order)
            //@ts-ignore
            setCurrentPage(page)
            setLoad(true)
        }
        fetchData()
    }, [])
    
    if (load) {
        return (
            <>
                <main className="game-main">
                    <div className="game-section">
                        <h1>Игры</h1>
                        <p>На данной странице отображены Игры, отсортированные по {order}</p>
                        {returnGames()}
                        <Pagination perPage={perPage} totalCards={allGames.games.length} setCurrentPage={setCurrentPage} setSearchParams={setSearchParams}/>
                    </div>
                    <Filter />
                </main>
            </>
        )
    } else {
        return (
            <div>Загрузка</div>
        )
    }

}

export default observer(Games)