import { memo, useCallback, useState } from "react"
import "../../../css/GameInformation.scss"
import { useSearchParams  } from "react-router-dom"
import { useUpdateParams } from "../../../hooks/useUpdateParams"
import Genres from "./Genres"
import { years } from "./years"
// select DISTINCT release_date from games order by release_date

function Filter() {
    // console.log('FILTER')
    const [searchParams] = useSearchParams();
    const updateParams = useUpdateParams()
    
    const order = searchParams.get('order') || ''
    const status = searchParams.get('status') || ''
    const release_date = Number(searchParams.get('release_date')) || ''
    const [range, setRange] = useState(release_date ? years.findIndex(e => e == release_date) : years.length -1)

    return (
        <section className="filter">
            <h3>Статус</h3>
            <ul>
                <label><li><input onChange={() => {updateParams('status', 'soon')}} type="radio" name="status" checked={status == "soon"}/>Скоро выйдет</li></label>
                <label><li><input onChange={() => {updateParams('status', 'released')}} type="radio" name="status" checked={status != "soon"} />Вышло</li></label>
            </ul>
            <h3>Сортровка</h3>
                <ul>
                    <label><li><input checked={order == "" || order == "rating"} onChange={() => {updateParams('order', 'rating')}} name="sorting" type="radio"/>По рейтингу</li></label>
                    <label><li><input checked={order == "popularity"} type="radio" onChange={() => updateParams('order', 'popularity')} name="sorting" />По популярности</li></label>
                    <label><li><input checked={order == "release_date"} type="radio" onChange={() => updateParams('order', 'release_date')} name="sorting" />По дате выхода</li></label>
                </ul>
            <h3>Год выхода</h3>
            <input value={range} className="input-range" type="range" min={0} max={years.length -1} onChange={(event) => {updateParams('release_date', years[Number(event.target.value)]); setRange(Number(event.target.value))}} disabled={status == "soon"} />
            <p>{release_date != '' ? `Показывать только игры вышедшие в ${release_date} году` : `Показывать все игры`}</p>
            <button onClick={() => {updateParams('release_date', ''); setRange(years.length -1)}}>Сбросить</button>
            <Genres />
        </section>
    )
}

export default Filter