import { memo } from "react"
import "../css/Snackbar.scss"

function SnackBar():React.ReactNode {
    return(
        <div className="snackbar">Для этого действия необходима авторизация</div>
    )
}

export default memo(SnackBar)