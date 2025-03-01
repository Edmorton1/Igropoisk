import { memo, useState } from "react"
import { gameInAllInterface } from "../GameInterface"
import "../../../css/GameInformation.scss"
import { Link, useSearchParams  } from "react-router-dom"
import allGames from "../../../store/allGames"
import { observer } from "mobx-react-lite"
import Pagination from "../../Pagination"
import Filter from "./Filter"
import { useGames } from "../../../hooks/useGames"

function Games(): React.ReactNode {
    // ДОБАВИТЬ СКРОЛЛ ВВЕРХ
    const [searchParams] = useSearchParams();
    const order = searchParams.get('order') || 'rating'
    const {isLoading} = useGames()

    function returnGames():React.ReactNode {
        return allGames.games.
            map((e: gameInAllInterface, i) => (
            <Link to={`/games/${e.steam_id}`} key={i} className="gameCard" style={isLoading ? {opacity: "0.5"} : {}}>
                <img src={e.header_image} />
                <div className="gameInfo">
                    <span>{e.name}</span>
                    <span>{e.release_date}</span>
                </div>
            </Link>
        ))
    }

    return (
        <>
            <main className="game-main">
                <div className="game-section">
                    <h1>Игры</h1>
                    <p>На этой странице отображены Игры, отсортированные по {order == 'rating' ? 'рейтингу' : order == 'popularity' ? 'популярности' : order == 'release_date' ? 'дате выхода' : 'рейтингу'}</p>
                    <section className="games">
                        {returnGames()}
                    </section>
                    <Pagination pagesCount={allGames.pages}/>
                </div>
                <Filter/>
            </main>
        </>
    )
}

export default memo(observer(Games))