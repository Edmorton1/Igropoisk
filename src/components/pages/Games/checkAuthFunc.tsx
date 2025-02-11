// import { useState } from "react"
// import SnackBar from "../Snackbar"

// const [showSnackBar, setShowSnackBar] = useState(false)

// function snackBar() {
//     setShowSnackBar(true)

//     setTimeout(() => {
//         setShowSnackBar(false)
//     }, 4000)
// }

// function checkAuth(func: () => any) {
//     try {
//         func()
//     } catch {
//         return snackBar()
//     }
// }

// function CheckAuthFunc():React.ReactNode {
//     return (
//         <div>{showSnackBar && <SnackBar />}</div>
//     )
// }

// export {checkAuth, CheckAuthFunc}