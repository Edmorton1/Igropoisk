import { useState } from "react"
import Modal from "./pages/games/Modal"
import "./css/App.scss"

function Test() {
    const [modal, setModal] = useState(false)
    const url = "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/ss_7ab506679d42bfc0c0e40639887176494e0466d9.1920x1080.jpg?t=1731544174"

    return (
        <>
        {modal && <Modal setModal={setModal}><img src={url} className="screenshot modal-window" /></Modal>}
            <main>
                <button onClick={() => setModal(true)}>Модалка</button>
            </main>
        </>
    )
}

export default Test