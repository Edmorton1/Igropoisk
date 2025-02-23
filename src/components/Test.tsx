import { useState } from "react"
import Modal from "./pages/Modal"
import "./css/App.scss"
import SnackBar from "./pages/Snackbar"
import CheckAuthFunc from "./hooks/CheckAuthFunc"
import snackBarRegistrationStore from "./store/portals/snackBarStore"

function Test() {
    // const {checkAuth} = useCheckAuth()
    // snackBarRegistrationStore.open()

    return (
        <>
            {/* {showSnackBar && <SnackBar />} */}
            <SnackBar color="red" time={2200} />
            <main>
                {/* <button onClick={() => checkAuth(() => console.log('asdas'))}>CHECK AUTH</button> */}
            </main>
        </>
    )
}

export default Test