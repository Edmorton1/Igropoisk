import { useUpdateParams } from "../hooks/useUpdateParams"

interface paginationInterface {
    totalCards: number
    perPage: number
    setCurrentPage: Function
    setSearchParams: Function
}

function Pagination({totalCards, perPage, setCurrentPage, setSearchParams}:paginationInterface):React.ReactNode {
    const pages = []
    const updateParams = useUpdateParams()

    for (let i = 1; i <= Math.ceil(totalCards/perPage); i++) {
        pages.push(i)
    }
    return (
        <div>
            {pages.map((e, i) => {
                if (i + 1 < 6) {
                    return <button key={i} onClick={() => {setCurrentPage(i + 1); updateParams("page", (i+1).toString())}}>{i + 1}</button>
                }
                if (i == pages.length - 1) {
                    return <button key={i} onClick={() => {setCurrentPage(i + 1); updateParams("page", (i+1).toString())}}>{i + 1}</button>
                }
                if (i == pages.length - 2) {
                    return <button key={i}>...</button>
                }
            })}
        </div>
    )
}

export default Pagination