import { memo, useCallback, useMemo, useState } from "react"
import { useUpdateParams } from "../hooks/useUpdateParams"
import { useSearchParams } from "react-router-dom"
import "../css/Pagination.scss"
import useDebounce from "../hooks/useDebounce"

function Pagination({pagesCount} : any):React.ReactNode {
    const updateParams = useUpdateParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const [showInput, setShowInput] = useState(false)

    const order = searchParams.get('order') || ''
    const page = Number(searchParams.get('page')) || 1

    const pages = useMemo(() => {
        const total = []
        for (let i = 1; i <= pagesCount; i++) {
            total.push(i)
        }
        return total
    }, [pagesCount])
    
    const inputPage = useDebounce((val:number) => {
        updateParams('page', val)
        console.log(val)
    }, 300)

    const pagination = useMemo(() => {
        console.log(pages.length)
        if (page > pages.length) updateParams('page', pages.length)
        return pages.map((e, i) => {
        const but = i + 1
        if (but == 1 || but == pages.length || but == page || (4 > page - but && page - but > 0) || (4 > but- page && but - page > 0)) {
            return <button className="button-page" style={(i + 1) == page ? {backgroundColor: "#1A73E8", color: "white"} : {}} key={i} onClick={() => {updateParams("page", (i + 1).toString()); setShowInput(false)}}>{i + 1}</button>
        }
        // if (i == pages.length - 1) {
        //     return <button key={i} onClick={() => updateParams("page", (i + 1).toString())}>{i + 1}</button>
        // }
        if (i == pages.length - 2 && showInput) {
            return <input type="number" onChange={(event) => inputPage(event.target.value)} />
        }
        if (i == pages.length - 2) {
            return <button onClick={() => setShowInput(true)} key={i}>...</button>
        }
    })}, [pages, pagesCount, order, page, showInput]) 

    return (
        <div className="pagination">
            {pagination}
        </div>
    )
}

export default Pagination