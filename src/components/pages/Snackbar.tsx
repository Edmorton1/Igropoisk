import { Link } from "react-router-dom"
import "../css/Snackbar.scss"
import snackBarRegistrationStore from "../store/portals/snackBarStore"
import { observer } from "mobx-react-lite"
import ReactDOM from "react-dom";
import { useEffect } from "react"

interface propsInterface {
    children?: any,
    link?: string,
    time: number,
    color?: string
}

function SnackBar({children, link, time, color}: propsInterface):React.ReactNode {
    useEffect(() => {
        const timer = setTimeout(() => {
            snackBarRegistrationStore.close()
        }, time + 50)

        return () => clearTimeout(timer)
    }, [time, snackBarRegistrationStore.isOpen])
    

    return snackBarRegistrationStore.isOpen ? ReactDOM.createPortal(
        <Link to={link}
            className="snackbar" 
            style={{animation: `fadeInOut 0.2s ease-in-out, ending 0.2s linear ${time/1000 - 0.2}s forwards`, backgroundColor: color ? color : ''}}>{children}</Link>, document.body
    ) : null
}

export default observer(SnackBar)