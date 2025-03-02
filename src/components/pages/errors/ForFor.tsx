import "../../css/ErrorBoundary.scss"
import { Link } from "react-router-dom"

function ForFor({children} : any) {
    return (
        <main className="error-boundary">
            <div>
                {children}
                <br />
                <Link to={`/games`}>перейти на главную</Link>
            </div>
        </main>
    )
}

export default ForFor