import { useRouteError } from "react-router-dom"

function ForFor() {
    const error = useRouteError() as {status? : number, statusText?: string}

    return (
        <main>
            <h1>{error.status}</h1>
            <h2>{error.statusText || ''}</h2>
        </main>
    )
}

export default ForFor