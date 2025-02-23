import { useQuery } from "react-query"

const fetchUsers = async () => {
    const request = await fetch('http://localhost:3000/api/users/')
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