import { useState } from "react"
import { gameInterface } from "../GameInterface"
import "../../../css/Game.scss"
import left from "../../../assets/left.png"
import right from "../../../assets/right.png"
import Modal from "../../Modal"

function Slider({game}: any) {
    const [transform, setTransform] = useState(0)
    const [screenshot, setScreenshot] = useState(null)
    const [modal, setModal] = useState(false)

    function transformHandler(value: number) {
        if (transform + value> 0) {
            return setTransform(0)
        }
        const maxWidth = document.getElementsByClassName('slider-img')[0].clientWidth * (game.screenshots.length - window.innerWidth / 541)
        if (transform + value < -maxWidth) {
            return setTransform(-maxWidth)
        }
        setTransform(transform + value)
    }

    return (
        <>
        {modal && <Modal setModal={setModal}><img src={screenshot} className="screenshot" /></Modal>}
        <p>Скриншоты:</p>
        <div className="slider">
            <img src={right} className="slider-but right" onClick={() => transformHandler(-500)}/>
            <img src={left} className="slider-but left" onClick={() => transformHandler(500)}/>
            {game.screenshots.map((e: any, i: number) => (<img key={i} className="slider-img" style={{transform: `translateX(${transform}px)`}} src={e.path_thumbnail} onClick={() => {setScreenshot(e.path_full); setModal(true)}} />))}
            {/* <img src={right} className="slider-next" /> */}
        </div>
        </>
    )
}

export default Slider