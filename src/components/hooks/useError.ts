import { useState } from "react"

function useError(): [boolean, (callback: () => any) => any] {
    const [err, setErr] = useState(false)

    const checkError = async (callback: () => any) => {
        try {
            return await callback()
        } catch {
            return setErr(true)
        }
    }
    return [err, checkError]
}

export default useError