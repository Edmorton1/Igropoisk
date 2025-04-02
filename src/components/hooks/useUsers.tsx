import { useQuery } from "react-query"
import { URL_SERVER_API } from "../URLS"

const fetchUsers = async () => {
    const request = await fetch(`${URL_SERVER_API}users/`)
    return request.json()
}

export const useUsers = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: fetchUsers,
        onSuccess(data) {
            return data
        },
    })
}