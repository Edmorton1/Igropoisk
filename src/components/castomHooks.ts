import { useSearchParams } from "react-router-dom"

export const useUpdateParams = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    return (key: string, value: string) => {
        const newParamns = new URLSearchParams(searchParams)
        newParamns.set(key, value)
        setSearchParams(newParamns)
    }
}