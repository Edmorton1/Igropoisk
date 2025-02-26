import snackBarRegistrationStore from "../store/portals/snackBarStore"
import Snackbar from "../pages/Snackbar"
import { useContext } from "react"
import { Context } from "../App"

function CheckAuthFunc(): any {
    const store = useContext(Context)
    const snackbar = <Snackbar link='/registration' time={1000}>Время ожидания вышло, повторите действие, или повторно авторизируйтесь</ Snackbar>
    const func = (func: () => Function, isOpen = true) => {
        try {
            const accessToken = localStorage.getItem('accessToken')
            const payload = JSON.parse(atob(accessToken.split('.')[1]))
            console.log(payload.exp * 1000 - Date.now(), isOpen)
            if ((payload.exp * 1000 - Date.now()) > 0) {
                return func()
            } else {
                store.refreshAccessToken()
                throw new Error('ACCESS TOKEN ПРОСРОЧИЛСЯ 401')
            }
        } catch(e) {
            return isOpen ? snackBarRegistrationStore.open() : ""
        }
    }

    //Лучше называть [Snackbar, checkAuth]
    return [snackbar, func]
}

export default CheckAuthFunc