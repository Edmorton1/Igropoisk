function snackBarFunc(setShowSnackBar: Function, time=10000) {
    setShowSnackBar(true)

    setTimeout(() => {
        setShowSnackBar(false)
    }, time)
}

export default snackBarFunc