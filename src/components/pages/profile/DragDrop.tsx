import { observer } from "mobx-react-lite"
import Modal from "../Modal"
import { useState } from "react"
import dragDropStore from "../../store/portals/dragDropStore"
import ReactDOM from "react-dom";
import "../../css/DragDrop.scss"
import $api from "../../store";

function DragDrop() {
    const [drag, setDrag] = useState(false)
    const formates = ['jpg', 'jpeg', 'png', 'webp']

    function postAvatar(file: any) {
        $api.post(`http://localhost:3000/api/uploadAvatar`, {
            avatar: file
        }, {headers: {
            'Content-Type': 'multipart/form-data'
        }})
        setDrag(false)
        dragDropStore.close()
    }

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        setDrag(true)
    }
    function dragLeaveHangler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        setDrag(false);
    }
    async function onDropHandler(e: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>) {
        const validateAvatar = (file: File): Promise<void> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = (event) => {
                    const img = new Image()
                    img.src = event.target?.result as string
        
                    img.onload = () => {
                        if (img.width % img.height != 0) {return reject(new Error('Файл должен быть квадратным, желательно разрешения 256x256'))}
                        resolve()
                    }
                }
                reader.readAsDataURL(file)
            })
        }
        e.preventDefault()
        try {
            let files: any;
            if ('dataTransfer' in e) {
                files = Array.from(e.dataTransfer.files)
            } else {
                files = e.target.files
            }
            if (files.length > 1) {throw new Error('Можно загрузить только один файл')}
            const file = files[0]
            const filesExtension = file.name.split('.').pop().toLowerCase()
            console.log(filesExtension)
            if (!formates.includes(filesExtension)) {throw new Error(`Файл должен быть одним из форматов ${formates}`)}

            await validateAvatar(file)
            await postAvatar(file)
        } catch(e) {
            let p = document.getElementsByClassName('base-avatar')[0].querySelector('p')
            p.textContent = `Ошибка: ${e.message}`
        }
    }

    return dragDropStore.isOpen
        ? ReactDOM.createPortal(
            <>
            <Modal setModal={() => dragDropStore.close()}></Modal>
            {!drag 
                    ? <div 
                        onDragStart={e => dragStartHandler(e)} onDragLeave={e => dragLeaveHangler(e)} onDragOver={e => dragStartHandler(e)} className="base-avatar">
                            <p>Перетащите файл, чтобы его загрузить, аватарка должна быть квадратной, желательно 256x256</p>
                            <input type="file" onChange={e => onDropHandler(e)} />
                    </div>
                    : <div 
                        onDragStart={e => dragStartHandler(e)} onDragLeave={e => dragLeaveHangler(e)} onDragOver={e => dragStartHandler(e)} onDrop={e => onDropHandler(e)} className="drop-avatar base-avatar">
                            <p>Отпустите файлы чтобы их загрузить</p>
                            <input type="file" onChange={e => onDropHandler(e)} />
                    </div>
                }
            </>,
            document.body
        ) : null
}

export default observer(DragDrop)