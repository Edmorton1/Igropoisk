import { useMemo, useState } from "react"
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
    const status = searchParams.get('status') || ''

    const lastCardIndex = currentPage * perPage
    const firstCardIndex = lastCardIndex - perPage

    function radioButtonCheck(key: string, keyName: string, value: paramTypes) {
        console.log('РАДИО БАТТОН')
        return {
            checked: key == value,
            type: "radio",
            onClick: () => {updateParams(keyName, value); allGames.orderBy(value)}
        }
    }

    const radar = (key: string, keyName: string, value: paramTypes) => useMemo(() => radioButtonCheck(key, keyName, value), [order])

    return (
        <section>
            <h3>Статус</h3>
            <ul>
                <li><label><input onClick={() => {updateParams('status', 'soon')}} type="radio" checked={status == "soon"}/>Скоро выйдет</label></li>
                <li><label><input onClick={() => {updateParams('status', 'released')}} type="radio" checked={status != "soon"} />Вышло</label></li>
            </ul>
            <h3>Сортровка</h3>
            <form>
                <ul>
                    <li><label><input checked={order == "" || order == "rating"} onClick={() => {updateParams('order', 'rating'); allGames.orderBy('rating')}} name="sorting" type="radio"/>По рейтингу</label></li>
                    <li><label><input {...radioButtonCheck(order, 'order', 'popularity')} name="sorting" />По популярности</label></li>
                    <li><label><input {...radioButtonCheck(order, 'order', 'release_date')} name="sorting" />По дате выхода</label></li>
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
            {/* <Developers/> */}
        </section>
    )
}

export default Filter