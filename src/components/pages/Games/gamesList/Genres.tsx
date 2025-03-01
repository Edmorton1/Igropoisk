import { useSearchParams } from "react-router-dom";
import { useUpdateParams } from "../../../hooks/useUpdateParams";
import { observer } from "mobx-react-lite";
import { memo, useMemo, useState } from "react";
import { genresInterface } from "../GameInterface";
// select DISTINCT UNNEST(genres) from games
// SELECT genres, steam_id FROM games WHERE 80 = any(genres)

function Genres() {
    const genresJSON: genresInterface[] = require('./genres.json');
    const updateParams = useUpdateParams()
    const [searchParams] = useSearchParams()
    const [value, setValue] = useState('')

    const genre = searchParams.get('genre') || ''
    const page = searchParams.get('page') || ''
    const order = searchParams.get('order') || ''
    const release_date = searchParams.get('release_date') || ''
    
    function genresParse() {
        return genresJSON.map((e, i) => {
            if (e.description.toLowerCase().includes(value)) {
                return (
                    <label key={i}>
                        <li>
                            <input checked={genre.split(',').includes(e.id.toString())} onChange={() => {
                                const genreArray = genre ? genre.split(',') : []
                                const isSelected = genreArray.includes(e.id.toString())
                                const newGenres = isSelected 
                                    ? genreArray.filter(element_id => element_id != e.id.toString()) 
                                    : [...genreArray, e.id.toString()]
                                updateParams("genre", newGenres.length ? newGenres.join(',') : '') }} type="checkbox" />
                            {e.description}
                        </li>
                    </label>
                )
            }
        })
    }

    const genreParse = useMemo(() => genresParse(), [genre, value, page, order, release_date])

    return (
    <>
    <h3>Жанры</h3>
        <input type="text" placeholder="Поиск по жанру..." onChange={(event) => setValue(event.target.value)}/>
        <ul className="genreParse">
            {genreParse}
        </ul>
    </>
    )
}

export default memo(observer(Genres))