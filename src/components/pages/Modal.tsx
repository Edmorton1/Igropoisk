import "../css/Modal.scss"

interface ModalInterface {
    setModal: Function,
    children?: any,
    setShowGameList?: Function
}

function Modal({setModal, children, setShowGameList}: ModalInterface):React.ReactNode {
    return (
        <>
        <div className="modal" onClick={() => {setModal(false); setShowGameList && setShowGameList(false)}}>
            {children}
        </div>

        </>
    )
}

export default Modal