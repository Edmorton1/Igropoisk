import { useContext } from "react"
import { useForm } from "react-hook-form"
import { Context } from "../../App"

function Registration():React.ReactNode {
    const store = useContext(Context)
    const {register, handleSubmit} = useForm()

    function registration(data: any) {
        store.registration(data)
        console.log(data)
    }

    return (
        <main>
            <form onSubmit={handleSubmit(data => registration(data))}>
                <p><strong>РЕГИСТРАЦИЯ</strong></p>
                <label>Никнейм</label>
                <p><input {...register('nickname')} type="text" /></p>
                <label>Почта</label>
                <p><input {...register('mail')} type="text" /></p>
                <label>Пароль</label>
                <p><input {...register('password')} type="text" /></p>
                <p><button>Готово</button></p>
            </form>
        </main>
    )
}

export default Registration