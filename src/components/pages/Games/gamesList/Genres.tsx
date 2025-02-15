import { useSearchParams } from "react-router-dom";
import { useUpdateParams } from "../../../hooks/useUpdateParams";
import allGames from "../../../store/allGames";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { genresInterface } from "../GameInterface";

function Genres() {
    const genresJSON: genresInterface[] = require('./genres.json');
    const updateParams = useUpdateParams()
    const [searchParams, setSearchParams] = useSearchParams()

    const order = searchParams.get('order') || 'rating'
    const genre = searchParams.get('genre') || ''
    const developer = searchParams.get('developer') || ''
    const publisher = searchParams.get('publisher') || ''
    const release_date = searchParams.get('release_date') || ''
    const status = searchParams.get('status') || ''
    const everything = {order, genre, developer, publisher, release_date, status}

    // const genres = (searchParams.get('genre')).split(',')
    // // console.log(genres)

    // allGames.filter(genres)

    useEffect(() => {
        // console.log(developer, publisher, release_date)
        allGames.filter(everything)
    }, [genre, order])
    
    function genresParse() {
        return genresJSON.map((e, i) => (
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
        ))
    }

    return (
    <>
    <h3>Жанры</h3>
    <ul>
        {genresParse()}
    </ul>
    </>
    )
}

export default observer(Genres)