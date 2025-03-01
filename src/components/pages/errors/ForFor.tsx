import "../../css/ErrorBoundary.scss"
import { Link } from "react-router-dom"

function ForFor() {
    return (
        <main className="error-boundary">
            <div>
                Похоже, что данной страницы не существует, <Link to={`/games`}>перейти на главную</Link>
            </div>
        </main>
    )
}

export default ForFor