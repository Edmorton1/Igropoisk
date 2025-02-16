import { memo, useCallback, useMemo } from "react"
import { useUpdateParams } from "../hooks/useUpdateParams"

interface paginationInterface {
    totalCards: number
    perPage: number
    setCurrentPage: Function
}

function Pagination({totalCards, perPage, setCurrentPage}:paginationInterface):React.ReactNode {
    const updateParams = useUpdateParams()

    const pages = useMemo(() => {
        const total = []
        for (let i = 1; i <= Math.ceil(totalCards/perPage); i++) {
            total.push(i)
        }
        return total
    }, [totalCards, perPage])

    const buttonFunc = useCallback((page: number) => {
        setCurrentPage(page)
        updateParams("page", (page).toString())
    }, [setCurrentPage])

    const pagination = useMemo(() => {
        console.log('pagination')
        return pages.map((e, i) => {
        if (i + 1 < 6) {
            return <button key={i} onClick={() => buttonFunc(i + 1)}>{i + 1}</button>
        }
        if (i == pages.length - 1) {
            return <button key={i} onClick={() => buttonFunc(i + 1)}>{i + 1}</button>
        }
        if (i == pages.length - 2) {
            return <button key={i}>...</button>
        }
    })}, [totalCards]) 

    return (
        <div>
            {pagination}
        </div>
    )
}

export default memo(Pagination)