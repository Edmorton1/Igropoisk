import { useUpdateParams } from "../castomHooks"

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
    console.log(pages)
    return (
        <div>
            {pages.map((e, i) => {
                return <button key={i} onClick={() => {setCurrentPage(i); updateParams("page", i.toString())}}>{e}</button>
            })}
        </div>
    )
}

export default Pagination