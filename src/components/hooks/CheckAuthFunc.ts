import snackBarRegistrationStore from "../store/portals/snackBarStore"

function CheckAuthFunc(): any {
    const func = (func: () => Function) => {
        try {
            return func()
        } catch {
            return snackBarRegistrationStore.open()
        }
    }

    return func
}

export default CheckAuthFunc()