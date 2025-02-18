import { memo, useCallback, useState } from "react"
import "../../../css/GameInformation.scss"
import { useSearchParams  } from "react-router-dom"
import { paramTypes } from "../../../store/allGames"
import { useUpdateParams } from "../../../hooks/useUpdateParams"
import Genres from "./Genres"

function Filter() {
    // console.log('FILTER')
    const [searchParams] = useSearchParams();
    const updateParams = useUpdateParams()
    
    const order = searchParams.get('order') || ''
    const status = searchParams.get('status') || ''

    const radioButtonCheck = (key: string, keyName: string, value: paramTypes) => {
        return {
            checked: key === value,
            type: "radio",
            onChange: () => updateParams(keyName, value),
        };
    };

    return (
        <section>
            <h3>Статус</h3>
            <ul>
                <li><label><input onChange={() => {updateParams('status', 'soon')}} type="radio" name="status" checked={status == "soon"}/>Скоро выйдет</label></li>
                <li><label><input onChange={() => {updateParams('status', 'released')}} type="radio" name="status" checked={status != "soon"} />Вышло</label></li>
            </ul>
            <h3>Сортровка</h3>
                <ul>
                    <li><label><input checked={order == "" || order == "rating"} onChange={() => {updateParams('order', 'rating')}} name="sorting" type="radio"/>По рейтингу</label></li>
                    <li><label><input {...radioButtonCheck(order, 'order', 'popularity')} name="sorting" />По популярности</label></li>
                    <li><label><input {...radioButtonCheck(order, 'order', 'release_date')} name="sorting" />По дате выхода</label></li>
                </ul>
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

export default memo(Filter)