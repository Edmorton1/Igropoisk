import { useSearchParams } from "react-router-dom";
import { useUpdateParams } from "../../../hooks/useUpdateParams";
import { observer } from "mobx-react-lite";
import { useMemo, useState } from "react";
import { genresInterface } from "../GameInterface";

function Genres() {
    const genresJSON: genresInterface[] = require('./genres.json');
    const updateParams = useUpdateParams()
    const [searchParams] = useSearchParams()
    const [value, setValue] = useState('')

    const genre = searchParams.get('genre') || ''
    
    function genresParse() {
        return genresJSON.map((e, i) => {
            if (e.description.toLowerCase().includes(value)) {
                return (
                    <li key={i}>
                        <label>
                            <input checked={genre.split(',').includes(e.id.toString())} onChange={() => {
                                const genreArray = genre ? genre.split(',') : []
                                const isSelected = genreArray.includes(e.id.toString())
                                const newGenres = isSelected 
                                    ? genreArray.filter(element_id => element_id != e.id.toString()) 
                                    : [...genreArray, e.id.toString()]
                                updateParams("genre", newGenres.length ? newGenres.join(',') : '') }} type="checkbox" />
                            {e.description}
                        </label>
                    </li>
                )
            }
        })
    }

    const genreParse = useMemo(() => genresParse(), [genre, value])

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

export default observer(Genres)