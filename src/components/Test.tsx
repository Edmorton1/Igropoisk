import { useState } from "react"
import Modal from "./pages/Modal"
import "./css/App.scss"
import SnackBar from "./pages/Snackbar"
import useCheckAuth from "./hooks/useCheckAuth"

function Test() {
    const {checkAuth, showSnackBar} = useCheckAuth()

    return (
        <>
            {showSnackBar && <SnackBar />}
            <main>
                <button onClick={() => checkAuth(() => console.log('asasdasd'))}>CHECK AUTH</button>
            </main>
        </>
    )
}

export default Test