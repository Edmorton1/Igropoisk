import { useState } from "react"
import "../../../css/GameInformation.scss"
import { useSearchParams  } from "react-router-dom"
import allGames, { paramTypes } from "../../../store/allGames"
import { useUpdateParams } from "../../../hooks/useUpdateParams"
import Genres from "./Genres"

function Filter() {
    const [load, setLoad] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(15)
    const [searchParams, setSearchParams] = useSearchParams();
    const [modal, setModal] = useState(false)
    const newParams = new URLSearchParams(searchParams)
    const updateParams = useUpdateParams()
    
    const order = searchParams.get('order') || ''
    const page = searchParams.get('page') || ''

    const lastCardIndex = currentPage * perPage
    const firstCardIndex = lastCardIndex - perPage

    function radioButtonCheck(key: string, value: paramTypes) {
        return {
            checked: key == value,
            onClick: () => {updateParams(key, value); allGames.orderBy(value)}
        }
    }

    return (
        <section>
            <h3>Статус</h3>
            <ul>
                <li><label><input type="checkbox" />Скоро выйдет</label></li>
                <li><label><input type="checkbox" />Вышло</label></li>
            </ul>
            <h3>Сортровка</h3>
            <form>
                <ul>
                    <li><label><input checked={order == "" || order == "total_reviews"} name="sorting" type="radio" onClick={() => {updateParams('order', 'total_reviews'); allGames.orderBy('total_reviews')}} />По рейтингу</label></li>
                    <li><label><input checked={order == "popularity"} name="sorting" type="radio" onClick={() => {updateParams('order', 'popularity'); allGames.orderBy('total_negative')}} />По популярности</label></li>
                    <li><label><input checked={order == "release_date"} name="sorting" type="radio" onClick={() => {updateParams('order', 'release_date'); allGames.orderBy('release_date')}} />По дате выхода</label></li>
                </ul>
            </form>
            <h3>Список</h3>
            <ul>
                <li>Запланировано</li>
                <li>Играю</li>
                <li>Пройдено</li>
                <li>Брошено</li>
            </ul>
            <Genres />
        </section>
    )
}

export default Filter