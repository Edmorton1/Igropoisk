import { memo, useContext } from "react";
import { useForm } from "react-hook-form"
import { Context } from '../../App'
import { Link } from "react-router-dom";
import "../../css/Login.scss"

function Login():React.ReactNode {
    const store = useContext(Context)
    const {register, handleSubmit} = useForm();

    function login(data: any) {
        console.log(data)
        store.login(data)
    }
      
    return (
        <main className="login-section">
            <p>hui@gmail.com</p>
            <p>123</p>
            <form onSubmit={handleSubmit((data) => login(data))}>
                <strong>Авторизация</strong>
                <input {...register('mail')} type="text" placeholder="Почта" />
                <input {...register('password')} type="password" placeholder="Пароль" />
                <button>Готово</button> <span><Link to="/registration">Зарегестрироваться</Link></span>
            </form>
            {/* <button onClick={() => store.refresh()}>REFRESH</button>
            <p></p>
            <button onClick={() => store.logout()}>LOGOUT</button> */}
        </main>
    )
}

export default memo(Login)

// <p><strong>ЛОГИНИЗАЦИЯ</strong></p>
// <input {...register('mail')} type="text" placeholder="Почта" value='test@gmail.com' />
// <input {...register('password')} type="text" placeholder="Пароль" value='123' />

// <p><strong>РЕГИСТРАЦИЯ</strong></p>
// <input {...register('nickname')} type="text" placeholder="Ник" value='BEfCK' />
// <input {...register('mail')} type="text" placeholder="Почта" value='test@mdfail.com' />
// <input {...register('password')} type="text" placeholder="Пароль" value='123' />