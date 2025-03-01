import { memo, useState } from "react"
import "../../../css/Slider.scss"
import left from "../../../assets/left.png"
import right from "../../../assets/right.png"
import Modal from "../../Modal"
import { gameInterface } from "../GameInterface"

interface propsInterface {
    game: gameInterface
}

function Slider({game}: propsInterface) {
    const [transform, setTransform] = useState(0)
    const [screenshot, setScreenshot] = useState(null)
    const [modal, setModal] = useState(false)
    const [currentScreen, setCurrentScreen] = useState(0)
    console.log(currentScreen, game.screenshots.length)

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

    function screenHandler(key: string) {
        if (key == "ArrowRight") {
            if (currentScreen < game.screenshots.length - 1) {
                setScreenshot(game.screenshots[currentScreen + 1].path_full), setCurrentScreen(currentScreen + 1)
            } else {
                setScreenshot(game.screenshots[0].path_full), setCurrentScreen(0)
            }
        } else if (key == "ArrowLeft") {
            if (currentScreen > 0) {
                setScreenshot(game.screenshots[currentScreen - 1].path_full), setCurrentScreen(currentScreen - 1)
            } else {
                setScreenshot(game.screenshots[game.screenshots.length - 1].path_full), setCurrentScreen(game.screenshots.length - 1)
            }
        } else {

        }
    }

    return (
        <>
        {modal && <Modal setModal={setModal}><img src={screenshot} className="screenshot" /></Modal>}
        <h3>Скриншоты:</h3>
        <div className="slider">
            <img src={right} className="slider-but right" onClick={() => transformHandler(-500)}/>
            <img src={left} className="slider-but left" onClick={() => transformHandler(500)}/>
            {game.screenshots.map((e: any, i: number) => 
                (<img key={i} className="slider-img" style={{transform: `translateX(${transform}px)`}} 
                src={e.path_thumbnail} onClick={() => {setScreenshot(e.path_full); setModal(true); setCurrentScreen(i)}} onKeyDown={(event) => 
                {screenHandler(event.key) ;console.log(event.key)}} tabIndex={0} />))}
            {/* <img src={right} className="slider-next" /> */}
        </div>
        </>
    )
}

export default memo(Slider)