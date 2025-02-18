import { memo, useCallback, useMemo, useState } from "react"
import { useUpdateParams } from "../hooks/useUpdateParams"

function Pagination({pagesCount} : any):React.ReactNode {
    const updateParams = useUpdateParams()

    const pages = useMemo(() => {
        const total = []
        for (let i = 1; i <= pagesCount; i++) {
            total.push(i)
        }
        return total
    }, [pagesCount])

    const buttonFunc = useCallback((page: number) => {
        updateParams("page", (page).toString())
    }, [pagesCount, pages])

    const pagination = useMemo(() => {
        return pages.map((e, i) => {
        if (i + 1 < 6) {
            return <button key={i} onClick={() => {buttonFunc(i + 1)}}>{i + 1}</button>
        }
        if (i == pages.length - 1) {
            return <button key={i} onClick={() => buttonFunc(i + 1)}>{i + 1}</button>
        }
        if (i == pages.length - 2) {
            return <button key={i}>...</button>
        }
    })}, [pages]) 

    return (
        <div>
            {pagination}
        </div>
    )
}

export default memo(Pagination)