import { useEffect, useState } from "react"
import { allGameType, gameInAllInterface } from "./GameInterface"
import "../../css/GameInformation.scss"
import { Link, useSearchParams  } from "react-router-dom"
import allGames from "../../store/allGames"
import { observer } from "mobx-react-lite"
import { toJS } from "mobx"
import Pagination from "../Pagination"
import { useUpdateParams } from "../../castomHooks"

type paramTypes = 'release_date' | 'steam_id' | 'total_reviews'

function Games(): React.ReactNode {
    const [load, setLoad] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(15)
    const genres = [1, 37, 4, 23, 28, 25, 3, 2, 29, 9, 18, 70, 53, 54, 59, 60, 52, 56, 57, 58, 74, 51, 55, 72, 73, 71, 50]
    const [searchParams, setSearchParams] = useSearchParams();
    const newParams = new URLSearchParams(searchParams)
    const updateParams = useUpdateParams()

    const order = searchParams.get('order') || ''
    const page = searchParams.get('page') || ''
    
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
            await allGames.getAllGames()
            //@ts-ignore
            allGames.orderBy(order)
            setLoad(true)
        }
        fetchData()
    }, [])
    
    if (load) {
        console.log(lastCardIndex, firstCardIndex, perPage)
        return (
            <>
                <main className="game-main">
                    <div className="game-section">
                        <h1>Игры</h1>
                        <p>На данной странице отображены Игры, отсортированные по {order}</p>
                        {returnGames()}
                        <Pagination perPage={perPage} totalCards={allGames.games.length} setCurrentPage={setCurrentPage} setSearchParams={setSearchParams}/>
                    </div>
                    <section>
                        <h3>Статус</h3>
                        <ul>
                            <li><input type="checkbox" />Скоро выйдет</li>
                            <li><input type="checkbox" />Вышло</li>
                        </ul>
                        <h3>Сортровка</h3>
                        <form>
                            <input type="radio" onClick={() => {updateParams('order', 'asd'); allGames.orderBy('total_reviews')}} />По рейтингу
                            <input type="radio" onClick={() => {updateParams('order', 'populairity'); allGames.orderBy('total_negative')}} />По популярности
                            <input type="radio" onClick={() => {updateParams('order', 'release_date'); allGames.orderBy('release_date')}} />По дате выхода
                        </form>
                        <h3>Список</h3>
                        <ul>
                            <li>Запланировано</li>
                            <li>Играю</li>
                            <li>Пройдено</li>
                            <li>Брошено</li>
                        </ul>
                        <h3>Жанры</h3>
                        <ul>
                            <li></li>
                        </ul>
                    </section>
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