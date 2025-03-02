import { memo, useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { Context } from "../../App"
import SnackBar from "../Snackbar"
import "../../css/Registration.scss"
import snackBarRegistrationStore from "../../store/portals/snackBarStore"

interface dataInterface {
    nickname: string,
    mail: string,
    password: string,
    password_repeat: string
}

function Registration() {
    const store = useContext(Context)
    const {register, handleSubmit} = useForm()
    const [data, setData] = useState<{color: string, text: string}>()

    async function snackBarsAuth(data: dataInterface) {
        let text = ''
        let request_name = await (await fetch(`http://localhost:3000/api/check?nickname=${data.nickname}`)).json()
        let request_mail = await (await fetch(`http://localhost:3000/api/check?mail=${data.mail}`)).json()
        if (request_name == 'nickname занят') {
            text = 'Никнейм уже занят попробуйте другой'
        } else if (data.nickname.length < 2) {
            text = 'Никнейм слишком короткий'
        } else if (!data.mail.includes('@') || !data.mail.includes('.')) {
            text = 'Введите почту'
        } else if (request_mail == 'mail занят') {
            text = 'Почта уже занята попробуйте другую'
        } else if (data.password.length < 5) {
            text = 'Пароль слишком короткий'
        } else if (data.password != data.password_repeat) {
            text = 'Пароли не совпадают'
        }
        if (data.password == data.password_repeat && text == '') {
            store.registration(data)
            return setData({color: "green", text: "Регистрация успешна"})
        }
        return setData({color: "red", text: text})
    }

    return (
        <>
        {data && <SnackBar time={1500} color={data.color}>{data.text}</SnackBar>}
        <main className="register-section">
            <form onSubmit={handleSubmit( async (data: dataInterface) => {snackBarRegistrationStore.open(); await snackBarsAuth(data)})}>
                <strong>РЕГИСТРАЦИЯ</strong>
                <label>Никнейм</label>
                <input {...register('nickname')} type="text" />
                <label>Почта</label>
                <input {...register('mail')} type="text" />
                <label>Пароль</label>
                <input {...register('password')} type="password" />
                <label>Повторите пароль</label>
                <input {...register('password_repeat')} type="password" />
                <button>Готово</button>
            </form>
        </main>
        </>
    )
}

export default memo(Registration)