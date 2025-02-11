import "../../css/Modal.scss"

function Modal({setModal, children}: any):React.ReactNode {
    return (
        <>
        <div className="modal" onClick={() => setModal(false)}>
            {children}
        </div>

        </>
    )
}

export default Modal