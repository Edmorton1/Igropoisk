import { useCallback } from "react"
import { useSearchParams } from "react-router-dom"

export const useUpdateParams = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    return useCallback((key: string, value: string | number) => {
        const newParamns = new URLSearchParams(searchParams)
        newParamns.set(key, String(value))
        setSearchParams(newParamns)
    }, [searchParams, setSearchParams])
}