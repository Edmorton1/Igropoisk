import { useState } from "react"

interface useCheckAuthInterface{
    checkAuth: Function,
    showSnackBar: boolean
}

function useCheckAuth():useCheckAuthInterface {
    const [showSnackBar, setShowSnackBar] = useState(false)

    function snackBar() {
        setShowSnackBar(true)

        setTimeout(() => {
            setShowSnackBar(false)
        }, 4000)
    }
    
    const checkAuth = (func: () => Function) => {
        try {
            return func()
        } catch {
            return snackBar()
        }
    }

    return {checkAuth, showSnackBar}
}

export default useCheckAuth