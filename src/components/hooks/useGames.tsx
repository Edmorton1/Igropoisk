import { useQuery } from "react-query"
import allGames from "../store/allGames"
import { useLocation } from "react-router-dom"

interface dataInterface {
    games: [],
    pages: number
}

const fetchGames = async (order?: string, genre?: any, developer?: string, publisher?: string, release_date?: string, status?: string, page?: string) => {
    const response = await fetch(`http://localhost:3000/api/getEverything?genre=${genre}&order=${order}&developer=${developer}&publisher=${publisher}&release_date=${release_date}&status=${status}&page=${page}`)
    return response.json()
}

export const useGames = () => {
    const { search } = useLocation()
    const params = new URLSearchParams(search)

    const order = params.get('order') || 'rating'
    const genre = params.get('genre') || ''
    const developer = params.get('developer') || ''
    const publisher = params.get('publisher') || ''
    const release_date = params.get('release_date') || ''
    const status = params.get('status') || ''
    const page = params.get('page') || '1'

    return useQuery({
        queryKey: ["games", order, genre, developer, publisher, release_date, status, page],
        queryFn: () => fetchGames(order, genre, developer, publisher, release_date, status, page),
        onSuccess: (data: dataInterface) => {
            allGames.getGet(data)
        }
    })
}