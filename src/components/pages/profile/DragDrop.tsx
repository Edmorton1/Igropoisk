import { observer } from "mobx-react-lite"
import Modal from "../Modal"
import { useState } from "react"
import dragDropStore from "../../store/portals/dragDropStore"
import ReactDOM from "react-dom";
import "../../css/DragDrop.scss"
import axios from "axios";
import $api from "../../store";

function DragDrop() {
    const [drag, setDrag] = useState(false)

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        setDrag(true)
    }
    function dragLeaveHangler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        setDrag(false)
    }
    function onDropHandler(e: any) {
        // console.log(e.dataTransfer.files)
        // СДЕЛАТЬ ПРОВЕРКУ ЧТО ОДИН ФАЙЛ
        e.preventDefault()
        let files = [...e.dataTransfer.files]

        const reader = new FileReader()
        reader.onload = (event) => {
            const img = new Image()
            img.src = event.target?.result as string

            img.onload = () => {
                console.log(img.width, img.height)
            }
        }
        const file = files[0]
        $api.post(`http://localhost:3000/api/uploadAvatar`, {
            avatar: file
        }, {headers: {
            'Content-Type': 'multipart/form-data'
        }})
        console.log(file)
        reader.readAsDataURL(files[0])
        
        setDrag(false)
        // console.log(files)
    }

    return dragDropStore.isOpen
        ? ReactDOM.createPortal(
            <Modal setModal={() => dragDropStore.close()}>
                {drag 
                    ? <div onDragStart={e => dragStartHandler(e)} onDragLeave={e => dragLeaveHangler(e)} onDragOver={e => dragStartHandler(e)} onDrop={e => onDropHandler(e)} className="drop-avatar">Отпустите файлы чтобы их загрузить</div>
                    : <div onDragStart={e => dragStartHandler(e)} onDragLeave={e => dragLeaveHangler(e)} onDragOver={e => dragStartHandler(e)} className="upload-avatar">Перетащите файл, чтобы его загрузить, аватарка должна быть в квадратной</div>}
            </Modal>,
            document.body
        ) : null
}

export default observer(DragDrop)